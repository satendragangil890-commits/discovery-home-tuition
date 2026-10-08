import { Tutor, TuitionRequest, DemoRequest, Review, AppNotification, UserRole } from '../types';
import {
  INITIAL_TUTORS,
  INITIAL_TUITION_REQUESTS,
  INITIAL_DEMO_REQUESTS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockSeed';

const STORAGE_KEYS = {
  TUTORS: 'dht_tutors_v1',
  TUITION_REQUESTS: 'dht_tuition_requests_v1',
  DEMO_REQUESTS: 'dht_demo_requests_v1',
  REVIEWS: 'dht_reviews_v1',
  NOTIFICATIONS: 'dht_notifications_v1',
  CURRENT_ROLE: 'dht_current_role_v1',
  CURRENT_USER_PHONE: 'dht_current_user_phone_v1',
  LANGUAGE: 'dht_app_language_v1',
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const StorageService = {
  // --- Tutors ---
  getTutors(): Tutor[] {
    const tutors = getLocal<Tutor[]>(STORAGE_KEYS.TUTORS, []);
    if (!tutors || tutors.length === 0) {
      setLocal(STORAGE_KEYS.TUTORS, INITIAL_TUTORS);
      return INITIAL_TUTORS;
    }
    return tutors;
  },

  getTutorById(id: string): Tutor | undefined {
    return this.getTutors().find((t) => t.id === id);
  },

  saveTutor(tutorData: Omit<Tutor, 'id' | 'registeredAt' | 'rating' | 'reviewCount'>): Tutor {
    const tutors = this.getTutors();
    const newTutor: Tutor = {
      ...tutorData,
      id: `tut-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    tutors.unshift(newTutor);
    setLocal(STORAGE_KEYS.TUTORS, tutors);

    // Notify admin
    this.addNotification({
      title: 'New Tutor Registration',
      message: `${newTutor.name} (${newTutor.qualification}) registered for ${newTutor.subjects.join(', ')} in Orai.`,
      type: 'admin_message',
      targetRole: 'admin',
    });

    return newTutor;
  },

  updateTutorStatus(id: string, status: Tutor['status'], isVerified?: boolean): Tutor | null {
    const tutors = this.getTutors();
    const idx = tutors.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    tutors[idx] = {
      ...tutors[idx],
      status,
      isVerified: isVerified !== undefined ? isVerified : tutors[idx].isVerified,
    };
    setLocal(STORAGE_KEYS.TUTORS, tutors);
    return tutors[idx];
  },

  // --- Tuition Requests (Parent Requirements) ---
  getTuitionRequests(): TuitionRequest[] {
    const list = getLocal<TuitionRequest[]>(STORAGE_KEYS.TUITION_REQUESTS, []);
    if (!list || list.length === 0) {
      setLocal(STORAGE_KEYS.TUITION_REQUESTS, INITIAL_TUITION_REQUESTS);
      return INITIAL_TUITION_REQUESTS;
    }
    return list;
  },

  createTuitionRequest(
    data: Omit<TuitionRequest, 'id' | 'createdAt' | 'status'>
  ): TuitionRequest {
    const requests = this.getTuitionRequests();
    const newRequest: TuitionRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
    };
    requests.unshift(newRequest);
    setLocal(STORAGE_KEYS.TUITION_REQUESTS, requests);

    // Add notification
    this.addNotification({
      title: 'Tuition Requirement Received',
      message: `New requirement for ${newRequest.studentClass} (${newRequest.subjects.join(', ')}) at ${newRequest.area}, Orai.`,
      type: 'tutor_request',
      targetRole: 'admin',
    });

    return newRequest;
  },

  updateTuitionRequestStatus(
    id: string,
    status: TuitionRequest['status'],
    assignedTutorId?: string,
    assignedTutorName?: string
  ): void {
    const requests = this.getTuitionRequests();
    const idx = requests.findIndex((r) => r.id === id);
    if (idx !== -1) {
      requests[idx] = {
        ...requests[idx],
        status,
        assignedTutorId: assignedTutorId ?? requests[idx].assignedTutorId,
        assignedTutorName: assignedTutorName ?? requests[idx].assignedTutorName,
      };
      setLocal(STORAGE_KEYS.TUITION_REQUESTS, requests);
    }
  },

  // --- Demo Requests ---
  getDemoRequests(): DemoRequest[] {
    const list = getLocal<DemoRequest[]>(STORAGE_KEYS.DEMO_REQUESTS, []);
    if (!list || list.length === 0) {
      setLocal(STORAGE_KEYS.DEMO_REQUESTS, INITIAL_DEMO_REQUESTS);
      return INITIAL_DEMO_REQUESTS;
    }
    return list;
  },

  createDemoRequest(data: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>): DemoRequest {
    const list = this.getDemoRequests();
    const newDemo: DemoRequest = {
      ...data,
      id: `demo-${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newDemo);
    setLocal(STORAGE_KEYS.DEMO_REQUESTS, list);

    this.addNotification({
      title: 'Free Demo Class Requested',
      message: `${newDemo.parentName} requested a Free Demo for ${newDemo.studentClass} (${newDemo.subject}) on ${newDemo.preferredDate}.`,
      type: 'demo_confirmation',
      targetRole: 'admin',
    });

    return newDemo;
  },

  updateDemoStatus(
    id: string,
    status: DemoRequest['status'],
    assignedTutorId?: string,
    tutorName?: string
  ): void {
    const demos = this.getDemoRequests();
    const idx = demos.findIndex((d) => d.id === id);
    if (idx !== -1) {
      demos[idx] = {
        ...demos[idx],
        status,
        assignedTutorId: assignedTutorId ?? demos[idx].assignedTutorId,
        tutorName: tutorName ?? demos[idx].tutorName,
      };
      setLocal(STORAGE_KEYS.DEMO_REQUESTS, demos);
    }
  },

  // --- Reviews ---
  getReviews(): Review[] {
    const list = getLocal<Review[]>(STORAGE_KEYS.REVIEWS, []);
    if (!list || list.length === 0) {
      setLocal(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
      return INITIAL_REVIEWS;
    }
    return list;
  },

  addReview(reviewData: Omit<Review, 'id' | 'date' | 'isVerified'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      isVerified: true,
    };
    reviews.unshift(newRev);
    setLocal(STORAGE_KEYS.REVIEWS, reviews);
    return newRev;
  },

  // --- Notifications ---
  getNotifications(): AppNotification[] {
    const list = getLocal<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    if (!list || list.length === 0) {
      setLocal(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    return list;
  },

  addNotification(notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): AppNotification {
    const list = this.getNotifications();
    const newItem: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    list.unshift(newItem);
    setLocal(STORAGE_KEYS.NOTIFICATIONS, list);
    return newItem;
  },

  markAllNotificationsRead(): void {
    const list = this.getNotifications().map((n) => ({ ...n, read: true }));
    setLocal(STORAGE_KEYS.NOTIFICATIONS, list);
  },

  // --- Role & Session Management ---
  getCurrentRole(): UserRole {
    return getLocal<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'parent');
  },

  setCurrentRole(role: UserRole): void {
    setLocal(STORAGE_KEYS.CURRENT_ROLE, role);
  },

  getUserPhone(): string {
    return getLocal<string>(STORAGE_KEYS.CURRENT_USER_PHONE, '9838012345');
  },

  setUserPhone(phone: string): void {
    setLocal(STORAGE_KEYS.CURRENT_USER_PHONE, phone);
  },

  getLanguage(): 'en' | 'hi' {
    return getLocal<'en' | 'hi'>(STORAGE_KEYS.LANGUAGE, 'en');
  },

  setLanguage(lang: 'en' | 'hi'): void {
    setLocal(STORAGE_KEYS.LANGUAGE, lang);
  },

  // Reset to initial demo state
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.TUTORS);
    localStorage.removeItem(STORAGE_KEYS.TUITION_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.DEMO_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  },
};
