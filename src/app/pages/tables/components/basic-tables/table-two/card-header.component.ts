import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../../shared/directive/click-outside.directive';
import { DealStatus } from './types';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { InputDirective } from '../../../../../shared/components/ui/input/input.directive';

@Component({
  selector: 'app-table-two-card-header',
  imports: [InputDirective, ButtonComponent, CommonModule, FormsModule, ClickOutsideDirective],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>
      </div>

      <div class="flex w-full items-center gap-3 sm:w-auto">
        <div class="flex-1 sm:w-64 sm:flex-initial md:w-72">
          <div
            class="group/input-group relative flex h-10 w-full min-w-0 items-center rounded-[10px] border border-gray-300 bg-white shadow-theme-xs outline-hidden transition-colors focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-500/40"
          >
            <div
              class="flex h-auto items-center justify-center ps-3.5 pe-0 text-gray-700 select-none dark:text-gray-300"
            >
              <svg
                class="size-5"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.382 14.383l3.325 3.326m-1.249-8.334a7.082 7.082 0 01-7.083 7.081 7.082 7.082 0 110-14.163 7.082 7.082 0 017.083 7.082z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input app-input unstyled
              type="text"
              placeholder="Search..."
              [ngModel]="searchQuery"
              (ngModelChange)="searchChange.emit($event)"
              class="h-full flex-1 rounded-none border-0 bg-transparent ps-2 pe-4 text-sm font-normal text-gray-800 shadow-none ring-0 outline-hidden placeholder:text-gray-400 focus:outline-hidden focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        <div
          class="relative shrink-0"
          clickOutside
          [clickOutsideActive]="isFilterOpen"
          (clickOutside)="isFilterOpen = false"
        >
          <button app-button variant="unstyled"
            type="button"
            (click)="isFilterOpen = !isFilterOpen"
            class="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-transparent px-4 text-sm font-medium whitespace-nowrap text-gray-700 shadow-theme-xs transition hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-3 focus-visible:ring-gray-300/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <svg
              class="size-5"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.653 5.905a2.57 2.57 0 00-5.141 0m5.141 0a2.57 2.57 0 01-5.141 0m5.141 0h3.055m-8.196 0h-7.22m3.055 8.192a2.57 2.57 0 015.141 0m-5.141 0a2.57 2.57 0 005.141 0m-5.141 0H2.292m8.196 0h7.22"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Filter
          </button>

          @if (isFilterOpen) {
            <div
              class="absolute end-0 z-50 mt-2 w-40 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg duration-100 outline-none dark:border-gray-800 dark:bg-[#1E2635]"
            >
              <button app-button variant="unstyled"
                type="button"
                (click)="setFilter('all')"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                [class.font-semibold]="statusFilter === 'all'"
                [class.text-brand-500]="statusFilter === 'all'"
                [class.dark:text-brand-400]="statusFilter === 'all'"
              >
                All
              </button>
              <button app-button variant="unstyled"
                type="button"
                (click)="setFilter('complete')"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                [class.font-semibold]="statusFilter === 'complete'"
                [class.text-brand-500]="statusFilter === 'complete'"
                [class.dark:text-brand-400]="statusFilter === 'complete'"
              >
                Complete
              </button>
              <button app-button variant="unstyled"
                type="button"
                (click)="setFilter('pending')"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                [class.font-semibold]="statusFilter === 'pending'"
                [class.text-brand-500]="statusFilter === 'pending'"
                [class.dark:text-brand-400]="statusFilter === 'pending'"
              >
                Pending
              </button>
              <button app-button variant="unstyled"
                type="button"
                (click)="setFilter('cancel')"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                [class.font-semibold]="statusFilter === 'cancel'"
                [class.text-brand-500]="statusFilter === 'cancel'"
                [class.dark:text-brand-400]="statusFilter === 'cancel'"
              >
                Cancel
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() searchQuery = '';
  @Output() searchChange = new EventEmitter<string>();

  @Input() statusFilter: DealStatus | 'all' = 'all';
  @Output() statusFilterChange = new EventEmitter<DealStatus | 'all'>();

  isFilterOpen = false;

  setFilter(status: DealStatus | 'all') {
    this.statusFilterChange.emit(status);
    this.isFilterOpen = false;
  }
}
