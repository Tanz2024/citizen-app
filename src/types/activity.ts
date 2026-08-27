export type ApplicationStatus =
  | 'draft'
  | 'documents-required'
  | 'submitted'
  | 'documents-checked'
  | 'under-review'
  | 'approved'
  | 'completed';

export type ApplicationStep = {
  id: string;
  label: string;
  done: boolean;
};

export type ActivityKind = 'application' | 'payment' | 'update';

export type ActivityGroup = 'Today' | 'Yesterday' | 'This Week';

export type Application = {
  id: string;
  title: string;
  kind: ActivityKind;
  status: ApplicationStatus;
  statusLabel: string;
  applicationId?: string;
  time?: string;
  group: ActivityGroup;
  submittedDate?: string;
  timeline?: ApplicationStep[];
};
