import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrnSwitch, BrnSwitchThumb } from '@spartan-ng/brain/switch';

const ROOT_BASE = [
  'peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors outline-hidden select-none',
  'focus-visible:ring-2 focus-visible:ring-brand-500/20 focus-visible:outline-hidden dark:focus-visible:ring-brand-500/30',
  'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600',
  'data-[state=checked]:bg-brand-500 data-[state=checked]:hover:bg-brand-600 dark:data-[state=checked]:bg-brand-500 dark:data-[state=checked]:hover:bg-brand-600',
  'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:hover:bg-gray-800',
  'after:absolute after:-inset-x-3 after:-inset-y-2',
].join(' ');

const THUMB_BASE =
  'pointer-events-none block shrink-0 rounded-full bg-white shadow-theme-sm ring-0 transition-transform duration-150 ease-linear data-[state=unchecked]:translate-x-0 rtl:data-[state=unchecked]:translate-x-0';

const VARIANTS = {
  default: {
    root: 'h-6 w-13 p-0.5',
    thumb:
      'h-5 w-[30px] data-[state=checked]:translate-x-[18px] rtl:data-[state=checked]:-translate-x-[18px]',
  },
  sm: {
    root: 'h-5 w-11 p-[1.5px]',
    thumb:
      'h-[17px] w-[26px] data-[state=checked]:translate-x-[15px] rtl:data-[state=checked]:-translate-x-[15px]',
  },
} as const;

/**
 * Accessible switch built on spartan-ng `brn-switch`.
 * Mirrors the Next.js `Switch` (size "default" = h-6 w-13, size "sm" = h-5 w-11).
 */
@Component({
  selector: 'app-switch',
  imports: [BrnSwitch, BrnSwitchThumb],
  host: { class: 'inline-flex shrink-0' },
  template: `
    <brn-switch
      [checked]="checked"
      [disabled]="disabled"
      [aria-label]="ariaLabel || null"
      [class]="rootClass"
      (checkedChange)="checkedChange.emit($event)"
    >
      <span brnSwitchThumb [class]="thumbClass"></span>
    </brn-switch>
  `,
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() size: 'sm' | 'default' = 'default';
  @Input() className = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  get rootClass(): string {
    return `${ROOT_BASE} ${VARIANTS[this.size].root} ${this.className}`.trim();
  }

  get thumbClass(): string {
    return `${THUMB_BASE} ${VARIANTS[this.size].thumb}`;
  }
}
