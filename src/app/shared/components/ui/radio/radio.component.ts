import { Component, Input } from '@angular/core';
import { BrnRadio } from '@spartan-ng/brain/radio-group';

/**
 * Accessible radio indicator built on spartan-ng `brn-radio`.
 * Must be placed inside an element carrying `brnRadioGroup`.
 */
@Component({
  selector: 'app-radio',
  imports: [BrnRadio],
  host: { class: 'inline-flex shrink-0' },
  template: `
    <brn-radio
      [value]="value"
      [id]="radioId"
      [disabled]="disabled"
      [aria-label]="ariaLabel || undefined"
      class="group/radio inline-flex items-center"
    >
      <span indicator [class]="circleClasses">
        <span class="hidden size-2 rounded-full bg-white group-data-[checked=true]/radio:block"></span>
      </span>
    </brn-radio>
  `,
})
export class RadioComponent {
  @Input({ required: true }) value!: unknown;
  @Input() radioId = `app-radio-${Math.random().toString(36).slice(2, 8)}`;
  @Input() disabled = false;
  @Input() ariaLabel = '';

    get circleClasses(): string {
    return [
      'relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-theme-xs outline-hidden transition-colors',
      'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400',
      'group-data-[checked=true]/radio:border-brand-500 group-data-[checked=true]/radio:bg-brand-500 group-data-[checked=true]/radio:hover:border-brand-600 group-data-[checked=true]/radio:hover:bg-brand-600 dark:group-data-[checked=true]/radio:border-brand-500 dark:group-data-[checked=true]/radio:bg-brand-500',
      'group-has-focus-visible/radio:ring-3 group-has-focus-visible/radio:ring-brand-500/20',
      'group-data-[disabled=true]/radio:cursor-not-allowed group-data-[disabled=true]/radio:border-gray-200 group-data-[disabled=true]/radio:bg-gray-100/50 group-data-[disabled=true]/radio:opacity-50 group-data-[disabled=true]/radio:shadow-none dark:group-data-[disabled=true]/radio:border-gray-800 dark:group-data-[disabled=true]/radio:bg-gray-800/50',
    ].join(' ');
  }
}
