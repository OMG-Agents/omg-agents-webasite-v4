'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/contexts/TranslationContext';
// Icons as inline SVG components

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preFilledMessage?: string;
}

export default function ContactModal({ isOpen, onClose, preFilledMessage = '' }: ContactModalProps) {
  const { t } = useTranslation();
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [expandedTextarea, setExpandedTextarea] = useState(false);
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [messageValue, setMessageValue] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Set pre-filled message when modal opens
  useEffect(() => {
    if (isOpen && preFilledMessage && typeof preFilledMessage === 'string') {
      setMessageValue(preFilledMessage);
    } else if (isOpen && !preFilledMessage) {
      // Clear the textarea to allow placeholder to show
      setMessageValue('');
      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
    }
  }, [isOpen, preFilledMessage]);

  // Consolidated modal setup/cleanup
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      setSubmitStatus(null);
      setSelectedFiles([]);
      setExpandedTextarea(false);
      setFormStartTime(Date.now());
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];

    if (file.size > maxSize) {
      return `${file.name} is too large. Maximum size is 10MB.`;
    }

    if (!allowedTypes.includes(file.type)) {
      return `${file.name} is not a supported file type.`;
    }

    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];
    
    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });
    
    if (errors.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: errors.join('\n')
      });
      return;
    }
    
    // Limit to 5 files maximum
    if (selectedFiles.length + validFiles.length > 5) {
      setSubmitStatus({
        type: 'error',
        message: 'Maximum 5 files allowed. Please remove some files first.'
      });
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if form ref exists
    if (!formRef.current) {
      console.error('Form ref is null');
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.formError')
      });
      return;
    }
    
    // Security: Rate limiting (max 1 submission per 30 seconds)
    const now = Date.now();
    if (now - lastSubmissionTime < 30000) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.rateLimit')
      });
      return;
    }

    // Security: Check multiple honeypot fields (bots will fill these)
    const honeypot1 = formRef.current?.botField?.value;
    const honeypot2 = formRef.current?.website?.value;
    const honeypot3 = formRef.current?.url?.value;
    
    if (honeypot1 || honeypot2 || honeypot3) {
      console.log('Bot detected via honeypot fields');
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.invalidSubmission')
      });
      return;
    }

    // Security: Time-based validation (humans take time to fill forms)
    if (formStartTime) {
      const timeSpent = now - formStartTime;
      if (timeSpent < 5000) { // Less than 5 seconds
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.takeTime')
      });
        return;
      }
    }

    // Security: Basic input validation
    const formData = new FormData(formRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const securityCheck = formData.get('securityCheck') as string;

    if (!name || !email || !message) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.requiredFields')
      });
      return;
    }

    // Security: Input sanitization
    const sanitizedName = name.trim().replace(/[<>]/g, '');
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim().replace(/[<>]/g, '');

    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.nameLength')
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.validEmail')
      });
      return;
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.messageLength')
      });
      return;
    }

    // Security: Check for suspicious patterns
    const suspiciousPatterns = [
      /(http|https|www\.)/i, // URLs
      /(buy|sell|cheap|free|offer|deal)/i, // Spam keywords
      /(viagra|casino|poker|loan|credit)/i, // Common spam terms
    ];

    const messageText = sanitizedMessage.toLowerCase();
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => pattern.test(messageText));
    
    if (hasSuspiciousPattern) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.spamContent')
      });
      return;
    }

    // Security: Verify human verification checkboxes
    const humanVerification1 = formData.get('humanVerification1');
    const humanVerification2 = formData.get('humanVerification2');
    
    if (!humanVerification1 || !humanVerification2) {
      setSubmitStatus({
        type: 'error',
        message: t('contactForm.validation.securityVerification')
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setLastSubmissionTime(now);

    try {
      console.log('Submitting form with data:', {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        company: formData.get('company'),
        files: selectedFiles.length,
        timestamp: now
      });
      
      // Create FormData with all the form fields
      const submitFormData = new FormData();
      submitFormData.append('access_key', 'ac444ad6-a13d-41b6-869c-6b41c9c67456');
      submitFormData.append('name', sanitizedName);
      submitFormData.append('email', sanitizedEmail);
      submitFormData.append('message', sanitizedMessage);
      submitFormData.append('company', (formData.get('company') as string)?.trim() || '');
      submitFormData.append('securityCheck', securityCheck);
      
      // Add files to form data
      selectedFiles.forEach((file, index) => {
        submitFormData.append(`file_${index}`, file);
      });
      
      // Log the actual FormData being sent
      console.log('FormData contents:');
      for (const [key, value] of submitFormData.entries()) {
        if (key.startsWith('file_')) {
          console.log(`${key}:`, value instanceof File ? `${value.name} (${value.size} bytes, ${value.type})` : value);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: t('contactForm.validation.successMessage')
        });
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
        setSelectedFiles([]);
        setMessageValue('');
        
        // Clear status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage = t('contactForm.validation.networkError');
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = t('contactForm.validation.networkError');
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Immediately restore scroll when closing
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    // Dispatch modalClosed event for scroll restoration
    const event = new CustomEvent('modalClosed');
    window.dispatchEvent(event);
    onClose();
  };


  if (!isOpen) return null;

  return createPortal(
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={handleClose}
    >
      {/* Modal Content */}
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('contactForm.title')}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Contact Info Bar */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center sm:items-center gap-4 sm:gap-8 p-4 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 group w-full sm:w-auto sm:justify-start">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col items-center min-w-[120px] sm:items-start">
                <p className="text-gray-600 text-xs">{t('contactForm.contactInfo.email')}</p>
                <p className="text-gray-900 font-medium text-sm">contact@omgagents.ai</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group w-full sm:w-auto sm:justify-start">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col items-center min-w-[120px] sm:items-start">
                <p className="text-gray-600 text-xs">{t('contactForm.contactInfo.location')}</p>
                <p className="text-gray-900 font-medium text-sm">Tsukuba, Japan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 group w-full sm:w-auto sm:justify-start">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col items-center min-w-[120px] sm:items-start">
                <p className="text-gray-600 text-xs">{t('contactForm.contactInfo.businessHours')}</p>
                <p className="text-gray-900 font-medium text-sm">{t('contactForm.contactInfo.businessHoursValue')}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <form 
              ref={formRef}
              action="https://api.web3forms.com/submit" 
              method="POST" 
              className="space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Security: Multiple honeypot fields - hidden from users, catches bots */}
              <input 
                type="text" 
                name="botField"
                className="absolute left-[-9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
              />
              <input 
                type="text" 
                name="website"
                className="absolute left-[-9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
              />
              <input 
                type="text" 
                name="url"
                className="absolute left-[-9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
              />
              
              {/* Form Fields Row */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t('contactForm.form.name')} *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-400"
                    placeholder={t('contactForm.form.namePlaceholder')}
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t('contactForm.form.email')} *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-400"
                    placeholder={t('contactForm.form.emailPlaceholder')}
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
                <div className="group">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t('contactForm.form.company')}</label>
                  <input 
                    type="text" 
                    name="company"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-400"
                    placeholder={t('contactForm.form.companyPlaceholder')}
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
              </div>
              
              {/* Message Field */}
              <div className="group">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-gray-700 text-sm font-medium">{t('contactForm.form.message')} *</label>
                  <button
                    type="button"
                    onClick={() => setExpandedTextarea(!expandedTextarea)}
                    className="flex items-center space-x-1 text-xs text-gray-500 hover:text-purple-600 transition-all duration-300 px-2 py-1 rounded hover:bg-purple-50"
                  >
                    <span className="text-sm">{expandedTextarea ? '📏' : '📐'}</span>
                    <span className="text-xs">{expandedTextarea ? t('contactForm.form.compactTextarea') : t('contactForm.form.expandTextarea')}</span>
                  </button>
                </div>
                <textarea 
                  ref={textareaRef}
                  name="message"
                  required
                  rows={expandedTextarea ? 8 : 4}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className={`w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-500 resize-none hover:border-purple-300 ${
                    expandedTextarea ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
                  }`}
                  placeholder={t('contactForm.form.messagePlaceholder')}
                  disabled={isSubmitting}
                  key={`message-${t('contactForm.form.messagePlaceholder')}`}
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  {t('contactForm.form.messageTip')}
                </p>
              </div>
              
              {/* File Upload and Security Row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* File Upload Section */}
                <div className="group">
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    📎 {t('contactForm.form.attachments')}
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="text-2xl mb-2">📎</div>
                    <p className="text-gray-600 text-sm mb-1">
                      {t('contactForm.form.attachmentsDragText')}{' '}
                      <label className="text-purple-600 hover:text-purple-500 cursor-pointer">
                        {t('contactForm.form.attachmentsBrowseText')}
                        <input
                          type="file"
                          multiple
                          onChange={(e) => handleFileSelect(e.target.files)}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                          disabled={isSubmitting}
                        />
                      </label>
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('contactForm.form.attachmentsInfo')}
                    </p>
                  </div>
                  
                  {/* File List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {file.type.includes('pdf') ? '📄' : 
                               file.type.includes('word') ? '📝' : 
                               file.type.includes('text') ? '📄' : '🖼️'}
                            </span>
                            <div>
                              <p className="text-xs text-gray-700">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-400 transition-colors text-sm"
                            disabled={isSubmitting}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Security Check */}
                <div className="group">
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    🔒 {t('contactForm.form.securityTitle')}
                  </label>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <div className="space-y-3">
                      <p className="text-gray-700 text-sm">
                        {t('contactForm.form.securityDescription')}
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            name="humanVerification1"
                            required
                            className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                            disabled={isSubmitting}
                          />
                          <span className="text-gray-700 text-sm">{t('contactForm.form.securityCheck1')}</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            name="humanVerification2"
                            required
                            className="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                            disabled={isSubmitting}
                          />
                          <span className="text-gray-700 text-sm">{t('contactForm.form.securityCheck2')}</span>
                        </label>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      {t('contactForm.form.securityNote')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('contactForm.form.submittingButton')}</span>
                    </div>
                  ) : (
                    t('contactForm.form.submitButton')
                  )}
                </button>
              </div>
            </form>
            
            {/* Status Messages */}
            {submitStatus && (
              <div className={`mt-4 p-4 rounded-lg text-center transition-all duration-500 ${
                submitStatus?.type === 'success' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700' 
                  : 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-700'
              }`}>
                {submitStatus?.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body // This renders the modal directly to body, bypassing all transforms
  );
}
