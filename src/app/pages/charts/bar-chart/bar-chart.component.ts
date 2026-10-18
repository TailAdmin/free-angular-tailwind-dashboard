import { Component } from '@angular/core';
import { BarChartOneComponent } from '../components/bar/bar-chart-one/bar-chart-one.component';
import { BarChartTwoComponent } from '../components/bar/bar-chart-two/bar-chart-two.component';
import { BarChartThreeComponent } from '../components/bar/bar-chart-three/bar-chart-three.component';
import { BarChartFourComponent } from '../components/bar/bar-chart-four/bar-chart-four.component';
import { BarChartFiveComponent } from '../components/bar/bar-chart-five/bar-chart-five.component';
import { BarChartSixComponent } from '../components/bar/bar-chart-six/bar-chart-six.component';
import { BarChartSevenComponent } from '../components/bar/bar-chart-seven/bar-chart-seven.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-bar-chart',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    BarChartOneComponent,
    BarChartTwoComponent,
    BarChartThreeComponent,
    BarChartFourComponent,
    BarChartFiveComponent,
    BarChartSixComponent,
    BarChartSevenComponent,
  ],
  templateUrl: './bar-chart.component.html',
  styles: ``,
})
export class BarChartComponent {}
