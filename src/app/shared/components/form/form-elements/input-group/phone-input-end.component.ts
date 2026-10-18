import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-phone-input-end',
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
        Phone
      </label>
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <input app-input unstyled
          type="tel"
          placeholder="+1 (555) 000-0000"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-4 pe-3.5 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
        <div
          class="relative flex h-full items-center self-stretch border-s border-gray-200 p-0 dark:border-gray-800"
        >
          <select
            defaultValue="US"
            class="h-full cursor-pointer appearance-none border-0 border-none bg-transparent py-0 ps-3.5 pe-8 text-sm font-medium text-gray-700 shadow-none outline-hidden focus:border-0 focus:border-none focus:outline-hidden focus:ring-0 dark:text-gray-300 dark:hover:text-white dark:focus:text-white"
          >
            <option value="US" class="text-gray-700 dark:bg-gray-900 dark:text-gray-300">US</option>
            <option value="GB" class="text-gray-700 dark:bg-gray-900 dark:text-gray-300">GB</option>
            <option value="CA" class="text-gray-700 dark:bg-gray-900 dark:text-gray-300">CA</option>
            <option value="AU" class="text-gray-700 dark:bg-gray-900 dark:text-gray-300">AU</option>
          </select>
          <svg
            class="pointer-events-none absolute end-2.5 size-4 text-gray-500 dark:text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.792 7.396L10 12.604l5.208-5.208"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  `,
})
export class PhoneInputEndComponent {}
