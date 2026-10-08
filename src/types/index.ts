export type UserRole = 'parent' | 'tutor' | 'admin';

export type TuitionMode = 'Home Tuition' | 'Online Tuition' | 'Both';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Requirement Collected'
  | 'Tutor Searching'
  | 'Tutor Assigned'
  | 'Demo Scheduled'
  | 'Demo Completed'
  | 'Confirmed'
  | 'Closed';

export type TutorStatus =
  | 'New'
  | 'Under Verification'
  | 'Verified'
  | 'Active'
  | 'Inactive'
  | 'Rejected';

export type DemoStatus =
  | 'Pending'
  | 'Demo Scheduled'
  | 'Demo Completed'
  | 'Confirmed'
  | 'Cancelled';

export interface Tutor {
  id: string;
  name: string;
  mobile: string; // Kept private from parents in UI
  whatsappNumber: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  qualification: string;
  experienceYears: number;
  subjects: string[];
  classes: string[];
  boards: string[];
  teachingAreas: string[];
  tuitionModes: ('Home Tuition' | 'Online Tuition')[];
  availableDays: string[];
  availableTimeSlots: string[];
  expectedMonthlyFee: number;
  bio: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  status: TutorStatus;
  achievements?: string[];
  registeredAt: string;
}

export interface TuitionRequest {
  id: string;
  studentName: string;
  parentName: string;
  mobile: string;
  studentClass: string;
  board: string;
  subjects: string[];
  area: string;
  tuitionMode: 'Home Tuition' | 'Online Tuition';
  preferredDays: string;
  preferredTime: string;
  additionalNotes?: string;
  budget?: string;
  status: LeadStatus;
  assignedTutorId?: string;
  assignedTutorName?: string;
  createdAt: string;
}

export interface DemoRequest {
  id: string;
  parentName: string;
  studentName: string;
  mobile: string;
  studentClass: string;
  board: string;
  subject: string;
  area: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  status: DemoStatus;
  assignedTutorId?: string;
  tutorName?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  tutorId?: string;
  tutorName?: string;
  parentName: string;
  studentClass: string;
  subject: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  area: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type:
    | 'tutor_request'
    | 'demo_confirmation'
    | 'tutor_assigned'
    | 'demo_reminder'
    | 'tuition_confirmation'
    | 'admin_message';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole | 'all';
}

export interface MatchScoreResult {
  tutor: Tutor;
  score: number;
  reasons: string[];
}
