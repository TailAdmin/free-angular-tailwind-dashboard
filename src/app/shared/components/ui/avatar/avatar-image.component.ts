import { Component, Input, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';

@Component({
  selector: 'app-avatar-image',
  imports: [CommonModule],
  template: `
    <img
      #imgRef
      data-slot="avatar-image"
      [src]="src"
      [alt]="alt"
      class="aspect-square size-full rounded-full object-cover {{ className }}"
      (load)="onLoad()"
      (error)="onError()"
      [class.hidden]="hasError"
    />
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class AvatarImageComponent implements AfterViewInit {
  @Input() src!: string;
  @Input() alt: string = 'avatar image';
  @Input() className: string = '';

  @ViewChild('imgRef') imgRef?: ElementRef<HTMLImageElement>;

  hasError = false;
  private avatar = inject(AvatarComponent, { optional: true });

  ngAfterViewInit() {
    if (this.imgRef?.nativeElement?.complete) {
      if (this.imgRef.nativeElement.naturalWidth > 0) {
        this.onLoad();
      } else if (this.imgRef.nativeElement.naturalWidth === 0 && this.src) {
        this.onError();
      }
    }
  }

  onLoad() {
    this.avatar?.onImageLoaded();
  }

  onError() {
    this.hasError = true;
    this.avatar?.onImageError();
  }
}
