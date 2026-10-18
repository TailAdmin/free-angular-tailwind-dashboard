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
  selector: 'app-bar-chart-two',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './bar-chart-two.component.html',
})
export class BarChartTwoComponent implements OnInit, OnDestroy {
  public series: ApexAxisChartSeries = [
    {
      name: 'Income',
      data: [
        9700, 6000, 16300, 4400, 7000, 9700, 4400, 9700, 9700, 7000, 9700,
        16300, 9700,
      ],
    },
    {
      name: 'Expense',
      data: [
        10300, 6400, 3000, 14900, 4300, 6900, 14900, 4300, 6900, 4300, 6900,
        3000, 6900,
      ],
    },
  ];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    stacked: true,
    height: 200,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  };

  public colors: string[] = ['#7592FF', '#7CD4FD'];

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 8,
      borderRadiusApplication: 'end',
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public stroke: ApexStroke = {
    show: false,
  };

  public xaxis: ApexXAxis = {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
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
        fontSize: '12px',
      },
    },
  };

  public legend: ApexLegend = {
    show: false,
  };

  public yaxis: ApexYAxis = {
    min: 0,
    max: 25000,
    tickAmount: 5,
    labels: {
      style: {
        colors: '#364153',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
      },
      formatter: (val: number) => {
        if (val === 0) return '0';
        if (val >= 1000) return `${Math.round(val / 1000)}K`;
        return val.toString();
      },
    },
  };

  public grid: ApexGrid = {
    borderColor: '#F3F4F6',
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
  };

  public fill: ApexFill = {
    opacity: 1,
  };

  public tooltip: ApexTooltip = {
    x: {
      show: false,
    },
    y: {
      formatter: (val: number) => `$${val?.toLocaleString?.() ?? val}`,
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

    this.yaxis = {
      ...this.yaxis,
      labels: {
        ...this.yaxis.labels,
        style: {
          ...this.yaxis.labels?.style,
          colors: textColor,
        },
      },
    };
  }
}
