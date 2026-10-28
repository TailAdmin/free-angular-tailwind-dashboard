import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
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
import { ThemeService } from '../../../../../core/services/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-bar-chart-three',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './bar-chart-three.component.html',
})
export class BarChartThreeComponent implements OnInit, OnDestroy {
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
    const textColor = isDark ? '#94A3B8' : '#364153';
    const borderColor = isDark ? '#1E2640' : '#F3F4F6';

    return {
      colors: ['#7592FF', '#BDB4FE', '#7CD4FD'],
      chart: {
        fontFamily: 'Outfit, sans-serif',
        type: 'bar',
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '39%',
          borderRadius: 2,
          borderRadiusApplication: 'end',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: textColor,
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
          },
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        min: 0,
        max: 200,
        tickAmount: 4,
        labels: {
          style: {
            colors: textColor,
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor,
        strokeDashArray: 0,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
      series: [
        {
          name: 'Shipment',
          data: [50, 75, 78, 78, 50, 92, 92, 118, 50, 116, 102, 50],
        },
        {
          name: 'In Transit',
          data: [120, 140, 192, 185, 120, 142, 142, 204, 120, 202, 172, 120],
        },
        {
          name: 'Delivery',
          data: [42, 54, 44, 32, 42, 60, 60, 76, 42, 74, 64, 42],
        },
      ],
    };
  }
}
