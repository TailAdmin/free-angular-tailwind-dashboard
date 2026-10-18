import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export type AspectRatio = '16:9' | '4:3' | '21:9' | '1:1';

@Component({
  selector: 'app-video',
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styles: ``,
})
export class VideoComponent {
  private sanitizer = inject(DomSanitizer);

  @Input() videoId: string = '';
  @Input() aspectRatio: AspectRatio = '16:9';
  @Input() title: string = 'YouTube video';
  @Input() className: string = '';

  get aspectRatioClass(): string {
    const map: Record<AspectRatio, string> = {
      '16:9': 'aspect-video',
      '4:3': 'aspect-4/3',
      '21:9': 'aspect-21/9',
      '1:1': 'aspect-square',
    };
    return map[this.aspectRatio] || 'aspect-video';
  }

  get containerClasses(): string {
    return `overflow-hidden rounded-lg ${this.aspectRatioClass} ${this.className}`.trim();
  }

  get safeEmbedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}`
    );
  }
}
