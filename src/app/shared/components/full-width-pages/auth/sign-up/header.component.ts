import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-up-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
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
export class SignUpHeaderComponent {
  @Input() title: string = 'Sign Up';
  @Input() description: string = 'Enter your email and password to sign up!';
  @Input() className: string = '';
}
