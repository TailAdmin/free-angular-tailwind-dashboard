import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-with-icon',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './button-with-icon.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ButtonWithIconComponent {}
