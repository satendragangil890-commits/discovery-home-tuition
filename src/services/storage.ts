import { Tutor, TuitionRequest, DemoRequest, Review, AppNotification, UserRole, NewsletterSubscription } from '../types';
import {
  INITIAL_TUTORS,
  INITIAL_TUITION_REQUESTS,
  INITIAL_DEMO_REQUESTS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_NEWSLETTER_SUBSCRIBERS,
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
  NEWSLETTER_SUBSCRIPTIONS: 'dht_newsletter_subscriptions_v1',
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
    // Check if initial mock tutors need schedule backfill, updated teaching areas, or proficiency profiles
    const needsBackfill = tutors.some((t) => !t.weeklySchedule);
    const needsProficiencySync = tutors.some((t) => !t.proficiencyProfile);
    const needsAreaSync = tutors.some((t) => {
      const initialMatch = INITIAL_TUTORS.find((it) => it.id === t.id);
      return initialMatch && initialMatch.teachingAreas.length !== t.teachingAreas.length;
    });

    if (needsBackfill || needsAreaSync || needsProficiencySync) {
      const updated = tutors.map((t) => {
        const initialMatch = INITIAL_TUTORS.find((it) => it.id === t.id);
        const teachingAreas = initialMatch ? initialMatch.teachingAreas : t.teachingAreas;
        const proficiencyProfile = t.proficiencyProfile || initialMatch?.proficiencyProfile;

        if (t.weeklySchedule && t.weeklySchedule.length > 0) {
          return { ...t, teachingAreas, proficiencyProfile };
        }
        if (initialMatch?.weeklySchedule) {
          return { ...t, teachingAreas, weeklySchedule: initialMatch.weeklySchedule, proficiencyProfile };
        }
        // Generate sensible weekly availability fallback for custom registered tutors
        return {
          ...t,
          teachingAreas,
          proficiencyProfile,
          weeklySchedule: [
            { day: 'Monday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: t.availableTimeSlots[0] || '5:00 PM - 6:00 PM' },
            { day: 'Tuesday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: t.availableTimeSlots[0] || '5:00 PM - 6:00 PM' },
            { day: 'Wednesday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: t.availableTimeSlots[0] || '5:00 PM - 6:00 PM' },
            { day: 'Thursday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: false },
            { day: 'Friday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: t.availableTimeSlots[0] || '5:00 PM - 6:00 PM' },
            { day: 'Saturday' as const, isAvailable: true, slots: t.availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: '4:00 PM - 5:00 PM' },
            { day: 'Sunday' as const, isAvailable: false, slots: [], demoSlotAvailable: false, note: 'Weekend off' },
          ],
        };
      });
      setLocal(STORAGE_KEYS.TUTORS, updated);
      return updated;
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
    const role = getLocal<UserRole>(STORAGE_KEYS.CURRENT_ROLE, 'parent');
    if (role === 'admin') {
      const isAuth =
        typeof sessionStorage !== 'undefined' &&
        sessionStorage.getItem('dht_admin_auth') === 'true';
      if (!isAuth) return 'parent';
    }
    return role;
  },

  setCurrentRole(role: UserRole): void {
    if (role === 'admin') {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('dht_admin_auth', 'true');
      }
    } else {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('dht_admin_auth');
      }
    }
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

  // --- Newsletter Subscriptions ---
  getNewsletterSubscriptions(): NewsletterSubscription[] {
    const subs = getLocal<NewsletterSubscription[]>(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, []);
    if (!subs || subs.length === 0) {
      setLocal(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, INITIAL_NEWSLETTER_SUBSCRIBERS);
      return INITIAL_NEWSLETTER_SUBSCRIBERS;
    }
    return subs;
  },

  addNewsletterSubscription(
    data: Omit<NewsletterSubscription, 'id' | 'subscribedAt'>
  ): { success: boolean; message: string; isNew: boolean; subscription: NewsletterSubscription } {
    const subs = this.getNewsletterSubscriptions();
    const normalizedEmail = data.email.trim().toLowerCase();
    const existingIndex = subs.findIndex(
      (s) => s.email.trim().toLowerCase() === normalizedEmail
    );

    if (existingIndex >= 0) {
      const updated: NewsletterSubscription = {
        ...subs[existingIndex],
        parentName: data.parentName || subs[existingIndex].parentName,
        phoneOrWhatsapp: data.phoneOrWhatsapp || subs[existingIndex].phoneOrWhatsapp,
        locality: data.locality || subs[existingIndex].locality,
        studentClass: data.studentClass || subs[existingIndex].studentClass,
        topics: data.topics.length > 0 ? data.topics : subs[existingIndex].topics,
      };
      subs[existingIndex] = updated;
      setLocal(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, subs);
      return {
        success: true,
        message: 'Your newsletter preferences have been updated!',
        isNew: false,
        subscription: updated,
      };
    }

    const newSub: NewsletterSubscription = {
      id: `sub-${Date.now()}`,
      email: normalizedEmail,
      parentName: data.parentName?.trim() || '',
      phoneOrWhatsapp: data.phoneOrWhatsapp?.trim() || '',
      locality: data.locality || 'All Areas in Orai',
      studentClass: data.studentClass || '',
      topics: data.topics.length > 0 ? data.topics : ['Child Education Tips', 'New Tutors in Orai'],
      subscribedAt: new Date().toISOString().split('T')[0],
    };

    subs.unshift(newSub);
    setLocal(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, subs);

    // Also trigger an admin/app notification
    this.addNotification({
      title: 'New Parent Newsletter Subscriber',
      message: `${newSub.parentName || newSub.email} subscribed for education tips & tutor alerts (${newSub.locality}).`,
      type: 'admin_message',
      targetRole: 'admin',
    });

    return {
      success: true,
      message: 'Successfully subscribed to Orai Parent Education Tips & Tutor Alerts!',
      isNew: true,
      subscription: newSub,
    };
  },

  removeNewsletterSubscription(id: string): void {
    const subs = this.getNewsletterSubscriptions().filter((s) => s.id !== id);
    setLocal(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, subs);
  },

  // Reset to initial demo state
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEYS.TUTORS);
    localStorage.removeItem(STORAGE_KEYS.TUITION_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.DEMO_REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS);
  },
};
