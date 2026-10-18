import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsOrder } from './types';
import { recentOrdersData } from './data';
import { OrderRowComponent } from './order-row.component';
import { TABLE_IMPORTS } from '../../../ui/table';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-table-five',
  imports: [ButtonComponent, ...TABLE_IMPORTS, CommonModule, OrderRowComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3"
      [ngClass]="className"
    >
      <div
        class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div class="flex items-center gap-3">
          <button app-button variant="unstyled"
            type="button"
            class="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap text-gray-700 shadow-theme-xs transition-all hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-gray-300/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
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
          <button app-button variant="unstyled"
            type="button"
            class="inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap text-gray-700 shadow-theme-xs transition-all hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-gray-300/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
          >
            See all
          </button>
        </div>
      </div>

      <div class="-mx-4 overflow-x-auto sm:-mx-6">
        <table app-table class="w-full text-start">
          <!-- Table Header -->
          <thead app-table-header class="border-y border-gray-100 dark:border-gray-800">
            <tr app-table-row>
              <th app-table-cell
                class="py-3 ps-4 text-start text-xs font-medium text-gray-500 sm:ps-6 dark:text-gray-400"
              >
                Products
              </th>
              <th app-table-cell
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Category
              </th>
              <th app-table-cell
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Country
              </th>
              <th app-table-cell
                class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                CR
              </th>
              <th app-table-cell
                class="py-3 pe-4 text-start text-xs font-medium text-gray-500 sm:pe-6 dark:text-gray-400"
              >
                Value
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody app-table-body class="divide-y divide-gray-100 dark:divide-gray-800">
            @for (order of data; track order.id) {
              <tr app-table-row app-table-five-order-row [order]="order"></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableFiveComponent {
  @Input() data: AnalyticsOrder[] = recentOrdersData;
  @Input() className = '';
}
