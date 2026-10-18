import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign } from './types';
import { featuredCampaignsData } from './data';
import { CampaignRowComponent } from './campaign-row.component';
import { ClickOutsideDirective } from '../../../../directive/click-outside.directive';
import { TABLE_IMPORTS } from '../../../ui/table';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-table-four',
  imports: [ButtonComponent, ...TABLE_IMPORTS, CommonModule, CampaignRowComponent, ClickOutsideDirective],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3"
      [ngClass]="className"
    >
      <div class="mb-4 flex justify-between gap-2 sm:items-center">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
            Featured Campaigns
          </h3>
        </div>

        <div
          class="relative"
          clickOutside
          [clickOutsideActive]="isMenuOpen"
          (clickOutside)="isMenuOpen = false"
        >
          <button app-button variant="unstyled"
            type="button"
            (click)="isMenuOpen = !isMenuOpen"
            class="dropdown-toggle text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg
              class="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          @if (isMenuOpen) {
            <div
              class="absolute end-0 z-50 mt-2 flex min-w-65 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg duration-100 outline-none dark:border-gray-800 dark:bg-[#1E2635]"
            >
              <button app-button variant="unstyled"
                type="button"
                (click)="isMenuOpen = false"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </button>
              <button app-button variant="unstyled"
                type="button"
                (click)="isMenuOpen = false"
                class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </button>
            </div>
          }
        </div>
      </div>

      <div class="custom-scrollbar max-w-full overflow-x-auto">
        <div class="min-w-full">
          <table app-table class="w-full text-start">
            <!-- Table Header -->
            <thead app-table-header class="border-y border-gray-100 dark:border-gray-800">
              <tr app-table-row>
                <th app-table-cell
                  class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Products
                </th>
                <th app-table-cell
                  class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Campaign
                </th>
                <th app-table-cell
                  class="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>
              </tr>
            </thead>

            <!-- Table Body -->
            <tbody app-table-body class="divide-y divide-gray-100 dark:divide-gray-800">
              @for (campaign of data; track campaign.id) {
                <tr app-table-row app-table-four-campaign-row [campaign]="campaign"></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class TableFourComponent {
  @Input() data: Campaign[] = featuredCampaignsData;
  @Input() className = '';

  isMenuOpen = false;
}
