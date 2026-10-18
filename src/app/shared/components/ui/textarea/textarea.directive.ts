import { booleanAttribute, Directive, Input } from '@angular/core';
import { BrnTextarea } from '@spartan-ng/brain/textarea';

/**
 * Textarea built on spartan-ng `BrnTextarea`. Keeps the existing TailAdmin Angular look.
 */
@Directive({
  selector: 'textarea[app-textarea]',
  hostDirectives: [{ directive: BrnTextarea, inputs: ['id'] }],
  host: { 'data-slot': 'textarea', '[class]': 'hostClass', '[disabled]': 'disabled' },
})
export class TextareaDirective {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() error = false;
  @Input() className = '';
  /** Skip the built-in look; only `className` is applied (adopts the directive without a design change). */
  @Input({ transform: booleanAttribute }) unstyled = false;

  get hostClass(): string {
    if (this.unstyled) return this.className.trim();
    let base = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${this.className} `;
    if (this.disabled) {
      base +=
        'bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    } else if (this.error) {
      base +=
        'bg-transparent border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800';
    } else {
      base +=
        'bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800';
    }
    return base;
  }
}
