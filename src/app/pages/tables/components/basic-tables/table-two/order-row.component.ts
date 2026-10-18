import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmOrder } from './types';
import { TABLE_IMPORTS } from '../../../ui/table';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: '[app-table-two-order-row]',
  imports: [ButtonComponent, ...TABLE_IMPORTS, CommonModule],
  template: `
    <td app-table-cell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">
        <button app-button variant="unstyled"
          type="button"
          (click)="select.emit(order.id)"
          [attr.aria-label]="'Select deal ' + order.dealId"
          class="peer relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border shadow-theme-xs outline-hidden transition-colors"
          [class]="
            isSelected
              ? 'border-brand-500 bg-brand-500 text-white hover:border-brand-600 hover:bg-brand-600 dark:border-brand-500 dark:bg-brand-500'
              : 'border-gray-300 bg-white hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-400'
          "
        >
          @if (isSelected) {
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
        <span class="text-sm font-medium text-gray-700 dark:text-gray-400">
          {{ order.dealId }}
        </span>
      </div>
    </td>

    <td app-table-cell class="px-6 py-4 text-start">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none {{ order.user.avatarClassName }}"
        >
          {{ order.user.initials }}
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-800 dark:text-white/90">
            {{ order.user.name }}
          </span>
          <span class="block text-sm text-gray-500 dark:text-gray-400">
            {{ order.user.email }}
          </span>
        </div>
      </div>
    </td>

    <td app-table-cell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.productName }}
      </span>
    </td>

    <td app-table-cell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.dealValue }}
      </span>
    </td>

    <td app-table-cell class="px-6 py-4 text-start">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        {{ order.closeDate }}
      </span>
    </td>

    <td app-table-cell class="px-6 py-4 text-start">
      <span
        class="inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium"
        [ngClass]="{
          'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500': order.status === 'complete',
          'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-orange-400': order.status === 'pending',
          'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500': order.status === 'cancel'
        }"
      >
        {{ order.status === 'complete' ? 'Complete' : order.status === 'pending' ? 'Pending' : 'Cancel' }}
      </span>
    </td>

    <td app-table-cell class="px-6 py-4 text-center">
      <button app-button variant="unstyled"
        type="button"
        (click)="delete.emit(order.id)"
        aria-label="Delete order"
        class="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.541 3.792a2.25 2.25 0 012.25-2.25h2.417a2.25 2.25 0 012.25 2.25v.25H16.666a.75.75 0 010 1.5h-.29v10.666a2.25 2.25 0 01-2.25 2.25h-8.25a2.25 2.25 0 01-2.25-2.25V5.541h-.292a.75.75 0 110-1.5H6.54v-.25zm8.334 9.454V5.541h-9.75v10.667c0 .414.336.75.75.75h8.25a.75.75 0 00.75-.75v-2.962zM8.041 4.041h3.917v-.25a.75.75 0 00-.75-.75H8.791a.75.75 0 00-.75.75v.25zM8.334 8a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75zm4.083.75a.75.75 0 00-1.5 0v5a.75.75 0 101.5 0v-5z"
            fill="currentColor"
          />
        </svg>
      </button>
    </td>
  `,
  host: {
    class: 'transition hover:bg-gray-50/50 dark:hover:bg-white/2',
  },
})
export class OrderRowComponent {
  @Input({ required: true }) order!: CrmOrder;
  @Input() isSelected = false;
  @Output() select = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
}
