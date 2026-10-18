import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';

@Component({
  selector: 'app-avatar-fallback',
  imports: [CommonModule],
  template: `
    @if (!avatar || avatar.isImageError() || !avatar.isImageLoaded()) {
      <span
        data-slot="avatar-fallback"
        class="absolute inset-0 flex size-full items-center justify-center rounded-full bg-[#F3F4F6] text-sm text-gray-700 group-data-[size=sm]/avatar:text-xs group-data-[size=xs]/avatar:text-xs dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-400 {{ className }}"
      >
        <ng-content></ng-content>
      </span>
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class AvatarFallbackComponent {
  @Input() className: string = '';

  public avatar = inject(AvatarComponent, { optional: true });
}
