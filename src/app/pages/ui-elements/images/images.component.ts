import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { ResponsiveImageComponent } from './components/responsive/responsive.component';
import { TwoColumnImageGridComponent } from './components/two-column-grid/two-column-grid.component';
import { ThreeColumnImageGridComponent } from './components/three-column-grid/three-column-grid.component';

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
