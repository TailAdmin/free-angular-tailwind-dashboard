import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-divider',
  imports: [CommonModule],
  templateUrl: './auth-divider.component.html',
  host: {
    class: 'contents',
  },
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class AuthDividerComponent {
  @Input() label: string = 'Or';
  @Input() className: string = '';
}
