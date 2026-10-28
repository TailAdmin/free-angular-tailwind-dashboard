import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  ApexChart,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DropdownItemComponent } from '../../../../../shared/components/ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownComponent } from '../../../../../shared/components/ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../../core/services/theme.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-monthly-target',
  imports: [ButtonComponent, 
    CommonModule,
    NgApexchartsModule,
    DropdownComponent,
    DropdownItemComponent,
  ],
  templateUrl: './monthly-target.component.html',
})
export class MonthlyTargetComponent implements OnInit, OnDestroy {
  public series: ApexNonAxisChartSeries = [75.55];

  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'radialBar',
    height: 330,
    sparkline: {
      enabled: true,
    },
  };

  public plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: '80%',
      },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: -35,
          color: '#1D2939',
          formatter: function (val: number) {
            return val + '%';
          },
        },
      },
    },
  };

  public fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#465FFF'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          color: '#9CB9FF',
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

  public stroke: ApexStroke = {
    lineCap: 'round',
  };

  public labels: string[] = ['Progress'];
  public colors: string[] = ['#9CB9FF'];

  isOpen = false;
  private themeSubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.updateThemeSettings(this.themeService.isDarkMode());
    this.themeSubscription = this.themeService.isDarkMode$.subscribe((isDark) => {
      this.updateThemeSettings(isDark);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  public updateThemeSettings(isDark: boolean): void {
    this.plotOptions = {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '80%',
        },
        track: {
          background: isDark ? '#1E2640' : '#E4E7EC',
          strokeWidth: '100%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '36px',
            fontWeight: '600',
            offsetY: -35,
            color: isDark ? '#FFFFFF' : '#1D2939',
            formatter: function (val: number) {
              return val + '%';
            },
          },
        },
      },
    };
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
