import { Component } from '@angular/core';
import { SwitchComponent } from '../../../ui/switch/switch.component';

@Component({
  selector: 'app-toggle-switch-input',
  imports: [SwitchComponent],
  host: {
    class: 'block',
  },
  template: `
    <div class="flex items-center gap-7">
      <app-switch [checked]="activeSwitch" (checkedChange)="activeSwitch = $event" size="sm" ariaLabel="Active switch"></app-switch>

      <app-switch [checked]="inactiveSwitch" (checkedChange)="inactiveSwitch = $event" size="sm" ariaLabel="Inactive switch"></app-switch>
    </div>
  `,
})
export class ToggleSwitchInputComponent {
  activeSwitch = true;
  inactiveSwitch = false;
}
