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

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface DayAvailability {
  day: DayOfWeek;
  isAvailable: boolean;
  slots: string[]; // e.g. ['4:00 PM - 5:30 PM', '6:00 PM - 7:30 PM']
  demoSlotAvailable?: boolean; // whether demo classes can be booked on this day
  preferredDemoTime?: string; // e.g. '5:00 PM - 6:00 PM'
  note?: string; // e.g. 'Home visits in Rajendra Nagar & Rath Road'
}

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
  weeklySchedule?: DayAvailability[];
  proficiencyProfile?: TutorProficiencyProfile;
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

export interface ProficiencyMetric {
  subjectOrLevel: string;
  proficiency: number; // 0 - 100
  benchmark?: number; // e.g., 70
  ratingLabel?: string; // 'Mastery' | 'Advanced' | 'Proficient'
  highlight?: string;
}

export interface TutorProficiencyProfile {
  subjects: ProficiencyMetric[];
  classLevels: ProficiencyMetric[];
  primaryFocus?: string;
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

export interface NewsletterSubscription {
  id: string;
  email: string;
  parentName?: string;
  phoneOrWhatsapp?: string;
  locality?: string;
  studentClass?: string;
  topics: string[];
  subscribedAt: string;
}
