import { IconName } from '@/components/ui/icon';

export type CredentialStatus = 'demo-verified' | 'pending' | 'expired';

export type Credential = {
  id: string;
  type: string;
  holderName: string;
  maskedIdentifier: string;
  issueDate?: string;
  expiryDate?: string;
  status: CredentialStatus;
  icon: IconName;
  isPrimary?: boolean;
};
