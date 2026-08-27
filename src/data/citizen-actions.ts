import { QuickAction } from '@/types/service';

export const citizenActions: QuickAction[] = [
  { id: 'scan-qr', label: 'Scan QR', icon: 'scan' },
  { id: 'documents', label: 'Documents', icon: 'document' },
  { id: 'track', label: 'Track', icon: 'history' },
  { id: 'pay-fee', label: 'Pay Fee', icon: 'creditCard' },
];
