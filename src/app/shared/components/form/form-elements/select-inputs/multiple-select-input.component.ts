import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../directive/click-outside.directive';
import { ButtonComponent } from '../../../ui/button/button.component';

const colorOptions = [
  { value: 'Blue', label: 'Blue' },
  { value: 'Green', label: 'Green' },
  { value: 'Red', label: 'Red' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Orange', label: 'Orange' },
];

@Component({
  selector: 'app-multiple-select-input',
  imports: [ButtonComponent, CommonModule, ClickOutsideDirective],
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
        Multiple Select Options
      </label>
      <div class="relative w-full" clickOutside [clickOutsideActive]="isOpen" (clickOutside)="isOpen = false">
        <div
          (click)="isOpen = !isOpen"
          class="group/select-trigger flex w-full min-w-0 items-center justify-between gap-2 rounded-[10px] border border-gray-300 bg-white min-h-11 py-1.5 ps-3 pe-3.5 text-sm font-normal text-gray-800 shadow-theme-xs outline-hidden transition-all duration-200 select-none hover:border-gray-400 hover:bg-gray-50/50 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 dark:focus:border-brand-500/40 cursor-pointer"
        >
          <div class="flex flex-1 flex-wrap items-center gap-2">
            @if (selectedValues.length === 0) {
              <span class="text-gray-400 dark:text-gray-500">Select Option</span>
            } @else {
              @for (val of selectedValues; track val) {
                <span
                  class="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 py-1 ps-2.5 pe-1.5 text-sm font-normal text-gray-800 dark:border-gray-800 dark:bg-white/5 dark:text-white/90"
                >
                  <span>{{ val }}</span>
                  <button app-button variant="unstyled"
                    type="button"
                    [attr.aria-label]="'Remove ' + val"
                    (click)="handleRemove(val, $event)"
                    class="inline-flex size-3.5 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      class="size-3"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              }
            }
          </div>
          <svg
            class="size-4 text-gray-500 transition-transform duration-200 group-hover/select-trigger:text-gray-700 dark:text-gray-400 dark:group-hover/select-trigger:text-gray-300 pointer-events-none shrink-0"
            [ngClass]="{ 'rotate-180': isOpen }"
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

        @if (isOpen) {
          <div
            class="absolute start-0 end-0 z-50 top-full mt-2 flex max-h-60 flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg duration-100 outline-none dark:border-gray-800 dark:bg-[#1E2635]"
          >
            @for (option of colorOptions; track option.value) {
              <div
                (click)="toggleOption(option.value)"
                class="group/select-item relative flex w-full cursor-pointer items-center justify-between rounded-lg py-2 ps-3 pe-3 text-sm font-medium text-gray-700 outline-hidden transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                [ngClass]="{ 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white': selectedValues.includes(option.value) }"
              >
                <span>{{ option.label }}</span>
                @if (selectedValues.includes(option.value)) {
                  <svg
                    class="size-4 text-brand-500 dark:text-brand-400"
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
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class MultipleSelectInputComponent {
  isOpen = false;
  selectedValues = ['Blue', 'Green'];
  colorOptions = colorOptions;

  handleRemove(val: string, event: MouseEvent) {
    event.stopPropagation();
    this.selectedValues = this.selectedValues.filter((v) => v !== val);
  }

  toggleOption(val: string) {
    if (this.selectedValues.includes(val)) {
      this.selectedValues = this.selectedValues.filter((v) => v !== val);
    } else {
      this.selectedValues = [...this.selectedValues, val];
    }
  }
}
