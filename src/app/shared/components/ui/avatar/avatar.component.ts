import { CommonModule } from '@angular/common';
import { Component, Input, signal, viewChild } from '@angular/core';
import { BrnAvatarFallback, BrnAvatarImage } from '@spartan-ng/brain/avatar';

export type AvatarSize =
  | 'xs'
  | 'sm'
  | 'default'
  | 'medium'
  | 'lg'
  | 'xl'
  | 'xsmall'
  | 'small'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'none';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule, BrnAvatarImage, BrnAvatarFallback],
  host: {
    '[attr.data-slot]': '"avatar"',
    '[attr.data-size]': 'normalizedSize',
    '[class]':
      '"group/avatar relative flex shrink-0 rounded-full select-none dark:after:mix-blend-lighten " + sizeClasses[normalizedSize] + " " + className',
  },
  template: `
    @if (src) {
      <img
        brnAvatarImage
        data-slot="avatar-image"
        [src]="src"
        [alt]="alt"
        class="aspect-square size-full rounded-full object-cover"
        [class.hidden]="!image()?.canShow()"
      />
    }

    @if (fallback && (!src || !image()?.canShow())) {
      <span
        brnAvatarFallback
        data-slot="avatar-fallback"
        class="absolute inset-0 flex size-full items-center justify-center rounded-full bg-[#F3F4F6] text-gray-700 dark:bg-[rgba(255,255,255,0.05)] dark:text-gray-400 {{ fallbackTextSizeClasses[normalizedSize] }}"
      >
        {{ fallback }}
      </span>
    }

    @if (status !== 'none') {
      <span
        data-slot="avatar-badge"
        [attr.data-variant]="status"
        class="text-primary-foreground absolute top-0 end-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 ring-white select-none dark:ring-black {{ statusSizeClasses[normalizedSize] }} {{ statusColorClasses[status] }}"
      ></span>
    }

    <ng-content></ng-content>
  `,
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() alt: string = 'user avatar';
  @Input() size: AvatarSize = 'default';
  @Input() status: AvatarStatus = 'none';
  @Input() fallback: string = '';
  @Input() className: string = '';

  // load / error state comes from spartan's brain avatar image directive
  protected readonly image = viewChild(BrnAvatarImage);

  // state reported by the composable <app-avatar-image> child (see avatar-image / avatar-fallback)
  isImageLoaded = signal(false);
  isImageError = signal(false);

  onImageLoaded() {
    this.isImageLoaded.set(true);
    this.isImageError.set(false);
  }

  onImageError() {
    this.isImageError.set(true);
    this.isImageLoaded.set(false);
  }

  get normalizedSize(): 'xs' | 'sm' | 'default' | 'lg' | 'xl' {
    switch (this.size) {
      case 'xs':
      case 'xsmall':
        return 'xs';
      case 'sm':
      case 'small':
        return 'sm';
      case 'lg':
      case 'large':
        return 'lg';
      case 'xl':
      case 'xlarge':
      case 'xxlarge':
        return 'xl';
      case 'default':
      case 'medium':
      default:
        return 'default';
    }
  }

  sizeClasses: Record<'xs' | 'sm' | 'default' | 'lg' | 'xl', string> = {
    xs: 'size-6',
    sm: 'size-8',
    default: 'size-10',
    lg: 'size-12',
    xl: 'size-14',
  };

  fallbackTextSizeClasses: Record<'xs' | 'sm' | 'default' | 'lg' | 'xl', string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  statusSizeClasses: Record<'xs' | 'sm' | 'default' | 'lg' | 'xl', string> = {
    xs: 'size-1.5',
    sm: 'size-2',
    default: 'size-2.5',
    lg: 'size-3',
    xl: 'size-3.5',
  };

  statusColorClasses: Record<Exclude<AvatarStatus, 'none'>, string> = {
    online: 'bg-green-500',
    offline: 'bg-red-500',
    busy: 'bg-amber-500',
  };
}
