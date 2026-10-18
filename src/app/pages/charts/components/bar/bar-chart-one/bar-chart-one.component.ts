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
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-bar-chart-one',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './bar-chart-one.component.html',
})
export class BarChartOneComponent implements OnInit, OnDestroy {
  public series: ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [230, 310, 270, 390, 210, 170, 260, 270, 150, 80, 180, 120],
    },
  ];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 200,
    toolbar: {
      show: false,
    },
  };

  public colors: string[] = ['#465FFF'];

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '38%',
      borderRadius: 8,
      borderRadiusApplication: 'around',
      dataLabels: {
        position: 'top',
      },
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (val: number) => `${(val / 100).toFixed(1)}%`,
    offsetY: -20,
    style: {
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 400,
      colors: ['#364153'],
    },
    dropShadow: {
      enabled: false,
    },
  };

  public stroke: ApexStroke = {
    show: false,
  };

  public xaxis: ApexXAxis = {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        colors: '#364153',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  };

  public legend: ApexLegend = {
    show: false,
  };

  public yaxis: ApexYAxis = {
    max: 420,
    min: 0,
    tickAmount: 4,
    labels: {
      show: false,
    },
  };

  public grid: ApexGrid = {
    borderColor: '#F3F4F6',
    strokeDashArray: 0,
    padding: {
      left: -10,
      right: 0,
    },
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
  };

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#7592FF',
          opacity: 1,
        },
        {
          offset: 100,
          color: '#465FFF',
          opacity: 1,
        },
      ],
    },
  };

  public tooltip: ApexTooltip = {
    x: {
      show: false,
    },
    y: {
      formatter: (val: number) => `${(val / 100).toFixed(1)}%`,
    },
  };

  private themeSub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.isDarkMode$.subscribe((isDark) => {
      this.updateThemeConfig(isDark);
    });
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }

  private updateThemeConfig(isDark: boolean): void {
    const textColor = isDark ? '#94A3B8' : '#364153';
    const borderColor = isDark ? '#1E2640' : '#F3F4F6';

    this.grid = {
      ...this.grid,
      borderColor,
    };

    this.dataLabels = {
      ...this.dataLabels,
      style: {
        ...this.dataLabels.style,
        colors: [textColor],
      },
    };

    this.xaxis = {
      ...this.xaxis,
      labels: {
        ...this.xaxis.labels,
        style: {
          ...this.xaxis.labels?.style,
          colors: textColor,
        },
      },
    };
  }
}
