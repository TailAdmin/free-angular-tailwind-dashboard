import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { ResponsiveImageComponent } from '../../../shared/components/images/responsive/responsive.component';
import { TwoColumnImageGridComponent } from '../../../shared/components/images/two-column-grid/two-column-grid.component';
import { ThreeColumnImageGridComponent } from '../../../shared/components/images/three-column-grid/three-column-grid.component';

@Component({
  selector: 'app-images',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    ResponsiveImageComponent,
    TwoColumnImageGridComponent,
    ThreeColumnImageGridComponent,
  ],
  templateUrl: './images.component.html',
  styles: ``,
})
export class ImagesComponent {}
