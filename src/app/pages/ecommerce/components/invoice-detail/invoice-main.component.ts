import { Component, Input } from '@angular/core';
import { SeparatorComponent } from '../ui/separator/separator.component';
import { defaultInvoiceData } from './data';
import { InvoiceActionsComponent } from './invoice-actions.component';
import { InvoiceAddressComponent } from './invoice-address.component';
import { InvoiceHeaderComponent } from './invoice-header.component';
import { InvoiceSummaryComponent } from './invoice-summary.component';
import { InvoiceTableComponent } from './invoice-table.component';
import { InvoiceData } from './types';

@Component({
  selector: 'app-invoice-main',
  imports: [
    SeparatorComponent,
    InvoiceHeaderComponent,
    InvoiceAddressComponent,
    InvoiceTableComponent,
    InvoiceSummaryComponent,
    InvoiceActionsComponent,
  ],
  host: {
    class: 'block rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3',
  },
  template: `
    <app-invoice-header [invoiceId]="data.invoiceId" />

    <app-separator orientation="horizontal" />

    <div class="space-y-8 p-6 sm:space-y-9 sm:p-8">
      <app-invoice-address [from]="data.from" [to]="data.to" />

      <app-invoice-table [items]="data.items" />

      <app-invoice-summary [summary]="data.summary" />

      <app-invoice-actions />
    </div>
  `,
})
export class InvoiceMainComponent {
  @Input() data: InvoiceData = defaultInvoiceData;
}
