import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SELECT_IMPORTS } from './select';

export interface SelectFieldOption {
  value: string;
  label: string;
}

/**
 * Convenience wrapper around the spartan-ng based select primitives
 * (`app-select`, `app-select-trigger`, ...) for plain option lists.
 */
@Component({
  selector: 'app-select-field',
  imports: [...SELECT_IMPORTS],
  host: { class: 'block w-full' },
  template: `
    <app-select
      [value]="value"
      [disabled]="disabled"
      (valueChange)="onValueChange($event)"
    >
      <app-select-trigger [ariaLabel]="ariaLabel" [className]="triggerClass">
        <app-select-value [placeholder]="placeholder" />
      </app-select-trigger>
      <app-select-content *appSelectPortal>
        @for (option of normalizedOptions; track option.value) {
          <app-select-item [value]="option.value">{{ option.label }}</app-select-item>
        }
      </app-select-content>
    </app-select>
  `,
})
export class SelectFieldComponent {
  @Input() options: (SelectFieldOption | string)[] = [];
  @Input() value: string | undefined;
  @Input() placeholder = 'Select Option';
  @Input() ariaLabel = '';
  @Input() disabled = false;
  /** Extra classes appended to the trigger button. */
  @Input() triggerClass = '';
  @Output() valueChange = new EventEmitter<string>();

  get normalizedOptions(): SelectFieldOption[] {
    return this.options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  }

  onValueChange(value: unknown) {
    this.valueChange.emit(value as string);
  }
}
