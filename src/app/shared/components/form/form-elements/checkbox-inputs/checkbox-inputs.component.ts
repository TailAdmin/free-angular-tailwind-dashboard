import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { DefaultCheckboxComponent } from './default-checkbox.component';
import { LabeledCheckboxComponent } from './labeled-checkbox.component';

@Component({
  selector: 'app-checkbox-inputs',
  imports: [
    ComponentCardComponent,
    DefaultCheckboxComponent,
    LabeledCheckboxComponent,
  ],
  host: {
    class: 'block',
  },
  template: `
    <app-component-card title="Checkboxes">
      <div class="space-y-6">
        <app-default-checkbox />
        <app-labeled-checkbox />
      </div>
    </app-component-card>
  `,
})
export class CheckboxInputsComponent {}
