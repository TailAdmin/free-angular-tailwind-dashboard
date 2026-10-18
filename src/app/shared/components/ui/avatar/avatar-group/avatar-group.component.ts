import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';
import { AvatarImageComponent } from '../avatar-image.component';
import { AvatarFallbackComponent } from '../avatar-fallback.component';
import { AvatarGroupComponent } from '../avatar-group.component';
import { AvatarGroupCountComponent } from '../avatar-group-count.component';

@Component({
  selector: 'app-avatar-group-preview',
  imports: [
    AvatarComponent,
    AvatarImageComponent,
    AvatarFallbackComponent,
    AvatarGroupComponent,
    AvatarGroupCountComponent,
  ],
  templateUrl: './avatar-group.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class AvatarGroupPreviewComponent {

}
