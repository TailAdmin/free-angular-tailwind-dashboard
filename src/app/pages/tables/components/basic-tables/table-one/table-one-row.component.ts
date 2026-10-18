import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';

@Component({
  selector: '[app-table-one-row]',
  imports: [...TABLE_IMPORTS, CommonModule],
  template: `
    <td app-table-cell class="px-5 py-4 text-start sm:px-6">
      <div class="flex items-center gap-3">
        <div class="size-10 overflow-hidden rounded-full">
          <img [src]="order.user.image" [alt]="order.user.name" class="size-full object-cover" />
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-800 dark:text-white/90">
            {{ order.user.name }}
          </span>
          <span class="block text-xs text-gray-500 dark:text-gray-400">
            {{ order.user.role }}
          </span>
        </div>
      </div>
    </td>
    <td app-table-cell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      {{ order.projectName }}
    </td>
    <td app-table-cell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      <div class="flex -space-x-2">
        @for (image of order.team.images; track $index) {
          <div
            class="relative flex size-6 shrink-0 rounded-full ring-2 ring-white select-none dark:ring-gray-800"
          >
            <img
              [src]="image"
              [alt]="'Team member ' + ($index + 1)"
              class="aspect-square size-full rounded-full object-cover"
            />
          </div>
        }
      </div>
    </td>
    <td app-table-cell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      <span
        class="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium"
        [ngClass]="{
          'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500': order.status === 'Active',
          'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-orange-400': order.status === 'Pending',
          'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500': order.status === 'Cancel'
        }"
      >
        {{ order.status }}
      </span>
    </td>
    <td app-table-cell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
      {{ order.budget }}
    </td>
  `,
  host: {
    class: 'transition hover:bg-gray-50/50 dark:hover:bg-white/2',
  },
})
export class TableOneRowComponent {
  @Input({ required: true }) order!: Order;
}
