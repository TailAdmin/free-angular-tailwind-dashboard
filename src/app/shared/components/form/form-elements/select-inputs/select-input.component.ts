import { Component } from '@angular/core';
import { SELECT_IMPORTS } from '../../../ui/select/select';

@Component({
  selector: 'app-select-input',
  imports: [...SELECT_IMPORTS],
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
      <app-select [(value)]="selectedOption">
        <app-select-trigger ariaLabel="Select Input">
          <app-select-value placeholder="Select Option" />
        </app-select-trigger>
        <app-select-content *appSelectPortal>
          @for (option of options; track option) {
            <app-select-item [value]="option">{{ option }}</app-select-item>
          }
        </app-select-content>
      </app-select>
    </div>
  `,
})
export class SelectInputComponent {
  selectedOption: string | undefined;
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

}
