'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const { t, tObject } = useTranslation();

  // Close modal on escape key and manage scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Store original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocumentOverflow = document.documentElement.style.overflow;
      
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        // Restore original overflow values
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocumentOverflow;
        // Ensure smooth scrolling is restored
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    const event = new CustomEvent('modalClosed');
    window.dispatchEvent(event);
    onClose();
  };

  if (!isOpen) return null;

  const legalContent = type === 'privacy' ? tObject('legal.privacyPolicy') : tObject('legal.termsOfService');
  const sections = legalContent?.sections || {};

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed' }}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform-none"
        style={{ transform: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {legalContent.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {legalContent.lastUpdated}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="border-b border-gray-100 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ color: '#733CFF' }}>
                  {section.title}
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {formatContent(section.content)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t('products.close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
