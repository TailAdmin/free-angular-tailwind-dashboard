import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';
import { AvatarImageComponent } from '../avatar-image.component';
import { AvatarFallbackComponent } from '../avatar-fallback.component';

@Component({
  selector: 'app-default-avatar',
  imports: [
    AvatarComponent,
    AvatarImageComponent,
    AvatarFallbackComponent,
  ],
  templateUrl: './default-avatar.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class DefaultAvatarComponent {

}
