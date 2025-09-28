'use client';
import React from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/TranslationContext';

interface WhyChooseProps {
  isContentReady?: boolean;
}

export default function WhyChoose({ isContentReady = false }: WhyChooseProps) {
  const { t } = useTranslation();
  
  // Scroll animations
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Staggered animation for points
  const { elementRef: pointsRef, visibleItems } = useStaggeredAnimation(4, 300, {
    threshold: 0.1,
    triggerOnce: true
  });

  // Force animation on mount if element is already visible (for refresh at bottom)
  const [forceVisible, setForceVisible] = React.useState(false);
  
  // Mobile-specific stable animation state
  const [mobileAnimated, setMobileAnimated] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    // Check if mobile on mount
    setIsMobile(window.innerWidth <= 768);
    
    const checkVisibility = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          setForceVisible(true);
          // Trigger mobile animation when visible, regardless of mobile state
          if (window.innerWidth <= 768 && !mobileAnimated) {
            // Small delay for mobile stability
            setTimeout(() => setMobileAnimated(true), 100);
          }
        }
      }
    };

    // Check immediately and after a short delay
    checkVisibility();
    const timeout = setTimeout(checkVisibility, 100);
    
    // Also listen for scroll events to catch mobile scroll
    const handleScroll = () => {
      checkVisibility();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileAnimated]);
  return (
    <section 
      ref={elementRef}
      id="why-choose" 
      className={`py-20 bg-gray-100 relative transition-all duration-1000 ${
        isVisible || forceVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isMobile ? `why-choose-mobile-stable ${mobileAnimated ? 'animate-in' : ''}` : ''
      }`}
    >
      {/* Strong blue gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-100 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${
          isVisible || forceVisible ? 'animate-fade-in-up' : 'animate-hidden'
        } ${isMobile ? 'why-choose-content' : ''} ${isMobile && mobileAnimated ? 'visible' : ''}`}>
          <h2 className="text-lg font-normal text-gray-500 mb-4">{t('whyChoose.title')}</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {t('whyChoose.subtitle')}
          </h3>
          <div className="w-24 h-1 bg-gray-900"></div>
        </div>

        {/* Point 1 - Personal Consultation */}
        <div ref={pointsRef as React.RefObject<HTMLDivElement>} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 ${
          isMobile ? 'point-item' : ''
        } ${isMobile && mobileAnimated ? 'visible' : ''}`}>
          {/* Illustration Left */}
          <div className={`order-2 lg:order-1 transition-all duration-700 delay-300 ${
            visibleItems.includes(0) || forceVisible ? 'animate-fade-in-left' : 'animate-hidden'
          }`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden hover-lift">
              <div className="absolute top-6 right-6 text-6xl font-bold text-indigo-200 opacity-50 animate-pulse">01</div>
              
              {/* Simple illustration representation */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-8 mb-4">
                  {/* Consultant */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-2 animate-glow">
                      <svg className="w-8 h-8 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-indigo-700">Your Consultant</span>
                  </div>
                  
                  {/* Connection */}
                  <div className="flex-1 h-0.5 bg-indigo-300 animate-pulse"></div>
                  
                  {/* Business Owner */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2 animate-glow">
                      <svg className="w-8 h-8 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-purple-700">Your Business</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">{t('whyChoose.point1.illustrationText')}</p>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-400 ${
            visibleItems.includes(0) || forceVisible ? 'animate-fade-in-right' : 'animate-hidden'
          }`}>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              {t('whyChoose.point1.title')}
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t('whyChoose.point1.description')}
            </p>
          </div>
        </div>

        {/* Point 2 - SME Expertise */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 ${
          isMobile ? 'point-item' : ''
        } ${isMobile && mobileAnimated ? 'visible' : ''}`}>
          {/* Content Left */}
          <div className={`transition-all duration-700 delay-500 ${
            visibleItems.includes(1) || forceVisible ? 'animate-fade-in-left' : 'animate-hidden'
          }`}>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              {t('whyChoose.point2.title')}
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t('whyChoose.point2.description')}
            </p>
          </div>

          {/* Illustration Right */}
          <div className={`transition-all duration-700 delay-600 ${
            visibleItems.includes(1) || forceVisible ? 'animate-fade-in-right' : 'animate-hidden'
          }`}>
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden hover-lift">
              <div className="absolute top-6 right-6 text-6xl font-bold text-purple-200 opacity-50 animate-pulse">02</div>
              
              {/* SME Focus illustration */}
              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Small buildings representing SMEs */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-16 bg-purple-400 rounded-sm flex items-end justify-center pb-2 animate-float">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">Startup</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-20 bg-purple-500 rounded-sm flex items-end justify-center pb-2 animate-float" style={{ animationDelay: '0.5s' }}>
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">Growing</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-24 bg-purple-600 rounded-sm flex items-end justify-center pb-2 animate-float" style={{ animationDelay: '1s' }}>
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">Scaling</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">{t('whyChoose.point2.illustrationText')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Point 3 - Comprehensive Solutions */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 ${
          isMobile ? 'point-item' : ''
        } ${isMobile && mobileAnimated ? 'visible' : ''}`}>
          {/* Illustration Left */}
          <div className={`order-2 lg:order-1 transition-all duration-700 delay-700 ${
            visibleItems.includes(2) || forceVisible ? 'animate-fade-in-left' : 'animate-hidden'
          }`}>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden hover-lift">
              <div className="absolute top-6 right-6 text-6xl font-bold text-cyan-200 opacity-50 animate-pulse">03</div>
              
              {/* Three solution types */}
              <div className="text-center">
                <div className="flex justify-center space-x-6 mb-6">
                  {/* Chat */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-2 animate-glow">
                      <svg className="w-8 h-8 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-blue-700">Chat</span>
                  </div>
                  
                  {/* Voice */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-2 animate-glow" style={{ animationDelay: '0.3s' }}>
                      <svg className="w-8 h-8 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-purple-700">Voice</span>
                  </div>
                  
                  {/* Visual */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mb-2 animate-glow" style={{ animationDelay: '0.6s' }}>
                      <svg className="w-8 h-8 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-emerald-700">Visual</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">{t('whyChoose.point3.illustrationText')}</p>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-800 ${
            visibleItems.includes(2) || forceVisible ? 'animate-fade-in-right' : 'animate-hidden'
          }`}>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              {t('whyChoose.point3.title')}
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t('whyChoose.point3.description')}
            </p>
          </div>
        </div>

        {/* Point 4 - Continuous Partnership */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
          isMobile ? 'point-item' : ''
        } ${isMobile && mobileAnimated ? 'visible' : ''}`}>
          {/* Content Left */}
          <div className={`transition-all duration-700 delay-900 ${
            visibleItems.includes(3) || forceVisible ? 'animate-fade-in-left' : 'animate-hidden'
          }`}>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              {t('whyChoose.point4.title')}
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t('whyChoose.point4.description')}
            </p>
          </div>

          {/* Illustration Right */}
          <div className={`transition-all duration-700 delay-1000 ${
            visibleItems.includes(3) || forceVisible ? 'animate-fade-in-right' : 'animate-hidden'
          }`}>
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 h-80 flex items-center justify-center relative overflow-hidden hover-lift">
              <div className="absolute top-6 right-6 text-6xl font-bold text-emerald-200 opacity-50 animate-pulse">04</div>
              
              {/* Growth partnership illustration */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {/* Partnership handshake representation */}
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center animate-glow">
                    <svg className="w-10 h-10 text-white micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  
                  {/* Growth arrow */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-0.5 bg-emerald-400 animate-pulse"></div>
                    <svg className="w-6 h-6 text-emerald-500 micro-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">{t('whyChoose.point4.illustrationText')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
