import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsOrder } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';

const categoryMap: Record<string, string> = {
  uiKits: 'UI Kits',
  templates: 'Templates',
  saas: 'SaaS',
};

@Component({
  selector: '[app-table-five-order-row]',
  imports: [...TABLE_IMPORTS, CommonModule],
  template: `
    <td app-table-cell
      class="py-3 ps-4 text-start text-sm font-medium text-gray-800 sm:ps-6 dark:text-white/90"
    >
      {{ order.name }}
    </td>
    <td app-table-cell class="py-3 text-start text-sm text-gray-500 dark:text-gray-400">
      {{ category }}
    </td>
    <td app-table-cell class="py-3 text-start text-sm text-gray-500 dark:text-gray-400">
      <div class="h-5 w-5">
        <img
          [src]="order.country"
          [alt]="order.name"
          class="h-5 w-5 rounded-sm object-fill"
          width="20"
          height="20"
        />
      </div>
    </td>
    <td app-table-cell class="py-3 text-start text-sm text-gray-500 dark:text-gray-400">
      {{ order.cr }}
    </td>
    <td app-table-cell
      class="py-3 pe-4 text-start text-sm font-medium text-green-600 sm:pe-6 dark:text-green-500"
    >
      \${{ order.value }}
    </td>
  `,
  host: {
    class: 'transition hover:bg-gray-50/50 dark:hover:bg-white/2',
  },
})
export class OrderRowComponent {
  @Input({ required: true }) order!: AnalyticsOrder;

  get category(): string {
    return categoryMap[this.order.category] ?? this.order.category;
  }
}
