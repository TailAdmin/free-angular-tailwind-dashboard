import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CategoryItem {
  name: string;
  color: string;
}

@Component({
  selector: 'app-bar-chart-seven',
  imports: [CommonModule],
  templateUrl: './bar-chart-seven.component.html',
})
export class BarChartSevenComponent {
  categories: CategoryItem[] = [
    { name: 'Activity', color: 'bg-[#7592FF]' },
    { name: 'Online Purchases', color: 'bg-[#7CD4FD]' },
    { name: 'Groceries', color: 'bg-[#BDB4FE]' },
    { name: 'Digital Goods', color: 'bg-[#FE9EFE]' },
    { name: 'Stationery', color: 'bg-[#6FEAA6]' },
    { name: 'Others', color: 'bg-[#D0D5DD] dark:bg-gray-700' },
  ];
}
