import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpFormData } from './schema';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputDirective } from '../../../ui/input/input.directive';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-sign-up-form-fields',
  imports: [InputDirective, ButtonComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
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
export class SignUpFormFieldsComponent {
  @Input() className: string = '';
  @Output() formSubmit = new EventEmitter<SignUpFormData>();

  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  signUpForm = new FormGroup(
    {
      fname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lname: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      terms: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.requiredTrue],
      }),
    },
    { validators: passwordMatchValidator },
  );

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    if (fieldName === 'confirmPassword') {
      const control = this.signUpForm.get('confirmPassword');
      const hasMismatch = this.signUpForm.hasError('passwordMismatch');
      return !!(
        (control && control.invalid && (control.dirty || control.touched)) ||
        (control && (control.dirty || control.touched) && hasMismatch)
      );
    }
    const control = this.signUpForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(fieldName: string): string {
    const control = this.signUpForm.get(fieldName);

    if (fieldName === 'fname' && control?.errors?.['required']) {
      return 'First name is required';
    }

    if (fieldName === 'lname' && control?.errors?.['required']) {
      return 'Last name is required';
    }

    if (fieldName === 'email') {
      if (control?.errors?.['required']) return 'Email is required';
      if (control?.errors?.['email']) return 'Please enter a valid email address';
    }

    if (fieldName === 'password') {
      if (control?.errors?.['required']) return 'Password is required';
      if (control?.errors?.['minlength'])
        return 'Password must be at least 8 characters';
    }

    if (fieldName === 'confirmPassword') {
      if (control?.errors?.['required'])
        return 'Please confirm your password';
      if (this.signUpForm.hasError('passwordMismatch'))
        return 'Passwords do not match';
    }

    if (fieldName === 'terms' && control?.errors?.['required']) {
      return 'You must agree to the Terms and Conditions';
    }

    return '';
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const data: SignUpFormData = this.signUpForm.getRawValue();
    this.formSubmit.emit(data);

    // Simulate completion
    setTimeout(() => {
      this.isSubmitting = false;
    }, 500);
  }
}
