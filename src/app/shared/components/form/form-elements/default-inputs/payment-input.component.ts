import { Component } from '@angular/core';
import { InputDirective } from '../../../ui/input/input.directive';

@Component({
  selector: 'app-payment-input',
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
        Input with Payment
      </label>
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <div
          class="flex h-full items-center justify-center self-stretch border-e border-gray-200 ps-3.5 pe-3 dark:border-gray-800"
        >
          <svg
            class="h-5 w-auto"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="16" r="9" fill="#E80B26" />
            <circle cx="22" cy="16" r="9" fill="#F59D31" />
            <path
              d="M16 22.7085C17.8413 21.0605 19 18.6658 19 16.0002C19 13.3347 17.8413 10.9399 16 9.29199C14.1587 10.9399 13 13.3347 13 16.0002C13 18.6658 14.1587 21.0605 16 22.7085Z"
              fill="#FC6020"
            />
          </svg>
        </div>
        <input app-input unstyled
          type="text"
          placeholder="Card number"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-3.5 pe-4 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
      </div>
    </div>
  `,
})
export class PaymentInputComponent {}
