import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-badge',
  imports: [CommonModule],
  template: `
    <span
      data-slot="avatar-badge"
      [attr.data-variant]="variant"
      class="text-primary-foreground absolute top-0 end-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 ring-white select-none dark:ring-black
        group-data-[size=xs]/avatar:size-1.5
        group-data-[size=sm]/avatar:size-2
        group-data-[size=default]/avatar:size-2.5
        group-data-[size=lg]/avatar:size-3
        group-data-[size=xl]/avatar:size-3.5
        {{ variantClasses[variant] }}
        {{ className }}"
    ></span>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class AvatarBadgeComponent {
  @Input() variant: 'online' | 'offline' | 'busy' = 'online';
  @Input() className: string = '';

  variantClasses: Record<'online' | 'offline' | 'busy', string> = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    busy: 'bg-amber-500',
  };
}
