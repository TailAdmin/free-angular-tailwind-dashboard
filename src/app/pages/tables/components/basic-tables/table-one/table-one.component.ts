import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tableData } from './data';
import { Order } from './types';
import { TableOneRowComponent } from './table-one-row.component';
import { TABLE_IMPORTS } from '../../../ui/table';

@Component({
  selector: 'app-table-one',
  imports: [...TABLE_IMPORTS, CommonModule, TableOneRowComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3 {{ className }}"
    >
      <div class="max-w-full overflow-x-auto">
        <table app-table class="min-w-full">
          <thead app-table-header class="border-b border-gray-100 dark:border-white/5">
            <tr app-table-row>
              <th app-table-cell
                class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
              >
                User
              </th>
              <th app-table-cell
                class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
              >
                Project Name
              </th>
              <th app-table-cell
                class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
              >
                Team
              </th>
              <th app-table-cell
                class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
              >
                Status
              </th>
              <th app-table-cell
                class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
              >
                Budget
              </th>
            </tr>
          </thead>

          <tbody app-table-body class="divide-y divide-gray-100 dark:divide-white/5">
            @for (order of data; track order.id) {
              <tr app-table-row app-table-one-row [order]="order"></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableOneComponent {
  @Input() data: Order[] = tableData;
  @Input() className = '';
}
