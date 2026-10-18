import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-group',
  imports: [CommonModule],
  template: `
    <div
      data-slot="avatar-group"
      class="group/avatar-group flex -space-x-2 rtl:space-x-reverse *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-white dark:*:data-[slot=avatar]:ring-gray-800 dark:**:data-[slot=avatar-fallback]:bg-[#192130]! {{ className }}"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `
})
export class AvatarGroupComponent {
  @Input() className: string = '';
}
