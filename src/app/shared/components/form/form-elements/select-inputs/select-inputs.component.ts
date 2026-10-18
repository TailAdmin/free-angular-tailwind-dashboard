import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { SelectInputComponent } from './select-input.component';
import { MultipleSelectInputComponent } from './multiple-select-input.component';
import { ComboboxSelectInputComponent } from './combobox-select-input.component';

@Component({
  selector: 'app-select-inputs',
  imports: [
    ComponentCardComponent,
    SelectInputComponent,
    MultipleSelectInputComponent,
    ComboboxSelectInputComponent,
  ],
  host: {
    class: 'block',
  },
  templateUrl: './select-inputs.component.html',
})
export class SelectInputsComponent {}
