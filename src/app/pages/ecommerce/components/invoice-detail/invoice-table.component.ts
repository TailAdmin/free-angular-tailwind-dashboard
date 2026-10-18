import { Component, Input } from '@angular/core';
import { TABLE_IMPORTS } from '../../../../shared/components/ui/table';
import { defaultInvoiceData } from './data';
import { InvoiceItem } from './types';

@Component({
  selector: 'app-invoice-table',
  imports: [...TABLE_IMPORTS],
  host: {
    class: 'block w-full overflow-x-auto rounded-xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-transparent',
  },
  template: `
    <table app-table>
      <thead app-table-header>
        <tr app-table-row class="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
          <th app-table-cell class="h-11 px-5 py-2 text-start text-sm font-medium text-gray-700 dark:text-gray-300">
            S.No.
          </th>
          <th app-table-cell class="h-11 px-5 py-2 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
            Products
          </th>
          <th app-table-cell class="h-11 px-5 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity
          </th>
          <th app-table-cell class="h-11 px-5 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Unit Cost
          </th>
          <th app-table-cell class="h-11 px-5 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Discount
          </th>
          <th app-table-cell class="h-11 px-5 py-2 text-end text-sm font-medium text-gray-700 dark:text-gray-300">
            Total
          </th>
        </tr>
      </thead>
      <tbody app-table-body>
        @for (item of items; track item.id; let last = $last) {
          <tr app-table-row class="border-gray-100 dark:border-gray-800" [class.border-b]="!last">
            <td app-table-cell class="h-13.5 px-5 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400">
              {{ item.id }}
            </td>
            <td app-table-cell class="h-13.5 px-5 py-3 text-start text-sm font-medium text-gray-800 dark:text-white/90">
              {{ item.product }}
            </td>
            <td app-table-cell class="h-13.5 px-5 py-3 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {{ item.quantity }}
            </td>
            <td app-table-cell class="h-13.5 px-5 py-3 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
              \${{ item.unitCost.toLocaleString() }}
            </td>
            <td app-table-cell class="h-13.5 px-5 py-3 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {{ item.discount }}%
            </td>
            <td app-table-cell class="h-13.5 px-5 py-3 text-end text-sm font-normal text-gray-500 dark:text-gray-400">
              \${{ item.total.toLocaleString() }}
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class InvoiceTableComponent {
  @Input() items: InvoiceItem[] = defaultInvoiceData.items;
}
