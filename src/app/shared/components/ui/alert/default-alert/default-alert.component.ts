import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'app-default-alert',
  imports: [AlertComponent],
  templateUrl: './default-alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class DefaultAlertComponent {

}
