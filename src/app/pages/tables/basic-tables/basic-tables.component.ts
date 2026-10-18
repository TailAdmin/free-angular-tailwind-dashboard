import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import {
  TableOneComponent,
  TableTwoComponent,
  TableThreeComponent,
  TableFourComponent,
  TableFiveComponent,
} from '../../../shared/components/tables/basic-tables';

@Component({
  selector: 'app-basic-tables',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    TableOneComponent,
    TableTwoComponent,
    TableThreeComponent,
    TableFourComponent,
    TableFiveComponent,
  ],
  host: {
    class: 'block',
  },
  template: `
    <div>
      <app-page-breadcrumb pageTitle="Basic Tables" />
      <div class="space-y-6">
        <app-component-card title="Basic Table 1">
          <app-table-one />
        </app-component-card>
        <app-component-card title="Basic Table 2">
          <app-table-two />
        </app-component-card>
        <app-component-card title="Basic Table 3">
          <app-table-three />
        </app-component-card>
        <app-component-card title="Basic Table 4">
          <app-table-four />
        </app-component-card>
        <app-component-card title="Basic Table 5">
          <app-table-five />
        </app-component-card>
      </div>
    </div>
  `,
})
export class BasicTablesComponent {}
