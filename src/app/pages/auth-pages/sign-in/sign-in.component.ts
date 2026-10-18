import { Component } from '@angular/core';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';
import { SignInContentComponent } from '../../../shared/components/full-width-pages/auth/sign-in';

@Component({
  selector: 'app-sign-in',
  imports: [
    AuthPageLayoutComponent,
    SignInContentComponent,
  ],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {

}
