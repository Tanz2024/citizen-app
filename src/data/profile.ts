import { IconName } from '@/components/ui/icon';

export type SettingsItem = {
  id: string;
  label: string;
  icon: IconName;
  route?: string;
};

export const accountSettings: SettingsItem[] = [
  { id: 'personal-info', label: 'Personal Information', icon: 'user' },
  { id: 'language', label: 'Language', icon: 'globe', route: '/profile/language' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'privacy', label: 'Privacy', icon: 'lock', route: '/profile/privacy' },
  { id: 'security', label: 'Security', icon: 'shield' },
];

export const appSettings: SettingsItem[] = [
  { id: 'appearance', label: 'Appearance', icon: 'appearance' },
  { id: 'accessibility', label: 'Accessibility', icon: 'accessibility' },
  { id: 'low-data-mode', label: 'Low Data Mode', icon: 'signal', route: '/profile/low-data-mode' },
  { id: 'data-sources', label: 'Data Sources', icon: 'tray' },
  { id: 'about', label: 'About Citizen', icon: 'info', route: '/profile/about' },
];
