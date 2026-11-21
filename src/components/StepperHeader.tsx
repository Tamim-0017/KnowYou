import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, CheckCircle2, Mail, Monitor, X } from 'lucide-react';
import type { WorkflowStep } from '../types/interview';

const CONTACT_EMAIL = 'stmwapp3@gmail.com';

interface StepperHeaderProps {
  onNavigate: (step: WorkflowStep) => void;
}

export const StepperHeader: React.FC<StepperHeaderProps> = ({ onNavigate }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const closeContactModal = () => {
    setIsContactOpen(false);
    setFormError(null);
    setIsSubmitted(false);
    setSubject('');
    setMessage('');
  };

  useEffect(() => {
    if (!isContactOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeContactModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContactOpen]);

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = window.setTimeout(() => {
      closeContactModal();
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [isSubmitted]);

  const encodedSubject = encodeURIComponent(subject.trim() || 'KnowYou Inquiry');
  const encodedBody = encodeURIComponent(message.trim());
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}${
    encodedBody ? `&body=${encodedBody}` : ''
  }`;

  const handleDoneClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!subject.trim() && !message.trim()) {
      event.preventDefault();
      setFormError('Please enter a subject or message before submitting.');
      return;
    }
    setFormError(null);
    setIsSubmitted(true);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#C5D1F7] bg-[#E7ECFB]/90 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-6 bg-[#E7ECFB]/90 px-6 py-3">
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('upload')}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B49DF] to-[#27339A] text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3544B8]"
            aria-label="KnowYou home"
          >
            <Monitor className="h-5 w-5" aria-hidden="true" />
          </button>

          <div>
            <button
              type="button"
              onClick={() => onNavigate('upload')}
              className="font-display block text-left text-2xl sm:text-[1.75rem] font-extrabold tracking-[-0.035em] leading-none text-slate-900 whitespace-nowrap hover:opacity-85 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3544B8]"
            >
              Know<span className="text-[#3544B8]">You</span>
            </button>
            <p className="mt-1 text-xs font-medium text-slate-500 whitespace-nowrap">
              Go-to Interview Prep Application
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormError(null);
            setIsSubmitted(false);
            setIsContactOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3544B8] bg-white px-3.5 py-2 text-sm font-semibold text-[#3544B8] shadow-xs hover:bg-[#EEF0FF] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3544B8]"
          aria-label="Contact Us"
        >
          <Mail className="h-4 w-4 text-[#3544B8]" aria-hidden="true" />
          <span>Contact Us</span>
        </button>
      </div>

      {isContactOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeContactModal();
              }
            }}
          >
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF] text-[#3544B8]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="contact-modal-title"
                      className="font-display text-lg font-bold text-slate-900"
                    >
                      Contact Us
                    </h2>
                    <p className="text-xs text-slate-500">
                      Send us your feedback, questions, or support requests
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeContactModal}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Close contact dialog"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="mt-6 flex flex-col items-center py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-slate-900">
                    Thank you for reaching out!
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Your message has been prepared for delivery.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-5 space-y-3">
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="Feedback, support, or question..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3544B8] focus:outline-none focus:ring-2 focus:ring-[#3544B8]/15"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="Write your message here..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#3544B8] focus:outline-none focus:ring-2 focus:ring-[#3544B8]/15"
                      />
                    </div>
                    {formError && (
                      <p className="text-xs font-medium text-rose-600" role="alert">
                        {formError}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={closeContactModal}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <a
                      href={mailtoHref}
                      onClick={handleDoneClick}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B49DF] to-[#27339A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Done</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
