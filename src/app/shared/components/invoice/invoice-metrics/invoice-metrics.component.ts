import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-metrics',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule, // Required for CurrencyPipe
  ],
  templateUrl: './invoice-metrics.component.html'
})
export class InvoiceMetricsComponent {
  // Replace these with actual data calls from your service later
  public todayRevenue = signal(450.00);
  public weeklyRevenue = signal(3200.50);
  public monthlyRevenue = signal(12500.80);
  public yearlyAmount = signal(312500.80);
}