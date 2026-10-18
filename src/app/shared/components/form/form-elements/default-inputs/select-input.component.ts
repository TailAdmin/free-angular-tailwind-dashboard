import { Component } from '@angular/core';
import { SelectFieldComponent } from '../../../ui/select/select-field.component';

@Component({
  selector: 'app-default-select-input',
  imports: [SelectFieldComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      role="group"
      data-slot="field"
      data-orientation="vertical"
      class="group/field flex w-full gap-2 data-[invalid=true]:text-red-500 dark:data-[invalid=true]:text-red-400 flex-col *:w-full [&>.sr-only]:w-auto"
    >
      <label
        data-slot="field-label"
        class="group/field-label peer/field-label flex w-fit gap-2 text-sm leading-snug font-medium text-gray-700 select-none group-data-[disabled=true]/field:opacity-50 dark:text-gray-400"
      >
        Select Input
      </label>
      <app-select-field
        ariaLabel="Select Input"
        [options]="options"
        [value]="selectedOption"
        (valueChange)="selectedOption = $event"
      />
    </div>
  `,
})
export class SelectInputComponent {
  selectedOption: string | undefined;
  options = ['Option 1', 'Option 2', 'Option 3'];

}
