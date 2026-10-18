import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-password-input',
  imports: [ButtonComponent, ],
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
        Password Input
      </label>
      <div
        class="group/input-group relative flex h-11 w-full min-w-0 items-center rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
      >
        <input
          [type]="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-4 pe-2 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
        />
        <div class="flex h-auto items-center justify-center pe-3.5">
          <button app-button variant="unstyled"
            type="button"
            (click)="showPassword = !showPassword"
            [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
            class="size-7 rounded-md p-0 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            @if (showPassword) {
              <svg
                class="size-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 13.862a6.519 6.519 0 01-6.077-4.16 6.519 6.519 0 0112.154 0A6.519 6.519 0 0110 13.862zm0-9.819a8.019 8.019 0 00-7.585 5.416.75.75 0 000 .487 8.019 8.019 0 0015.17 0 .75.75 0 000-.487A8.019 8.019 0 0010 4.043zm-.008 3.801a1.858 1.858 0 100 3.716h.014a1.858 1.858 0 000-3.716h-.014z"
                />
              </svg>
            } @else {
              <svg
                class="size-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.638 3.577a.75.75 0 00-1.06 1.06l1.275 1.277a8.03 8.03 0 00-2.437 3.545.75.75 0 000 .487 8.019 8.019 0 0011.083 4.614l1.864 1.863a.75.75 0 101.06-1.06L4.638 3.576zm7.723 9.844l-1.914-1.913c-.14.034-.289.053-.44.053h-.015a1.858 1.858 0 01-1.803-2.312l-2.27-2.27a6.532 6.532 0 00-1.996 2.723 6.518 6.518 0 008.438 3.72zm3.716-3.719a6.516 6.516 0 01-1.257 2.03l1.061 1.06a8.012 8.012 0 001.704-2.846.75.75 0 000-.487A8.019 8.019 0 007.522 4.433l1.23 1.23a6.519 6.519 0 017.326 4.04z"
                />
              </svg>
            }
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PasswordInputComponent {
  showPassword = false;
}
