import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { ToggleSwitchInputComponent } from './toggle-switch-input.component';

@Component({
  selector: 'app-toggle-switch',
  imports: [ComponentCardComponent, ToggleSwitchInputComponent],
  host: {
    class: 'block',
  },
  templateUrl: './toggle-switch.component.html',
})
export class ToggleSwitchComponent {}
