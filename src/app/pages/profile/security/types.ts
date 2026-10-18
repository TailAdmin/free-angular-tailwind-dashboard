export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

export type ChangePasswordErrors = Partial<Record<keyof ChangePasswordFormData, string>>;
