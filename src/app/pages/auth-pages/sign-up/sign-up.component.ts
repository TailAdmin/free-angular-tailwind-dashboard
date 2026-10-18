import { Component } from '@angular/core';
import SignUpContentComponent from '../../../shared/components/full-width-pages/auth/sign-up';
import { AuthPageLayoutComponent } from '../../../shared/layout/auth-page-layout/auth-page-layout.component';


@Component({
  selector: 'app-sign-up',
  imports: [
    AuthPageLayoutComponent,
    SignUpContentComponent,
  ],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

}
