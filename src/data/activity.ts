import { Application } from '@/types/activity';

export type ActivityStatus = {
  hasActive: boolean;
  title?: string;
  status?: string;
  isDemo: boolean;
};

export const activityStatus: ActivityStatus = {
  hasActive: true,
  title: 'Passport application',
  status: 'Under review',
  isDemo: true,
};

export const applications: Application[] = [
  {
    id: 'passport-application',
    title: 'Passport Application',
    kind: 'application',
    status: 'under-review',
    statusLabel: 'Under Review',
    applicationId: 'PA-2024-000123',
    time: '10:30 AM',
    group: 'Today',
    submittedDate: '12 Aug 2026',
    timeline: [
      { id: 'submitted', label: 'Submitted', done: true },
      { id: 'documents-checked', label: 'Documents checked', done: true },
      { id: 'under-review', label: 'Under review', done: true },
      { id: 'approved', label: 'Approved', done: false },
      { id: 'completed', label: 'Completed', done: false },
    ],
  },
  {
    id: 'business-registration',
    title: 'Business Registration',
    kind: 'application',
    status: 'documents-required',
    statusLabel: 'Documents Required',
    applicationId: 'BR-2024-000056',
    time: '9:15 AM',
    group: 'Today',
    submittedDate: '2 Aug 2026',
    timeline: [
      { id: 'submitted', label: 'Submitted', done: true },
      { id: 'documents-required', label: 'Documents required', done: true },
      { id: 'under-review', label: 'Under review', done: false },
      { id: 'approved', label: 'Approved', done: false },
      { id: 'completed', label: 'Completed', done: false },
    ],
  },
  {
    id: 'government-fee-payment',
    title: 'Government Fee Payment',
    kind: 'payment',
    status: 'completed',
    statusLabel: 'Completed',
    applicationId: 'GP-2024-000789',
    time: '8:45 AM',
    group: 'Today',
    submittedDate: '28 Jul 2026',
    timeline: [
      { id: 'submitted', label: 'Payment initiated', done: true },
      { id: 'completed', label: 'Completed', done: true },
    ],
  },
  {
    id: 'driving-licence-renewal',
    title: 'Driving Licence Renewal',
    kind: 'application',
    status: 'under-review',
    statusLabel: 'Under Review',
    applicationId: 'DL-2024-000234',
    group: 'Yesterday',
    submittedDate: '11 Aug 2026',
    timeline: [
      { id: 'submitted', label: 'Submitted', done: true },
      { id: 'under-review', label: 'Under review', done: true },
      { id: 'completed', label: 'Completed', done: false },
    ],
  },
  {
    id: 'tax-payment-etin',
    title: 'Tax Payment (e-TIN)',
    kind: 'payment',
    status: 'completed',
    statusLabel: 'Completed',
    applicationId: 'TP-2024-000345',
    group: 'Yesterday',
    submittedDate: '11 Aug 2026',
    timeline: [
      { id: 'submitted', label: 'Payment initiated', done: true },
      { id: 'completed', label: 'Completed', done: true },
    ],
  },
  {
    id: 'land-mutation-application',
    title: 'Land Mutation Application',
    kind: 'application',
    status: 'submitted',
    statusLabel: 'Received',
    applicationId: 'LM-2024-000067',
    time: '2 May 2024',
    group: 'This Week',
    submittedDate: '2 May 2024',
    timeline: [
      { id: 'submitted', label: 'Received', done: true },
      { id: 'under-review', label: 'Under review', done: false },
      { id: 'completed', label: 'Completed', done: false },
    ],
  },
];
