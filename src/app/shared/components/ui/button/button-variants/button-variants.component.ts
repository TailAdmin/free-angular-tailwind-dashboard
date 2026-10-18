import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-variants',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './button-variants.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ButtonVariantsComponent {}
