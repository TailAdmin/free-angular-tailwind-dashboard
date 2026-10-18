import { Component } from '@angular/core';
import { BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { RadioComponent } from '../../../ui/radio/radio.component';

@Component({
  selector: 'app-default-radio-buttons',
  imports: [BrnRadioGroup, RadioComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      brnRadioGroup
      name="default-radio"
      aria-label="Options"
      class="flex flex-row items-center gap-6"
      [value]="selectedValue"
      (valueChange)="selectedValue = $event"
    >
      <!-- Option 1 (Selected) -->
      <app-radio value="option1" ariaLabel="Option 1"></app-radio>

      <!-- Option 2 -->
      <app-radio value="option2" ariaLabel="Option 2"></app-radio>

      <!-- Option 3 (Disabled) -->
      <app-radio value="option3" ariaLabel="Option 3 (disabled)" [disabled]="true"></app-radio>
    </div>
  `,
})
export class DefaultRadioButtonsComponent {
  selectedValue: string = 'option1';
}
