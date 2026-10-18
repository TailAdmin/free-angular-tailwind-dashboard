import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../services/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
};

const darkCount = 18;
const lightCount = 18;
const grayCount = 18;
const totalBars = darkCount + lightCount + grayCount; // 54 bars

@Component({
  selector: 'app-bar-chart-six',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './bar-chart-six.component.html',
})
export class BarChartSixComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService) {
    this.chartOptions = this.getChartOptions('light');
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
      this.chartOptions = this.getChartOptions(theme);
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  private getChartOptions(theme: string): Partial<ChartOptions> {
    const isDark = theme === 'dark';
    const grayColor = isDark ? '#374151' : '#E5E7EB';

    return {
      series: [
        {
          name: 'Progress',
          data: Array(totalBars).fill(100),
        },
      ],
      colors: [
        ...Array(darkCount).fill('#465FFF'),
        ...Array(lightCount).fill('#9CB9FF'),
        ...Array(grayCount).fill(grayColor),
      ],
      chart: {
        fontFamily: 'Outfit, sans-serif',
        type: 'bar',
        height: 32,
        sparkline: { enabled: true },
        toolbar: { show: false },
        animations: { enabled: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          distributed: true,
          columnWidth: '70%',
          borderRadius: 1,
          borderRadiusApplication: 'around',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
    };
  }
}
