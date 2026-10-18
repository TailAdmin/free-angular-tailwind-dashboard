import { DangerActionItem } from './types';

export const defaultDangerActions: DangerActionItem[] = [
  {
    id: 'logout-all',
    title: 'Logout all devices',
    description: 'Sign out from every active session.',
    buttonText: 'Logout',
    variant: 'outline',
  },
  {
    id: 'delete-account',
    title: 'Delete account',
    description: 'Permanently remove your account and all data.',
    buttonText: 'Delete',
    variant: 'danger-outline',
  },
];
