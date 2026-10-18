import { booleanAttribute, Directive, Input } from '@angular/core';
import { BrnInput } from '@spartan-ng/brain/input';

/**
 * Input built on spartan-ng `BrnInput`. Keeps the existing TailAdmin Angular look
 * (default / error / success / disabled states).
 */
@Directive({
  selector: 'input[app-input]',
  hostDirectives: [{ directive: BrnInput, inputs: ['id'] }],
  host: { 'data-slot': 'input', '[class]': 'hostClass', '[disabled]': 'disabled' },
})
export class InputDirective {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() error = false;
  @Input() success = false;
  @Input() className = '';
  /** Skip the built-in look; only `className` is applied (adopts the directive without a design change). */
  @Input({ transform: booleanAttribute }) unstyled = false;

  get hostClass(): string {
    if (this.unstyled) return this.className.trim();
    let classes = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${this.className}`;

    if (this.disabled) {
      classes += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
    } else if (this.error) {
      classes += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
    } else if (this.success) {
      classes += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
    } else {
      classes += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
    }
    return classes;
  }
}
