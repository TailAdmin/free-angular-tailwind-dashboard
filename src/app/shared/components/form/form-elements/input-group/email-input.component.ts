import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-email-input',
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
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <div
          class="flex h-full items-center justify-center self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
        >
          <svg
            class="size-5 text-gray-500 dark:text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.042 7.062v7.313a.5.5 0 00.5.5h12.916a.5.5 0 00.5-.5V7.062l-5.814 4.055a2 2 0 01-2.288 0L3.042 7.062zm13.916-1.87V5.2a.072.072 0 01-.03.055l-6.642 4.631a.5.5 0 01-.572 0L3.072 5.255a.071.071 0 01.041-.13h13.774c.038 0 .07.03.071.068zm1.5.022v9.161a2 2 0 01-2 2H3.542a2 2 0 01-2-2v-9.18-.03a1.571 1.571 0 011.571-1.54h13.774c.868 0 1.571.703 1.571 1.571v.018z"
              fill="currentColor"
            />
          </svg>
        </div>
        <input app-input unstyled
          type="email"
          placeholder="info@gmail.com"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-3.5 pe-4 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
      </div>
    </div>
  `,
})
export class EmailInputComponent {}
