import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';
import { ButtonGroupComponent } from '../../button-group/button-group.component';

@Component({
  selector: 'app-button-group-demo',
  imports: [CommonModule, ButtonComponent, ButtonGroupComponent],
  templateUrl: './button-group-demo.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ButtonGroupDemoComponent {}
