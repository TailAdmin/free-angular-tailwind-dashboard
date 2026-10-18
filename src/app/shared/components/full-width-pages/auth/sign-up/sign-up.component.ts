import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthDividerComponent } from '../../shared/auth-divider/auth-divider.component';
import { SignUpFormFieldsComponent } from './form.component';
import { SignUpHeaderComponent } from './header.component';
import { SocialButtonsComponent } from './social-button.component';

@Component({
  selector: 'app-sign-up-content',
  imports: [
    CommonModule,
    RouterModule,
    AuthDividerComponent,
    SignUpHeaderComponent,
    SocialButtonsComponent,
    SignUpFormFieldsComponent,
  ],
  templateUrl: './sign-up.component.html',
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
export class SignUpContentComponent {
  @Input() className: string = '';
}
