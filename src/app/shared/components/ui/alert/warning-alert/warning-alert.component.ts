import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'app-warning-alert',
  imports: [AlertComponent],
  templateUrl: './warning-alert.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class WarningAlertComponent {

}
