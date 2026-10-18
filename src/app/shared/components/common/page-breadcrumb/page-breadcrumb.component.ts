import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-breadcrumb',
  imports: [
    RouterModule,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './page-breadcrumb.component.html',
  styles: ``
})
export class PageBreadcrumbComponent {
  @Input() pageTitle = '';
}
