import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/masterData';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';

interface FloatingContactBarProps {
  onOpenDemo: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ onOpenDemo }) => {
  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-2.5">
      {/* Floating WhatsApp Action Pill */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5 active:scale-95"
        title="Chat on WhatsApp: 7268961107"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-xs font-bold tracking-wide">WhatsApp Us</span>
      </a>

      {/* Direct Call Button (Quick Dial) */}
      <a
        href={getCallUrl()}
        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5 active:scale-95"
        title="Direct Call: 7268961107"
      >
        <Phone className="w-4 h-4 text-amber-300" />
        <span className="text-xs font-bold tracking-wide">Call 7268961107</span>
      </a>
    </div>
  );
};
