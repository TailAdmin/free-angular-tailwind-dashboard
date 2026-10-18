import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-sizes',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './button-sizes.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ButtonSizesComponent {}
