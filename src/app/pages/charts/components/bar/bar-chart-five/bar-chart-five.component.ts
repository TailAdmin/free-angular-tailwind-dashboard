import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-chart-five',
  imports: [CommonModule],
  templateUrl: './bar-chart-five.component.html',
})
export class BarChartFiveComponent {
  timeLabels = [
    '01:00 PM',
    '12:00 PM',
    '11:00 AM',
    '10:00 AM',
    '09:00 AM',
    '08:00 AM',
  ];

  dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  gridSlots = [
    // Row 1 (01:00 PM)
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-gray-50 dark:bg-gray-800/60',
    'bg-gray-50 dark:bg-gray-800/60',
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-gray-50 dark:bg-gray-800/60',
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-brand-100 dark:bg-brand-500/20',
    // Row 2 (12:00 PM)
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-brand-200 dark:bg-brand-500/35',
    // Row 3 (11:00 AM)
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-100 dark:bg-brand-500/20',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-300 dark:bg-brand-500/50',
    // Row 4 (10:00 AM)
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-gray-50 dark:bg-gray-800/60',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-500 dark:bg-brand-500',
    // Row 5 (09:00 AM)
    'bg-brand-500 dark:bg-brand-500',
    'bg-brand-500 dark:bg-brand-500',
    'bg-brand-500 dark:bg-brand-500',
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-500 dark:bg-brand-500',
    'bg-brand-500 dark:bg-brand-500',
    // Row 6 (08:00 AM)
    'bg-brand-300 dark:bg-brand-500/50',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-gray-50 dark:bg-gray-800/60',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-200 dark:bg-brand-500/35',
    'bg-brand-400 dark:bg-brand-500/70',
    'bg-brand-500 dark:bg-brand-500',
  ];
}
