import { Component } from '@angular/core';
import { BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { RadioComponent } from '../../../ui/radio/radio.component';

@Component({
  selector: 'app-labeled-radio-buttons',
  imports: [BrnRadioGroup, RadioComponent],
  host: {
    class: 'block',
  },
  template: `
    <div
      brnRadioGroup
      name="labeled-radio"
      aria-label="Radio options"
      class="flex flex-wrap items-center gap-6 sm:gap-8"
      [value]="selectedValue"
      (valueChange)="selectedValue = $event"
    >
      <!-- Default -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <app-radio value="default" radioId="radio-default"></app-radio>
        <label
          data-slot="field-label"
          for="radio-default"
          class="cursor-pointer text-sm font-medium text-gray-700 select-none dark:text-gray-300"
        >
          Default
        </label>
      </div>

      <!-- Selected -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <app-radio value="selected" radioId="radio-selected"></app-radio>
        <label
          data-slot="field-label"
          for="radio-selected"
          class="cursor-pointer text-sm font-medium text-gray-700 select-none dark:text-gray-300"
        >
          Selected
        </label>
      </div>

      <!-- Disabled -->
      <div
        role="group"
        data-slot="field"
        data-orientation="horizontal"
        class="group/field flex w-auto items-center gap-2.5"
      >
        <app-radio value="disabled" radioId="radio-disabled" [disabled]="true"></app-radio>
        <label
          data-slot="field-label"
          for="radio-disabled"
          class="cursor-not-allowed text-sm font-medium text-gray-400 dark:text-gray-600"
        >
          Disabled
        </label>
      </div>
    </div>
  `,
})
export class LabeledRadioButtonsComponent {
  selectedValue: string = 'selected';
}
