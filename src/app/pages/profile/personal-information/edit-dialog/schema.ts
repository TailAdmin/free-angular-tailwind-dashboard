import { PersonalInfoErrors, PersonalInfoFormData } from './types';

export function validatePersonalInfo(data: PersonalInfoFormData): PersonalInfoErrors {
  const errors: PersonalInfoErrors = {};

  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required';
  }

  return errors;
}

export type { PersonalInfoFormData };
