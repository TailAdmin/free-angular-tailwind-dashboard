import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../../../shared/components/common/component-card/component-card.component';
import { VideoComponent } from '../../../../../shared/components/ui/video/video.component';

@Component({
  selector: 'app-video-aspect-ratio-previews',
  imports: [ComponentCardComponent, VideoComponent],
  templateUrl: './aspect-ratio.component.html',
  styles: ``,
})
export class VideoAspectRatioPreviewsComponent {}
