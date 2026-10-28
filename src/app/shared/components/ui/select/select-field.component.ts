import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SELECT_IMPORTS } from './select';

export interface SelectFieldOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-field',
  imports: [...SELECT_IMPORTS],
  host: { class: 'block w-full' },
  template: `
    <app-select
      [value]="value"
      [disabled]="disabled"
      [itemToString]="itemToString"
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

  /** Shows the option label (not the raw value) in the trigger, even before the list is opened. */
  itemToString = (value: unknown): string =>
    this.normalizedOptions.find((o) => o.value === value)?.label ?? String(value ?? '');

  onValueChange(value: unknown) {
    this.valueChange.emit(value as string);
  }
}
