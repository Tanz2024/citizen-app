export type FeeBreakdownItem = {
  id: string;
  label: string;
  officialAmount: number;
  communityAmount: number;
};

export type FeeTransparency = {
  serviceId: string;
  title: string;
  officialTotal: number;
  communityTotal: number;
  reportCount: number;
  breakdown: FeeBreakdownItem[];
  tips: string[];
};

export const feeTransparencyData: Record<string, FeeTransparency> = {
  'start-business': {
    serviceId: 'start-business',
    title: 'Start a Business',
    officialTotal: 3500,
    communityTotal: 8200,
    reportCount: 326,
    breakdown: [
      { id: 'government-fee', label: 'Government Fee', officialAmount: 2000, communityAmount: 3500 },
      { id: 'service-charge', label: 'Service Charge', officialAmount: 1000, communityAmount: 3000 },
      { id: 'vat', label: 'VAT (15%)', officialAmount: 500, communityAmount: 500 },
      { id: 'other-costs', label: 'Other Costs', officialAmount: 0, communityAmount: 1200 },
    ],
    tips: [
      'Pay government fees only at the official counter or verified online portal.',
      'Ask for an official receipt for every payment you make.',
      'Report any request for an unofficial "service charge" through the app.',
    ],
  },
};
