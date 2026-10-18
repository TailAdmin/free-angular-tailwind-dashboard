import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
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
import { areaChartCrosshairs, areaChartTooltip } from '../../../../../shared/utils/apex-tooltip';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { InputDirective } from '../../../../../shared/components/ui/input/input.directive';

type StatisticTab = 'overview' | 'sales' | 'revenue';

@Component({
  selector: 'app-statistics-chart',
  imports: [InputDirective, ButtonComponent, CommonModule, NgApexchartsModule],
  templateUrl: './statistics-chart.component.html',
})
export class StatisticsChartComponent implements AfterViewInit {
  @ViewChild('datepicker') datepicker!: ElementRef<HTMLInputElement>;

  selectedTab: StatisticTab = 'overview';
  dateRangeFactor = 1;

  tabs: StatisticTab[] = ['overview', 'sales', 'revenue'];

  private readonly salesData = [
    180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235,
  ];

  private readonly revenueData = [
    40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140,
  ];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    height: 310,
    type: 'area',
    toolbar: { show: false },
  };

  public markers: ApexMarkers = {
    size: 0,
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: { size: 6 },
  };

  public grid: ApexGrid = {
    borderColor: '#F3F4F6',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  };

  public dataLabels: ApexDataLabels = { enabled: false };

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  };

  public tooltip: ApexTooltip = {
    enabled: true,
    shared: true,
    intersect: false,
    custom: areaChartTooltip,
  };

  public xaxis: ApexXAxis = {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: areaChartCrosshairs(
      typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'),
    ),
    tooltip: { enabled: false },
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: ['#6B7280'],
      },
    },
  };

  public yaxis: ApexYAxis = {
    labels: {
      style: {
        fontSize: '12px',
        fontFamily: 'Outfit, sans-serif',
        colors: ['#6B7280'],
      },
    },
    title: {
      text: '',
      style: { fontSize: '0px' },
    },
  };

  public legend: ApexLegend = {
    show: false,
  };

  get colors(): string[] {
    switch (this.selectedTab) {
      case 'sales':
        return ['#465FFF'];
      case 'revenue':
        return ['#9CB9FF'];
      case 'overview':
      default:
        return ['#465FFF', '#9CB9FF'];
    }
  }

  get stroke(): ApexStroke {
    return {
      curve: 'straight',
      width: this.selectedTab === 'overview' ? [2, 2] : [2],
    };
  }

  get series(): ApexAxisChartSeries {
    const scaledSales = this.salesData.map((val) =>
      Math.round(val * this.dateRangeFactor)
    );
    const scaledRevenue = this.revenueData.map((val) =>
      Math.round(val * this.dateRangeFactor)
    );

    switch (this.selectedTab) {
      case 'sales':
        return [
          {
            name: 'Sales',
            data: scaledSales,
          },
        ];
      case 'revenue':
        return [
          {
            name: 'Revenue',
            data: scaledRevenue,
          },
        ];
      case 'overview':
      default:
        return [
          {
            name: 'Sales',
            data: scaledSales,
          },
          {
            name: 'Revenue',
            data: scaledRevenue,
          },
        ];
    }
  }

  setTab(tab: StatisticTab) {
    this.selectedTab = tab;
  }

  ngAfterViewInit() {
    if (!this.datepicker?.nativeElement) return;

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    flatpickr(this.datepicker.nativeElement, {
      mode: 'range',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'd M',
      defaultDate: [startDate, today],
      clickOpens: true,
      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onChange: (selectedDates: Date[]) => {
        if (selectedDates.length === 2) {
          const days = Math.round(
            Math.abs(selectedDates[1].getTime() - selectedDates[0].getTime()) /
              (1000 * 60 * 60 * 24)
          );
          this.dateRangeFactor = Math.max(
            0.6,
            Math.min(1.4, Number((days / 30).toFixed(2)))
          );
        }
      },
    });
  }
}
