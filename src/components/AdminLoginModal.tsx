import React, { useState } from 'react';
import { ShieldCheck, Lock, X, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/masterData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Secure Admin PIN: 7268 (Matching the official DHT Orai hotline prefix) or admin123
    const cleanPin = pin.trim();
    if (cleanPin === '7268' || cleanPin === 'admin123' || cleanPin === '7268961107') {
      onSuccess();
      setPin('');
      onClose();
    } else {
      setError('Invalid Admin PIN. Access is restricted to Discovery Home Tuition management.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto mb-2 shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="font-extrabold text-base tracking-tight text-white">
            DHT Admin Verification
          </h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Restricted Headquarters Access • Orai, UP
          </p>
        </div>

        {/* Form Body */}
        <div className="p-5">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Privacy Notice:</span> Lead contact numbers and parent WhatsApp details are strictly confidential and visible only to authorized admin staff.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enter Admin Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  autoFocus
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN (e.g. 7268)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none tracking-widest font-mono font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Hint: Standard management PIN is <span className="font-bold text-slate-600">7268</span>
              </p>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Verify & Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
