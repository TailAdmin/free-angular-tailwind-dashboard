import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-disabled-input',
  imports: [InputDirective, ],
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
        class="group/field-label peer/field-label flex w-fit gap-2 text-sm leading-snug font-medium text-gray-400 select-none group-data-[disabled=true]/field:opacity-50 dark:text-gray-500"
      >
        Email
      </label>
      <input app-input unstyled
        type="email"
        value="info@tailadmin.com"
        disabled
        class="h-11 w-full min-w-0 rounded-[10px] border border-gray-200 bg-gray-100/50 py-2.5 ps-4 pe-4 text-sm font-normal text-gray-400 shadow-none outline-hidden cursor-not-allowed dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-500"
      />
    </div>
  `,
})
export class DisabledInputComponent {}
