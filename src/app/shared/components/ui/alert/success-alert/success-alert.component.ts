import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'app-success-alert',
  imports: [AlertComponent],
  templateUrl: './success-alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class SuccessAlertComponent {

}
