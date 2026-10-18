export interface SignInFormData {
  email: string;
  password: string;
  keepLoggedIn?: boolean;
}

export const signInValidationRules = {
  email: {
    required: 'Email is required',
    pattern: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
  },
};
