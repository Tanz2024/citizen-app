export type WizardDefinition = {
  serviceId: string;
  title: string;
  subtitle: string;
  processingTime: string;
  eligibility: string[];
  documents: { id: string; label: string }[];
  fee: string;
};

export const wizards: Record<string, WizardDefinition> = {
  'start-business': {
    serviceId: 'start-business',
    title: 'Start a Business',
    subtitle: 'Register your company or proprietorship.',
    processingTime: '7-15 working days (sample)',
    eligibility: [
      'You are 18 years or older',
      'You have a valid National ID',
      'You have a registered business address',
    ],
    documents: [
      { id: 'nid', label: 'National ID card' },
      { id: 'address-proof', label: 'Proof of business address' },
      { id: 'trade-name', label: 'Proposed trade name' },
    ],
    fee: '৳3,500 (sample)',
  },
  passport: {
    serviceId: 'passport',
    title: 'Apply for Passport',
    subtitle: 'Renew your passport before it expires.',
    processingTime: '7-10 Days',
    eligibility: [
      'You are a Bangladeshi citizen',
      'You have a valid National ID',
      'Your current passport is not reported lost or damaged',
    ],
    documents: [
      { id: 'nid', label: 'National ID card' },
      { id: 'photo', label: 'Passport-size photograph' },
      { id: 'address', label: 'Proof of address' },
    ],
    fee: '৳1,500 (sample)',
  },
};
