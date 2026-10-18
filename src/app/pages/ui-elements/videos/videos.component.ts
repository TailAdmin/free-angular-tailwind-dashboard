import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { VideoAspectRatioPreviewsComponent } from '../../../shared/components/ui/videos/aspect-ratio/aspect-ratio.component';

@Component({
  selector: 'app-videos',
  imports: [PageBreadcrumbComponent, VideoAspectRatioPreviewsComponent],
  templateUrl: './videos.component.html',
  styles: ``,
})
export class VideosComponent {}
