import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InvoiceSidebarComponent, InvoiceMainComponent } from '../../shared/components/invoice';

@Component({
  selector: 'app-invoices',
  imports: [
    PageBreadcrumbComponent,
    InvoiceSidebarComponent,
    InvoiceMainComponent,
  ],
  templateUrl: './invoices.component.html',
  styles: ``,
})
export class InvoicesComponent {}
