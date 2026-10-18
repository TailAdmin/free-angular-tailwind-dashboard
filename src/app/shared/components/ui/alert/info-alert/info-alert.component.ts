import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'app-info-alert',
  imports: [AlertComponent],
  templateUrl: './info-alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class InfoAlertComponent {

}
