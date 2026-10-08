import React from 'react';
import { X, Bell, Check, Sparkles, Calendar, BookOpen, MessageSquare } from 'lucide-react';
import { AppNotification } from '../types';
import { StorageService } from '../services/storage';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onRefresh: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}) => {
  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    StorageService.markAllNotificationsRead();
    onRefresh();
  };

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'demo_confirmation':
      case 'demo_reminder':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'tutor_assigned':
      case 'tuition_confirmation':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'tutor_request':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm sm:text-base">Notifications Center</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-blue-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {notifications.length} notification{notifications.length === 1 ? '' : 's'}
          </span>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-blue-700 hover:underline font-bold"
          >
            Mark all as read
          </button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto p-2">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl transition flex items-start gap-3 ${
                  n.read ? 'bg-white opacity-80' : 'bg-blue-50/50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {getNotifIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">No notifications yet.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
