import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'app-error-alert',
  imports: [AlertComponent],
  templateUrl: './error-alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class ErrorAlertComponent {

}
