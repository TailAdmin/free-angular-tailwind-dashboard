import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';
import { AvatarImageComponent } from '../avatar-image.component';
import { AvatarFallbackComponent } from '../avatar-fallback.component';
import { AvatarBadgeComponent } from '../avatar-badge.component';

@Component({
  selector: 'app-online-indicator',
  imports: [
    AvatarComponent,
    AvatarImageComponent,
    AvatarFallbackComponent,
    AvatarBadgeComponent,
  ],
  templateUrl: './online-indicator.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class OnlineIndicatorComponent {

}
