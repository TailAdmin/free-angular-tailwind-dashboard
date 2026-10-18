import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { BasicInputComponent } from './basic-input.component';
import { InputWithPlaceholderComponent } from './input-with-placeholder.component';
import { SelectInputComponent } from './select-input.component';
import { PasswordInputComponent } from './password-input.component';
import { DatePickerInputComponent } from './date-picker-input.component';
import { TimeSelectInputComponent } from './time-select-input.component';
import { PaymentInputComponent } from './payment-input.component';

@Component({
  selector: 'app-default-inputs',
  imports: [
    ComponentCardComponent,
    BasicInputComponent,
    InputWithPlaceholderComponent,
    SelectInputComponent,
    PasswordInputComponent,
    DatePickerInputComponent,
    TimeSelectInputComponent,
    PaymentInputComponent,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './default-inputs.component.html',
})
export class DefaultInputsComponent {}
