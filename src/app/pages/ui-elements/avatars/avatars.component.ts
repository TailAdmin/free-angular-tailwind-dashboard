import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { DefaultAvatarComponent } from '../../../shared/components/ui/avatar/default-avatar/default-avatar.component';
import { AvatarGroupPreviewComponent } from '../../../shared/components/ui/avatar/avatar-group/avatar-group.component';
import { OnlineIndicatorComponent } from '../../../shared/components/ui/avatar/online-indicator/online-indicator.component';
import { OfflineIndicatorComponent } from '../../../shared/components/ui/avatar/offline-indicator/offline-indicator.component';
import { BusyIndicatorComponent } from '../../../shared/components/ui/avatar/busy-indicator/busy-indicator.component';

@Component({
  selector: 'app-avatar-element',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    DefaultAvatarComponent,
    AvatarGroupPreviewComponent,
    OnlineIndicatorComponent,
    OfflineIndicatorComponent,
    BusyIndicatorComponent,
  ],
  templateUrl: './avatar-element.component.html',
  styles: ``
})
export class AvatarElementComponent {

}
