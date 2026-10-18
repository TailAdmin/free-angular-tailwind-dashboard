import { ChangePasswordErrors, ChangePasswordFormData } from './types';

export function validateChangePassword(data: ChangePasswordFormData): ChangePasswordErrors {
  const errors: ChangePasswordErrors = {};

  if (!data.currentPassword || !data.currentPassword.trim()) {
    errors.currentPassword = 'Current password is required';
  }

  if (!data.newPassword || !data.newPassword.trim()) {
    errors.newPassword = 'Password must be at least 8 characters';
  } else if (data.newPassword.trim().length < 8) {
    errors.newPassword = 'Password must be at least 8 characters';
  } else if (data.currentPassword && data.currentPassword === data.newPassword) {
    errors.newPassword = 'New password must be different from current password';
  }

  if (!data.confirmPassword || !data.confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your new password';
  } else if (data.newPassword && data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export type { ChangePasswordFormData };
