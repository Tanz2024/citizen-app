import { IconName } from '@/components/ui/icon';
import { CategoryTint } from '@/constants/theme';

export type QuickAction = {
  id: string;
  label: string;
  icon: IconName;
};

export type ServiceCategory =
  | 'for-you'
  | 'identity'
  | 'family'
  | 'travel'
  | 'business'
  | 'transport'
  | 'land'
  | 'tax'
  | 'education'
  | 'health';

export type RequiredDocument = {
  id: string;
  label: string;
};

export type ServiceStep = {
  id: string;
  title: string;
  description: string;
};

export type Service = {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  icon: IconName;
  tint: CategoryTint;
  categories: ServiceCategory[];
  isLifeEvent?: boolean;
  estimatedTime?: string;
  subtitle?: string;
  officialFee?: string;
  processingTime?: string;
  onlineAvailable?: boolean;
  documents?: RequiredDocument[];
  steps?: ServiceStep[];
  whereToApply?: string;
  lastVerified?: string;
  sourceType: 'official' | 'demo';
  hasWizard?: boolean;
  hasFeeTransparency?: boolean;
};
