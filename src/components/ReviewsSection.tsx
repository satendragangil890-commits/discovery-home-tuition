import React, { useState } from 'react';
import { Star, ShieldCheck, Plus, CheckCircle, MessageSquare } from 'lucide-react';
import { Review, Tutor } from '../types';
import { StorageService } from '../services/storage';
import { CLASSES_LIST, CORE_SUBJECTS, ORAI_LOCALITIES } from '../data/masterData';

interface ReviewsSectionProps {
  reviews: Review[];
  tutors: Tutor[];
  onReviewAdded: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  tutors,
  onReviewAdded,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [parentName, setParentName] = useState('');
  const [studentClass, setStudentClass] = useState('Class 10');
  const [subject, setSubject] = useState('Mathematics');
  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [area, setArea] = useState('Rajendra Nagar');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !comment.trim()) return;

    const matchedTutor = tutors.find((t) => t.id === selectedTutorId);

    const newRev = StorageService.addReview({
      parentName: parentName.trim(),
      studentClass,
      subject,
      tutorId: selectedTutorId || undefined,
      tutorName: matchedTutor?.name || 'Discovery Home Tutor',
      rating,
      comment: comment.trim(),
      area: `${area}, Orai`,
    });

    onReviewAdded(newRev);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setModalOpen(false);
      setComment('');
      setParentName('');
    }, 1500);
  };

  return (
    <section id="reviews-section" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Parent Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2">
              What Orai Parents Say About Discovery Home Tuition
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real feedback from families in Rajendra Nagar, Rath Road, Konch Road, and Sushil Nagar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="self-start sm:self-end px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Parent Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-xs transition"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Parent</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                  “{rev.comment}”
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-200/80">
                <div className="font-bold text-xs text-blue-950">{rev.parentName}</div>
                <div className="text-[11px] text-slate-500">
                  {rev.studentClass} · {rev.subject}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                  <span>📍 {rev.area}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Submit Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative border border-slate-200 shadow-2xl">
              <h3 className="text-base font-bold text-blue-950 mb-1">
                Share Your Tuition Experience
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Your review helps other parents in Orai find the right teacher for their child.
              </p>

              {isSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div className="font-bold text-slate-900 text-sm">Review Submitted!</div>
                  <div className="text-xs text-slate-500">
                    Thank you for sharing your genuine feedback.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Mrs. Sunita Saxena"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
                      <select
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                      >
                        {CLASSES_LIST.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                      >
                        {CORE_SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Locality in Orai
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                      >
                        {ORAI_LOCALITIES.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Select Tutor (Optional)
                      </label>
                      <select
                        value={selectedTutorId}
                        onChange={(e) => setSelectedTutorId(e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                      >
                        <option value="">General DHT Service</option>
                        {tutors.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              s <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {rating} Star{rating > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Feedback / Review *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Teacher is very punctual and helped my daughter score 90+ in class 10 pre-boards..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
