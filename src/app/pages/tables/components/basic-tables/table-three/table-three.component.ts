import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFooterComponent } from './card-footer.component';
import { CardHeaderComponent } from './card-header.component';
import { latestTransactionsData } from './data';
import { TransactionRowComponent } from './transaction-row.component';
import { Transaction } from './types';
import { TABLE_IMPORTS } from '../../../../../shared/components/ui/table';

@Component({
  selector: 'app-table-three',
  imports: [...TABLE_IMPORTS, 
    CommonModule,
    CardHeaderComponent,
    CardFooterComponent,
    TransactionRowComponent,
  ],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3 {{ className }}"
    >
      <!-- Table Header Controls -->
      <app-table-three-card-header
        [searchQuery]="searchQuery"
        (searchChange)="onSearchChange($event)"
      />

      <!-- Table Content -->
      <div class="p-0">
        <div class="w-full max-w-full overflow-x-auto">
          <table app-table class="min-w-full">
            <thead app-table-header class="border-y border-gray-100 dark:border-gray-800">
              <tr app-table-row>
                <th app-table-cell
                  class="h-11 min-w-44 py-3 ps-5 text-start text-sm font-normal text-gray-500 sm:ps-6 dark:text-gray-400"
                >
                  Name
                </th>
                <th app-table-cell
                  class="h-11 min-w-44 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  Date
                </th>
                <th app-table-cell
                  class="h-11 min-w-32 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  Price
                </th>
                <th app-table-cell
                  class="h-11 min-w-36 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  Category
                </th>
                <th app-table-cell
                  class="h-11 min-w-28 px-4 py-3 text-start text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>
                <th app-table-cell
                  class="h-11 min-w-16 py-3 pe-5 sm:pe-6"
                ></th>
              </tr>
            </thead>

            <tbody app-table-body class="divide-y divide-gray-100 dark:divide-gray-800">
              @if (filteredTransactions.length > 0) {
                @for (transaction of filteredTransactions; track transaction.id) {
                  <tr app-table-row
                    app-table-three-transaction-row
                    [transaction]="transaction"
                  ></tr>
                }
              } @else {
                <tr app-table-row>
                  <td app-table-cell
                    colspan="6"
                    class="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex flex-col items-center justify-center">
                      <div
                        class="mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        <svg
                          class="size-6 text-gray-800 dark:text-white/90"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 21.072V11.029m0 0c-.23 0-.46-.053-.67-.159m.67.159c.23 0 .46-.053.671-.159m0 0a1.5 1.5 0 01-1.341 0m1.341 0l7.55-3.774M11.33 10.87L3.78 7.096m16.441 0a1.499 1.499 0 00-.592-.533L12.67 3.084a1.5 1.5 0 00-1.341 0L4.372 6.563c-.247.123-.45.309-.592.533m16.441 0a1.5 1.5 0 01.237.808v8.19a1.5 1.5 0 01-.83 1.341l-6.957 3.479a1.5 1.5 0 01-1.341 0l-6.958-3.479a1.5 1.5 0 01-.829-1.342V7.904c0-.292.085-.571.237-.808"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">
                        No transactions found
                      </h4>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search to find what you're looking for.
                      </p>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Table Footer - Pagination -->
      <app-table-three-card-footer
        [currentPage]="currentPage"
        [totalPages]="10"
        (pageChange)="currentPage = $event"
      />
    </div>
  `,
})
export class TableThreeComponent {
  @Input() data: Transaction[] = latestTransactionsData;
  @Input() className = '';

  searchQuery = '';
  currentPage = 1;

  get filteredTransactions(): Transaction[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.data;
    return this.data.filter((t) => {
      return (
        t.name.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.status.toLowerCase().includes(query) ||
        t.price.toLowerCase().includes(query) ||
        t.date.toLowerCase().includes(query)
      );
    });
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
  }
}
