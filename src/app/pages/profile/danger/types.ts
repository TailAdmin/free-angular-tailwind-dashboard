export type DangerActionVariant = 'outline' | 'danger-outline';

export interface DangerActionItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  variant?: DangerActionVariant;
  onClick?: () => void;
}
