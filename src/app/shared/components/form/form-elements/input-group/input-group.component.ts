import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { EmailInputComponent } from './email-input.component';
import { PhoneInputStartComponent } from './phone-input-start.component';
import { PhoneInputEndComponent } from './phone-input-end.component';
import { UrlInputComponent } from './url-input.component';
import { CopyInputComponent } from './copy-input.component';

@Component({
  selector: 'app-input-group',
  imports: [
    ComponentCardComponent,
    EmailInputComponent,
    PhoneInputStartComponent,
    PhoneInputEndComponent,
    UrlInputComponent,
    CopyInputComponent,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './input-group.component.html',
})
export class InputGroupComponent {}
