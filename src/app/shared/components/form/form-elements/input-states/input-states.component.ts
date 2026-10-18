import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { ErrorInputComponent } from './error-input.component';
import { SuccessInputComponent } from './success-input.component';
import { DisabledInputComponent } from './disabled-input.component';

@Component({
  selector: 'app-input-states',
  imports: [
    ComponentCardComponent,
    ErrorInputComponent,
    SuccessInputComponent,
    DisabledInputComponent,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './input-states.component.html',
})
export class InputStatesComponent {}
