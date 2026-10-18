import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../directive/click-outside.directive';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputDirective } from '../../../ui/input/input.directive';

const frameworks = [
  'Next.js',
  'React',
  'Vue.js',
  'Svelte',
  'Angular',
  'Nuxt.js',
  'Remix',
  'Astro',
  'Gatsby',
];

@Component({
  selector: 'app-combobox-select-input',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule, ClickOutsideDirective],
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
        Searchable Select (Combobox)
      </label>
      <div class="relative w-full" clickOutside [clickOutsideActive]="isOpen" (clickOutside)="isOpen = false">
        <div
          class="group/input-group relative flex h-11 w-full min-w-0 items-center overflow-hidden rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
        >
          <input app-input unstyled
            type="text"
            [placeholder]="selectedItem || 'Select framework...'"
            [(ngModel)]="searchQuery"
            (focus)="isOpen = true"
            (input)="isOpen = true"
            class="h-full flex-1 rounded-none border-0 bg-transparent py-2.5 ps-4 pe-2 text-sm font-normal text-gray-800 shadow-none outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
          />
          <div class="flex h-auto items-center justify-center pe-3 gap-1">
            @if (searchQuery || selectedItem) {
              <button app-button variant="unstyled"
                type="button"
                (click)="clear($event)"
                class="flex size-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                <svg
                  class="size-4 pointer-events-none"
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
            }
            <button app-button variant="unstyled"
              type="button"
              (click)="isOpen = !isOpen"
              class="flex size-7 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
            >
              <svg
                class="size-4 pointer-events-none transition-transform duration-200"
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
            </button>
          </div>
        </div>

        @if (isOpen) {
          <div
            class="absolute start-0 end-0 z-50 top-full mt-2 flex max-h-60 flex-col gap-1 overflow-x-hidden overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg duration-100 outline-none dark:border-gray-800 dark:bg-[#1E2635]"
          >
            @if (filteredFrameworks.length === 0) {
              <div class="py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                No framework found.
              </div>
            } @else {
              @for (item of filteredFrameworks; track item) {
                <div
                  (click)="selectItem(item)"
                  class="group/combobox-item relative flex w-full cursor-pointer items-center justify-between rounded-lg py-2.5 ps-3 pe-8 text-sm font-medium text-gray-700 outline-hidden transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                  [ngClass]="{ 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white': selectedItem === item }"
                >
                  <span>{{ item }}</span>
                  @if (selectedItem === item) {
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
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class ComboboxSelectInputComponent {
  isOpen = false;
  searchQuery = '';
  selectedItem = '';
  frameworks = frameworks;

  get filteredFrameworks(): string[] {
    if (!this.searchQuery) return this.frameworks;
    const query = this.searchQuery.toLowerCase();
    return this.frameworks.filter((item) => item.toLowerCase().includes(query));
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.searchQuery = item;
    this.isOpen = false;
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.selectedItem = '';
    this.searchQuery = '';
  }
}
