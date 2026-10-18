import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-item',
  imports: [CommonModule],
  host: {
    class: 'block',
  },
  template: `
    <div [class]="className">
      <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {{ label }}
      </p>
      <p class="text-sm font-medium text-gray-800 dark:text-white/90">
        {{ value }}
      </p>
    </div>
  `,
})
export class AddressItemComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() className = '';
}
