import type { SignInFormData } from './schema';

export interface SocialAuthProvider {
  id: string;
  name: string;
}

export type { SignInFormData };

export interface SignInFormFieldsProps {
  className?: string;
  onSubmit?: (data: SignInFormData) => void | Promise<void>;
}
