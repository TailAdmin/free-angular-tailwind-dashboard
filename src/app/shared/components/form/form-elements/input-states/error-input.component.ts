import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-error-input',
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
        class="group/field-label peer/field-label flex w-fit gap-2 text-sm leading-snug font-medium text-gray-700 select-none group-data-[disabled=true]/field:opacity-50 dark:text-gray-400"
      >
        Email
      </label>
      <input app-input unstyled
        type="email"
        placeholder="demo-email@tailadmin.com"
        aria-invalid="true"
        class="h-11 w-full min-w-0 rounded-[10px] border border-red-500 ring-3 ring-red-500/20 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden placeholder:text-gray-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/20 dark:border-red-500/50 dark:ring-red-500/40 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500"
      />
      <div role="alert" data-slot="field-error" class="text-sm font-normal text-red-500 dark:text-red-400 text-xs">
        Clear guidance for users.
      </div>
    </div>
  `,
})
export class ErrorInputComponent {}
