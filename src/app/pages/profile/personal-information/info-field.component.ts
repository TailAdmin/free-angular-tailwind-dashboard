import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-field',
  imports: [CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div class="flex flex-col gap-1 sm:gap-2">
      <p class="text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
        {{ label }}
      </p>
      <p class="text-sm sm:text-base font-medium text-gray-800 dark:text-white/90">
        {{ value || '—' }}
      </p>
    </div>
  `
})
export class InfoFieldComponent {
  @Input() label = '';
  @Input() value = '';
}
