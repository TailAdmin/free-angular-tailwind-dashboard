export interface SignUpFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const signUpValidationRules = {
  fname: {
    required: 'First name is required',
  },
  lname: {
    required: 'Last name is required',
  },
  email: {
    required: 'Email is required',
    pattern: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters',
  },
  confirmPassword: {
    required: 'Please confirm your password',
    match: 'Passwords do not match',
  },
  terms: {
    required: 'You must agree to the Terms and Conditions',
  },
};
