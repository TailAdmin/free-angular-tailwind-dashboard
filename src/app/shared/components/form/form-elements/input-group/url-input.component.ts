import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-url-input',
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
        URL
      </label>
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <div
          class="flex h-full items-center justify-center self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
        >
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            http://
          </span>
        </div>
        <input app-input unstyled
          type="text"
          placeholder="www.tailadmin.com"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-3.5 pe-4 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
      </div>
    </div>
  `,
})
export class UrlInputComponent {}
