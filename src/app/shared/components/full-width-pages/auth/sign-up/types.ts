import type { SignUpFormData } from './schema';

export interface SocialAuthProvider {
  id: string;
  name: string;
}

export type { SignUpFormData };

export interface SignUpFormFieldsProps {
  className?: string;
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
}
