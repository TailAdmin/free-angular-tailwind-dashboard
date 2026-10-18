export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  facebook: string;
  x: string;
  linkedin: string;
  instagram: string;
  avatarUrl: string;
}

export type PersonalInfoErrors = Partial<Record<keyof PersonalInfoFormData, string>>;
