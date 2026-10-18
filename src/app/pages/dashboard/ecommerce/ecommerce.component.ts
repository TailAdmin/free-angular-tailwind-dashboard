import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../../shared/components/home/ecommerce/metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../../shared/components/home/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../../../shared/components/home/ecommerce/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../../../shared/components/home/ecommerce/statistics-chart/statistics-chart.component';
import { DemographicCardComponent } from '../../../shared/components/home/ecommerce/demographic-card/demographic-card.component';
import { RecentOrdersComponent } from '../../../shared/components/home/ecommerce/recent-orders/recent-orders.component';

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
