import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-header',
  imports: [],
  host: { class: 'flex items-center justify-between px-6 py-4 sm:py-5' },
  template: `
    <h3 class="text-title-sm sm:text-title-md font-medium text-gray-800 dark:text-white/90">
      {{ title }}
    </h3>
    <p class="text-sm sm:text-base font-normal text-gray-700 dark:text-gray-300">
      ID : {{ invoiceId }}
    </p>
  `,
})
export class InvoiceHeaderComponent {
  @Input() title = 'Invoice';
  @Input() invoiceId = '#34834';
}
