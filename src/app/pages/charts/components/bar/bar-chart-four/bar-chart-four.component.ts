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
  legend: ApexLegend;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  colors: string[];
};

@Component({
  selector: 'app-bar-chart-four',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './bar-chart-four.component.html',
})
export class BarChartFourComponent implements OnInit, OnDestroy {
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

    return {
      colors: ['#465FFF', isDark ? '#344054' : '#E4E7EC'],
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
          horizontal: true,
          barHeight: '35%',
          borderRadius: 4,
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        min: 0,
        max: 700,
        tickAmount: 7,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: isDark ? '#94A3B8' : '#364153',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: isDark ? '#94A3B8' : '#364153',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
          },
        },
      },
      legend: {
        show: false,
      },
      grid: {
        borderColor: isDark ? '#1E2640' : '#F3F4F6',
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
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
          show: true,
        },
      },
      series: [
        {
          name: 'Category A',
          data: [610, 530, 490, 465, 600],
        },
        {
          name: 'Category B',
          data: [540, 560, 480, 510, 540],
        },
      ],
    };
  }
}
