import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { LineChartOneComponent } from '../../../shared/components/charts/line/line-chart-one/line-chart-one.component';
import { LineChartTwoComponent } from '../../../shared/components/charts/line/line-chart-two/line-chart-two.component';
import { LineChartThreeComponent } from '../../../shared/components/charts/line/line-chart-three/line-chart-three.component';
import { LineChartFourComponent } from '../../../shared/components/charts/line/line-chart-four/line-chart-four.component';
import { LineChartFiveComponent } from '../../../shared/components/charts/line/line-chart-five/line-chart-five.component';

@Component({
  selector: 'app-line-chart',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    LineChartOneComponent,
    LineChartTwoComponent,
    LineChartThreeComponent,
    LineChartFourComponent,
    LineChartFiveComponent,
  ],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent {}
