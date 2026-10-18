import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header.component';
import { recentOrdersData } from './data';
import { OrderRowComponent } from './order-row.component';
import { CrmOrder, DealStatus } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'app-table-two',
  imports: [ButtonComponent, ...TABLE_IMPORTS, CommonModule, CardHeaderComponent, OrderRowComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      class="w-full max-w-full min-w-0 gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-800 dark:bg-white/3 {{ className }}"
    >
      <!-- Table Header Controls -->
      <app-table-two-card-header
        [searchQuery]="searchQuery"
        (searchChange)="onSearchChange($event)"
        [statusFilter]="statusFilter"
        (statusFilterChange)="onStatusFilterChange($event)"
      />

      <!-- Table Content -->
      <div class="max-w-full overflow-x-auto">
        <div class="min-w-175 2xl:min-w-202">
          <table app-table class="min-w-full">
            <thead app-table-header class="border-y border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <tr app-table-row>
                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  <div class="flex items-center gap-3">
                    <button app-button variant="unstyled"
                      type="button"
                      (click)="toggleSelectAll()"
                      aria-label="Select all orders"
                      class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
                      [class]="
                        isAllSelected
                          ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
                          : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
                      "
                    >
                      @if (isAllSelected) {
                        <svg
                          class="size-3"
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
                    </button>
                    <span>Deal ID</span>
                  </div>
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Customer
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Product/Service
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Deal Value
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Close Date
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>

                <th app-table-cell
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody app-table-body class="min-h-96 divide-y divide-gray-100 dark:divide-gray-800">
              @if (filteredOrders.length > 0) {
                @for (order of filteredOrders; track order.id) {
                  <tr app-table-row
                    app-table-two-order-row
                    [order]="order"
                    [isSelected]="isRowSelected(order.id)"
                    (select)="toggleRowSelect($event)"
                    (delete)="deleteOrder($event)"
                  ></tr>
                }
              } @else {
                <tr app-table-row>
                  <td app-table-cell
                    colspan="7"
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
                        No orders found
                      </h4>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class TableTwoComponent {
  @Input() data: CrmOrder[] = recentOrdersData;
  @Input() className = '';

  orders: CrmOrder[] = [...this.data];
  searchQuery = '';
  statusFilter: DealStatus | 'all' = 'all';
  selectedRows = new Set<string>(['1']);

  ngOnInit() {
    this.orders = [...this.data];
  }

  get filteredOrders(): CrmOrder[] {
    return this.orders.filter((order) => {
      const matchesStatus =
        this.statusFilter === 'all' || order.status === this.statusFilter;
      const query = this.searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        order.dealId.toLowerCase().includes(query) ||
        order.user.name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        order.productName.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }

  get isAllSelected(): boolean {
    const list = this.filteredOrders;
    return list.length > 0 && list.every((item) => this.selectedRows.has(item.id));
  }

  toggleSelectAll() {
    const list = this.filteredOrders;
    if (this.isAllSelected) {
      list.forEach((item) => this.selectedRows.delete(item.id));
    } else {
      list.forEach((item) => this.selectedRows.add(item.id));
    }
  }

  isRowSelected(id: string): boolean {
    return this.selectedRows.has(id);
  }

  toggleRowSelect(id: string) {
    if (this.selectedRows.has(id)) {
      this.selectedRows.delete(id);
    } else {
      this.selectedRows.add(id);
    }
  }

  deleteOrder(id: string) {
    this.orders = this.orders.filter((o) => o.id !== id);
    this.selectedRows.delete(id);
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
  }

  onStatusFilterChange(filter: DealStatus | 'all') {
    this.statusFilter = filter;
  }
}
