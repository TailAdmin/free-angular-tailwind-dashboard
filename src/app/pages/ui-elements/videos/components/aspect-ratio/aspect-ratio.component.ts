import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { VideoComponent } from '../../video/video.component';

@Component({
  selector: 'app-video-aspect-ratio-previews',
  imports: [ComponentCardComponent, VideoComponent],
  templateUrl: './aspect-ratio.component.html',
  styles: ``,
})
export class VideoAspectRatioPreviewsComponent {}
