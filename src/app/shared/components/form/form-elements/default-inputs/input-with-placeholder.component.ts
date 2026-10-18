import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-input-with-placeholder',
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
        Input with Placeholder
      </label>
      <input app-input unstyled
        type="text"
        data-slot="input"
        placeholder="info@gmail.com"
        class="h-11 w-full min-w-0 rounded-[10px] border border-gray-300 bg-white py-2.5 ps-4 pe-4 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-colors placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-500/40 dark:disabled:border-gray-800 dark:disabled:bg-gray-800/50"
      />
    </div>
  `,
})
export class InputWithPlaceholderComponent {}
