'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/TranslationContext';

interface AboutProps {
  openCardId?: number | null;
  onCloseModal?: () => void;
  isContentReady?: boolean;
}

export default function About({ openCardId = null, onCloseModal = undefined, isContentReady = false }: AboutProps) {
  const [activeModal, setActiveModal] = useState<number | null>(openCardId);
  const { t } = useTranslation();
  
  // Scroll animations
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Separate scroll animation for text content
  const { elementRef: textRef, isVisible: isTextVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true
  });
  
  // Removed staggered animation to prevent reloading effect

  // Handle opening modal when openCardId prop changes
  React.useEffect(() => {
    if (openCardId) {
      setActiveModal(openCardId);
    }
  }, [openCardId]);

  // Simple approach - just prevent scrolling without changing position
  React.useEffect(() => {
    if (activeModal) {
      // Simple approach - just prevent scrolling without changing position
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeModal]);

  // Function to close modal and notify parent
  const closeModal = () => {
    setActiveModal(null);
    if (onCloseModal) {
      onCloseModal();
    }
    // Dispatch custom event for footer scroll restoration
    window.dispatchEvent(new CustomEvent('modalClosed'));
  };

  const cards = [
    {
      id: 1,
      title: t('about.card1Title'),
      summary: t('about.card1Summary'),
      fullDescription: t('about.card1Description'),
      benefits: [
        t('about.card1Benefit1'),
        t('about.card1Benefit2'),
        t('about.card1Benefit3'),
        t('about.card1Benefit4'),
        t('about.card1Benefit5')
      ],
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      bgColor: "from-indigo-50 to-indigo-100",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-500",
      gradientBg: "from-indigo-600 to-purple-700"
    },
    {
      id: 2,
      title: t('about.card2Title'),
      summary: t('about.card2Summary'),
      fullDescription: t('about.card2Description'),
      benefits: [
        t('about.card2Benefit1'),
        t('about.card2Benefit2'),
        t('about.card2Benefit3'),
        t('about.card2Benefit4'),
        t('about.card2Benefit5')
      ],
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 01 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 01 9.288 0M15 7a3 3 0 11-6 0 3 3 0 01 6 0zm6 3a2 2 0 11-4 0 2 2 0 01 4 0zM7 10a2 2 0 11-4 0 2 2 0 01 4 0z" />
        </svg>
      ),
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-500",
      gradientBg: "from-purple-600 to-pink-700"
    },
    {
      id: 3,
      title: t('about.card3Title'),
      summary: t('about.card3Summary'),
      fullDescription: t('about.card3Description'),
      benefits: [
        t('about.card3Benefit1'),
        t('about.card3Benefit2'),
        t('about.card3Benefit3'),
        t('about.card3Benefit4'),
        t('about.card3Benefit5')
      ],
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: "from-cyan-50 to-cyan-100",
      borderColor: "border-cyan-200",
      iconBg: "bg-cyan-500",
      gradientBg: "from-cyan-600 to-blue-700"
    },
    {
      id: 4,
      title: t('about.card4Title'),
      summary: t('about.card4Summary'),
      fullDescription: t('about.card4Description'),
      benefits: [
        t('about.card4Benefit1'),
        t('about.card4Benefit2'),
        t('about.card4Benefit3'),
        t('about.card4Benefit4'),
        t('about.card4Benefit5')
      ],
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      bgColor: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      iconBg: "bg-emerald-500",
      gradientBg: "from-emerald-600 to-teal-700"
    }
  ];

  const activeCard = activeModal ? cards.find(card => card.id === activeModal) : null;

  return (
    <>
      {/* Main Section - WITHOUT modal inside */}
      <section 
        ref={elementRef}
        id="about" 
        className={`py-20 bg-gray-100 relative transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Strong blue gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-100 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Title Section */}
          <div className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-lg font-normal text-gray-500 mb-4">{t('about.title')}</h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {t('about.subtitle')}
            </h3>
            <div className="w-24 h-1 bg-gray-900"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column - Text Content */}
            <div ref={textRef as React.RefObject<HTMLDivElement>} className={`space-y-8 transition-all duration-1500 ${
              isTextVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  {t('about.mainHeading')}
                </h4>
                
                <div className="description">
                  <p className="description-text text-gray-700" style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '1.8',
                    marginTop: '32px'
                  }}>
                    {t('about.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Clickable Cards */}
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`bg-gradient-to-br ${card.bgColor} rounded-xl p-6 border ${card.borderColor} 
                      cursor-pointer transition-all duration-200 group hover-bg-subtle ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                      }`}
                    onClick={() => setActiveModal(card.id)}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-4 transition-transform duration-200`}>
                      {card.icon}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">{card.summary}</p>
                    
                    <div className="flex items-center text-sm text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      <span className="group-hover:underline">{t('about.learnMore')}</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modal - Using React Portal to bypass transform contexts */}
      {activeModal && createPortal(
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
          onClick={() => setActiveModal(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              background: `linear-gradient(to right, ${activeCard?.gradientBg?.includes('indigo') ? '#4f46e5, #7c3aed' : activeCard?.gradientBg?.includes('purple') ? '#9333ea, #ec4899' : activeCard?.gradientBg?.includes('cyan') ? '#0891b2, #1d4ed8' : '#059669, #0d9488'})`,
              color: 'white',
              padding: '32px',
              borderRadius: '16px 16px 0 0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: activeCard?.iconBg?.includes('indigo') ? '#4f46e5' : activeCard?.iconBg?.includes('purple') ? '#9333ea' : activeCard?.iconBg?.includes('cyan') ? '#0891b2' : '#059669',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <div style={{ width: '32px', height: '32px', color: 'white' }}>
                      {activeCard && React.cloneElement(activeCard.icon, { 
                        style: { width: '32px', height: '32px', color: 'white' },
                        fill: "none",
                        stroke: "currentColor"
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', margin: '0 0 8px 0' }}>
                      {activeCard?.title}
                    </h3>
                    <p style={{ opacity: 0.9, margin: '0' }}>{activeCard?.summary}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{ 
                    color: 'white', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '24px', 
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              <p style={{ color: '#374151', fontSize: '18px', lineHeight: '1.6', marginBottom: '32px' }}>
                {activeCard?.fullDescription}
              </p>
              
              <h4 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                Key Benefits:
              </h4>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {activeCard?.benefits?.map((benefit, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      marginTop: '2px',
                      flexShrink: 0,
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#16a34a'
                    }}>
                      ✓
                    </div>
                    <span style={{ color: '#374151' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{
                    width: '100%',
                    backgroundColor: '#111827',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body // This renders the modal directly to body, bypassing all transforms
      )}
    </>
  );
}