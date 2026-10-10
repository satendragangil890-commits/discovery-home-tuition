/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClassesAndSubjects } from './components/ClassesAndSubjects';
import { TutorDirectory } from './components/TutorDirectory';
import { ParentFlowModal } from './components/ParentFlowModal';
import { FreeDemoModal } from './components/FreeDemoModal';
import { TutorProfileModal } from './components/TutorProfileModal';
import { BecomeTutorSection } from './components/BecomeTutorSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AdminDashboard } from './components/AdminDashboard';
import { UserProfileModal } from './components/UserProfileModal';
import { NotificationsModal } from './components/NotificationsModal';
import { FloatingContactBar } from './components/FloatingContactBar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SkeletonLoader } from './components/SkeletonLoader';
import { StorageService } from './services/storage';
import { SEOService } from './services/seo';
import { Tutor, TuitionRequest, DemoRequest, Review, AppNotification, UserRole } from './types';
import { BUSINESS_CONFIG } from './data/masterData';

export default function App() {
  // App initialization state to prevent visual flicker or blank screen
  const [isLoading, setIsLoading] = useState(true);

  // State from StorageService
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [tuitionRequests, setTuitionRequests] = useState<TuitionRequest[]>([]);
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [selectedArea, setSelectedArea] = useState<string>('All Areas in Orai');

  // Modals
  const [findTutorOpen, setFindTutorOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [viewingTutor, setViewingTutor] = useState<Tutor | null>(null);
  const [tutorProfileModalOpen, setTutorProfileModalOpen] = useState(false);
  const [selectedTutorForDemo, setSelectedTutorForDemo] = useState<Tutor | null>(null);
  const [prefilledDemoSubject, setPrefilledDemoSubject] = useState<string>('');
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Prefill criteria for Parent Flow wizard
  const [parentFlowPrefill, setParentFlowPrefill] = useState<{
    studentClass?: string;
    board?: string;
    subject?: string;
  }>({});

  // Mobile Bottom Tab
  const [mobileTab, setMobileTab] = useState<'home' | 'find_tutor' | 'free_demo' | 'become_tutor' | 'profile'>('home');

  // Load data on mount
  const refreshAllData = () => {
    setTutors(StorageService.getTutors());
    setTuitionRequests(StorageService.getTuitionRequests());
    setDemoRequests(StorageService.getDemoRequests());
    setReviews(StorageService.getReviews());
    setNotifications(StorageService.getNotifications());
    setCurrentRole(StorageService.getCurrentRole());
    setLanguage(StorageService.getLanguage());
  };

  useEffect(() => {
    refreshAllData();
    // Smooth delay so fonts, styles, and local storage stabilize without flicker
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    StorageService.setCurrentRole(role);
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    StorageService.setLanguage(nextLang);
  };

  // Open Handlers
  const handleOpenFindTutor = (prefill?: { studentClass?: string; board?: string; subject?: string }) => {
    if (prefill) {
      setParentFlowPrefill(prefill);
    } else {
      setParentFlowPrefill({});
    }
    setFindTutorOpen(true);
  };

  const handleOpenDemo = (tutor?: Tutor | null, subject?: string) => {
    setSelectedTutorForDemo(tutor || null);
    setPrefilledDemoSubject(subject || '');
    setDemoModalOpen(true);
  };

  const handleViewTutorProfile = (tutor: Tutor) => {
    setViewingTutor(tutor);
    setTutorProfileModalOpen(true);
  };

  const handleMobileTabSelect = (tab: 'home' | 'find_tutor' | 'free_demo' | 'become_tutor' | 'profile') => {
    setMobileTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'find_tutor') {
      handleOpenFindTutor();
    } else if (tab === 'free_demo') {
      handleOpenDemo();
    } else if (tab === 'become_tutor') {
      const el = document.getElementById('become-tutor-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'profile') {
      setProfileModalOpen(true);
    }
  };

  // Dynamic SEO & Document Title Manager based on Active View
  useEffect(() => {
    if (currentRole === 'admin') {
      SEOService.setAdminSEO();
      return;
    }

    if (tutorProfileModalOpen && viewingTutor) {
      SEOService.setTutorProfileSEO(viewingTutor);
      return;
    }

    if (findTutorOpen) {
      SEOService.setFindTutorSEO();
      return;
    }

    if (demoModalOpen) {
      SEOService.setFreeDemoSEO(prefilledDemoSubject);
      return;
    }

    if (profileModalOpen) {
      SEOService.setProfileSEO(currentRole);
      return;
    }

    // Default Home / Locality SEO
    SEOService.setHomeSEO(selectedArea);
  }, [
    currentRole,
    tutorProfileModalOpen,
    viewingTutor,
    findTutorOpen,
    demoModalOpen,
    prefilledDemoSubject,
    profileModalOpen,
    selectedArea,
  ]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-950">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        notifications={notifications}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenFindTutor={() => handleOpenFindTutor()}
        onOpenDemo={() => handleOpenDemo()}
        onOpenBecomeTutor={() => {
          const el = document.getElementById('become-tutor-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenProfile={() => setProfileModalOpen(true)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
      />

      {/* Main Content Area */}
      {currentRole === 'admin' ? (
        /* ADMIN DASHBOARD VIEW */
        <main className="flex-1">
          <AdminDashboard
            tutors={tutors}
            tuitionRequests={tuitionRequests}
            demoRequests={demoRequests}
            reviews={reviews}
            notifications={notifications}
            onRefreshData={refreshAllData}
            onClose={() => handleRoleChange('parent')}
          />
        </main>
      ) : (
        /* PARENT & TUTOR VIEW (Commercial EdTech Frontend) */
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onOpenFindTutor={() => handleOpenFindTutor()}
            onOpenDemo={() => handleOpenDemo()}
            language={language}
          />

          {/* Classes, Boards, Subjects & Special Services Breakdown */}
          <ClassesAndSubjects
            onSelectCategory={(criteria) => handleOpenFindTutor(criteria)}
            onOpenDemo={(serviceName) => handleOpenDemo(null, serviceName)}
          />

          {/* Tutor Directory & Smart Matching System */}
          <TutorDirectory
            tutors={tutors}
            onViewProfile={handleViewTutorProfile}
            onRequestDemo={(tutor) => handleOpenDemo(tutor)}
            onOpenParentFlow={() => handleOpenFindTutor()}
            initialFilters={{
              area: selectedArea.includes('All') ? '' : selectedArea,
            }}
          />

          {/* Why Choose Us & Trust Pillars */}
          <WhyChooseUs
            onOpenDemo={() => handleOpenDemo()}
            onOpenFindTutor={() => handleOpenFindTutor()}
          />

          {/* Become a Tutor Section */}
          <BecomeTutorSection
            onTutorRegistered={(newTutor) => {
              refreshAllData();
            }}
          />

          {/* Parent Reviews & Feedback */}
          <ReviewsSection
            reviews={reviews}
            tutors={tutors}
            onReviewAdded={() => refreshAllData()}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenFindTutor={() => handleOpenFindTutor()}
        onOpenDemo={() => handleOpenDemo()}
        onOpenBecomeTutor={() => {
          const el = document.getElementById('become-tutor-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => setAdminLoginModalOpen(true)}
        onSelectArea={(area) => {
          setSelectedArea(area);
          const el = document.getElementById('find-tutor-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Call & WhatsApp Desk */}
      <FloatingContactBar
        onOpenDemo={() => handleOpenDemo()}
        currentArea={selectedArea}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentTab={mobileTab}
        onSelectTab={handleMobileTabSelect}
        currentRole={currentRole}
      />

      {/* 10-Step Interactive Parent Tuition Requirement Wizard */}
      <ParentFlowModal
        isOpen={findTutorOpen}
        onClose={() => {
          setFindTutorOpen(false);
          refreshAllData();
        }}
        prefilledClass={parentFlowPrefill.studentClass}
        prefilledSubject={parentFlowPrefill.subject}
        prefilledBoard={parentFlowPrefill.board}
        onTutorSelect={(tutor) => handleOpenDemo(tutor)}
      />

      {/* Book Free Demo Modal */}
      <FreeDemoModal
        isOpen={demoModalOpen}
        onClose={() => {
          setDemoModalOpen(false);
          refreshAllData();
        }}
        selectedTutor={selectedTutorForDemo}
        prefilledSubject={prefilledDemoSubject}
      />

      {/* Tutor Profile Deep View Modal */}
      <TutorProfileModal
        tutor={viewingTutor}
        isOpen={tutorProfileModalOpen}
        onClose={() => {
          setTutorProfileModalOpen(false);
          setViewingTutor(null);
        }}
        onRequestDemo={(tutor) => {
          setTutorProfileModalOpen(false);
          handleOpenDemo(tutor);
        }}
      />

      {/* User / Parent / Tutor Profile Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        tuitionRequests={tuitionRequests}
        demoRequests={demoRequests}
        tutors={tutors}
        notifications={notifications}
        onOpenFindTutor={() => handleOpenFindTutor()}
        onOpenDemo={() => handleOpenDemo()}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onRefresh={refreshAllData}
      />

      {/* Restricted Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={() => {
          handleRoleChange('admin');
        }}
      />
    </div>
  );
}
