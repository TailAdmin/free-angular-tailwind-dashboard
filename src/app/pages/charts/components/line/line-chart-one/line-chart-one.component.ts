import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-line-chart-one',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './line-chart-one.component.html',
})
export class LineChartOneComponent implements OnInit, OnDestroy {
  public series: ApexAxisChartSeries = [
    {
      name: 'Sales',
      data: [
        8000, 13000, 7000, 6500, 3500, 7500, 6000, 18500, 12000, 4000, 9500,
        7500,
      ],
    },
  ];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    height: 310,
    type: 'area',
    toolbar: {
      show: false,
    },
  };

  public colors: string[] = ['#465FFF'];

  public stroke: ApexStroke = {
    curve: 'smooth',
    width: 2,
  };

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  };

  public markers: ApexMarkers = {
    size: 0,
    colors: ['#ffffff'],
    strokeColors: ['#465FFF'],
    strokeWidth: 2,
    hover: {
      size: 5,
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public grid: ApexGrid = {
    position: 'back',
    borderColor: '#F3F4F6',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  };

  public legend: ApexLegend = {
    show: false,
  };

  public xaxis: ApexXAxis = {
    type: 'category',
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
    crosshairs: {
      show: true,
      width: 2,
      position: 'back',
      opacity: 1,
      stroke: {
        width: 0,
        color: 'none',
      },
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#ffffff',
          colorTo: '#9CB9FF',
          stops: [0, 100],
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
    },
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: '#6B7280',
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  public yaxis: ApexYAxis = {
    min: 0,
    max: 20000,
    tickAmount: 4,
    labels: {
      formatter: (val: number): string => {
        if (val === 0) return '0';
        return `${(val / 1000).toFixed(0)}K`;
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: '#6B7280',
      },
    },
    title: {
      text: undefined,
    },
  };

  public tooltip: ApexTooltip = {
    enabled: true,
    shared: true,
    intersect: false,
    custom: ({ series: chartSeries, dataPointIndex, w }: any) => {
      const category =
        w.globals?.categoryLabels?.[dataPointIndex] ??
        w.config.xaxis?.categories?.[dataPointIndex] ??
        '';
      const colors = w.config.colors ?? ['#465FFF'];
      const seriesList = w.config.series ?? [];

      const rows = seriesList
        .map((s: any, idx: number) => {
          const val = chartSeries[idx]?.[dataPointIndex];
          const color = colors[idx] ?? '#465FFF';
          const formattedVal =
            typeof val === 'number' ? val.toLocaleString() : (val ?? '');
          return `
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <span class="size-1.5 rounded-full shrink-0" style="background-color: ${color}"></span>
                <span class="w-13 text-xs text-gray-800 dark:text-white/90">${s.name ?? ''}</span>
                <span class="text-xs font-medium text-gray-400 dark:text-gray-500">:</span>
              </div>
              <span class="text-xs font-medium text-gray-800 dark:text-white/90">${formattedVal}</span>
            </div>
          `;
        })
        .join('');

      return `
        <div class="min-w-32.5">
          <p class="mb-1 text-[10px] leading-4 text-gray-500 dark:text-gray-400">${category}</p>
          <div class="flex flex-col gap-1">
            ${rows}
          </div>
        </div>
      `;
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
    const textColor = isDark ? '#94A3B8' : '#6B7280';
    const borderColor = isDark ? '#1E2640' : '#F3F4F6';

    this.grid = {
      ...this.grid,
      borderColor,
    };

    this.xaxis = {
      ...this.xaxis,
      crosshairs: {
        ...this.xaxis.crosshairs,
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: isDark ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
            colorTo: '#9CB9FF',
            stops: [0, 100],
            opacityFrom: 1,
            opacityTo: 1,
          },
        },
      },
      labels: {
        ...this.xaxis.labels,
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
          colors: textColor,
        },
      },
    };

    this.yaxis = {
      ...this.yaxis,
      labels: {
        ...this.yaxis.labels,
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
          colors: textColor,
        },
      },
    };
  }
}
