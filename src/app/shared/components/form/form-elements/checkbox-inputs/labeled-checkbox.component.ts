import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-labeled-checkbox',
  imports: [ButtonComponent, ],
  host: {
    class: 'block',
  },
  template: `
    <div class="flex flex-wrap items-center gap-6 sm:gap-8">
      <!-- Default -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <button app-button variant="unstyled"
          type="button"
          id="checkbox-default"
          (click)="isCheckedDefault = !isCheckedDefault"
          class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
          [class]="
            isCheckedDefault
              ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
              : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
          "
        >
          @if (isCheckedDefault) {
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
        <label
          data-slot="field-label"
          for="checkbox-default"
          (click)="$event.preventDefault(); isCheckedDefault = !isCheckedDefault"
          class="cursor-pointer text-sm font-medium text-gray-700 select-none dark:text-gray-300"
        >
          Default
        </label>
      </div>

      <!-- Checked -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <button app-button variant="unstyled"
          type="button"
          id="checkbox-checked"
          (click)="isChecked = !isChecked"
          class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
          [class]="
            isChecked
              ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
              : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
          "
        >
          @if (isChecked) {
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
        <label
          data-slot="field-label"
          for="checkbox-checked"
          (click)="$event.preventDefault(); isChecked = !isChecked"
          class="cursor-pointer text-sm font-medium text-gray-700 select-none dark:text-gray-300"
        >
          Checked
        </label>
      </div>

      <!-- Disabled -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <button app-button variant="unstyled"
          type="button"
          id="checkbox-disabled"
          disabled
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
        <label
          data-slot="field-label"
          for="checkbox-disabled"
          class="cursor-not-allowed text-sm font-medium text-gray-400 dark:text-gray-600"
        >
          Disabled
        </label>
      </div>
    </div>
  `,
})
export class LabeledCheckboxComponent {
  isCheckedDefault = false;
  isChecked = true;
}
