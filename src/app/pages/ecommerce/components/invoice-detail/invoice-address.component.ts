import { Component, Input } from '@angular/core';
import { SeparatorComponent } from '../../../../shared/components/ui/separator/separator.component';
import { defaultInvoiceData } from './data';
import { InvoiceParty } from './types';

@Component({
  selector: 'app-invoice-address',
  imports: [SeparatorComponent],
  host: { class: 'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6' },
  template: `
    <!-- From Address -->
    <div class="flex flex-col gap-4 text-start">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ from.label }}
          </span>
          <p class="text-base font-semibold text-gray-800 dark:text-white/90">
            {{ from.name }}
          </p>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 leading-5">
          @for (line of from.addressLines; track $index) {
            <p>{{ line }}</p>
          }
        </div>
      </div>

      <div class="flex flex-col gap-1.5 text-sm leading-5">
        <span class="font-medium text-gray-700 dark:text-gray-300">
          {{ from.dateLabel }}
        </span>
        <span class="text-gray-500 dark:text-gray-400">
          {{ from.date }}
        </span>
      </div>
    </div>

    <!-- Responsive Separator -->
    <app-separator orientation="vertical" className="hidden sm:block self-stretch" />
    <app-separator orientation="horizontal" className="sm:hidden" />

    <!-- To Address -->
    <div class="flex flex-col gap-4 text-start sm:text-end sm:items-end">
      <div class="flex flex-col gap-2 sm:items-end">
        <div class="flex flex-col gap-1 sm:items-end">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ to.label }}
          </span>
          <p class="text-base font-semibold text-gray-800 dark:text-white/90">
            {{ to.name }}
          </p>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 leading-5 sm:text-end">
          @for (line of to.addressLines; track $index) {
            <p>{{ line }}</p>
          }
        </div>
      </div>

      <div class="flex flex-col gap-1.5 text-sm leading-5 sm:items-end">
        <span class="font-medium text-gray-700 dark:text-gray-300">
          {{ to.dateLabel }}
        </span>
        <span class="text-gray-500 dark:text-gray-400 sm:text-end">
          {{ to.date }}
        </span>
      </div>
    </div>
  `,
})
export class InvoiceAddressComponent {
  @Input() from: InvoiceParty = defaultInvoiceData.from;
  @Input() to: InvoiceParty = defaultInvoiceData.to;
}
