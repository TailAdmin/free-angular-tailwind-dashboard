import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BlankCardComponent } from '../../shared/components/blank';

@Component({
  selector: 'app-blank',
  imports: [
    PageBreadcrumbComponent,
    BlankCardComponent,
  ],
  host: {
    class: 'block',
  },
  template: `
    <div>
      <app-page-breadcrumb pageTitle="Blank Page" />
      <app-blank-card />
    </div>
  `,
})
export class BlankComponent {}
