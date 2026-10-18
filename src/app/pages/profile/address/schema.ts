import { AddressData } from './types';

export type AddressFormData = AddressData;

export function validateAddress(data: AddressFormData): Partial<Record<keyof AddressFormData, string>> {
  const errors: Partial<Record<keyof AddressFormData, string>> = {};

  if (!data.country || !data.country.trim()) {
    errors.country = 'Country is required';
  }
  if (!data.cityState || !data.cityState.trim()) {
    errors.cityState = 'City/State is required';
  }
  if (!data.postalCode || !data.postalCode.trim()) {
    errors.postalCode = 'Postal Code is required';
  }
  if (!data.taxId || !data.taxId.trim()) {
    errors.taxId = 'TAX ID is required';
  }

  return errors;
}
