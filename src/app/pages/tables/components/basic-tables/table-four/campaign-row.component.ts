import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Campaign } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';

@Component({
  selector: '[app-table-four-campaign-row]',
  imports: [...TABLE_IMPORTS, CommonModule],
  template: `
    <td app-table-cell class="py-3">
      <div class="flex items-center gap-4.5">
        <div class="size-10 overflow-hidden rounded-full">
          <img
            [src]="campaign.creator.image"
            [alt]="campaign.creator.name"
            class="size-full object-cover"
          />
        </div>
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-400">
            {{ campaign.creator.name }}
          </p>
        </div>
      </div>
    </td>
    <td app-table-cell class="py-3">
      <div class="flex w-full items-center gap-5">
        <div class="w-full max-w-8">
          <img
            [src]="campaign.campaign.image"
            alt="brand"
            class="size-8 object-contain"
          />
        </div>
        <div class="truncate">
          <p
            class="mb-0.5 truncate text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            {{ campaign.campaign.name }}
          </p>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ campaign.campaign.type }}
          </span>
        </div>
      </div>
    </td>
    <td app-table-cell class="py-3">
      <span
        class="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium"
        [ngClass]="{
          'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500': campaign.status.toLowerCase() === 'success',
          'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-orange-400': campaign.status.toLowerCase() === 'pending',
          'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500': campaign.status.toLowerCase() === 'failed'
        }"
      >
        {{ campaign.status }}
      </span>
    </td>
  `,
  host: {
    class: 'transition hover:bg-gray-50/50 dark:hover:bg-white/2',
  },
})
export class CampaignRowComponent {
  @Input({ required: true }) campaign!: Campaign;
}
