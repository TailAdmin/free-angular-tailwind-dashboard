import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-default-checkbox',
  imports: [ButtonComponent, ],
  host: {
    class: 'block',
  },
  template: `
    <div class="flex flex-row items-center gap-6">
      <!-- Unchecked -->
      <button app-button variant="unstyled"
        type="button"
        (click)="isCheckedOne = !isCheckedOne"
        aria-label="Default unchecked checkbox"
        class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
        [class]="
          isCheckedOne
            ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
            : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
        "
      >
        @if (isCheckedOne) {
          <svg
            class="size-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        }
      </button>

      <!-- Checked -->
      <button app-button variant="unstyled"
        type="button"
        (click)="isCheckedTwo = !isCheckedTwo"
        aria-label="Checked checkbox"
        class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
        [class]="
          isCheckedTwo
            ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
            : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
        "
      >
        @if (isCheckedTwo) {
          <svg
            class="size-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        }
      </button>

      <!-- Disabled Checked -->
      <button app-button variant="unstyled"
        type="button"
        disabled
        aria-label="Disabled checked checkbox"
        class="peer relative flex size-4 shrink-0 cursor-not-allowed items-center justify-center rounded-md border border-gray-200 bg-transparent text-gray-300 shadow-none outline-hidden dark:border-gray-800 dark:text-gray-600"
      >
        <svg
          class="size-3"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </button>
    </div>
  `,
})
export class DefaultCheckboxComponent {
  isCheckedOne = false;
  isCheckedTwo = true;
}
