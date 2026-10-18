import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InvoiceSidebarComponent, InvoiceMainComponent } from '../components/invoice-detail';

@Component({
  selector: 'app-invoice',
  imports: [
    PageBreadcrumbComponent,
    InvoiceSidebarComponent,
    InvoiceMainComponent,
  ],
  templateUrl: './invoice.component.html',
  styles: ``,
})
export class InvoiceComponent {}
