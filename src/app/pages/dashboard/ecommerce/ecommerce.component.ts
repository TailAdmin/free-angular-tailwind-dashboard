import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../components/ecommerce/metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../components/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../components/ecommerce/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../components/ecommerce/statistics-chart/statistics-chart.component';
import { DemographicCardComponent } from '../components/ecommerce/demographic-card/demographic-card.component';
import { RecentOrdersComponent } from '../components/ecommerce/recent-orders/recent-orders.component';

@Component({
  selector: 'app-ecommerce',
  imports: [
    EcommerceMetricsComponent,
    MonthlySalesChartComponent,
    MonthlyTargetComponent,
    StatisticsChartComponent,
    DemographicCardComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './ecommerce.component.html',
})
export class EcommerceComponent {}
