'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Orb from './Orb';
import { useTranslation } from '@/contexts/TranslationContext';

interface HeroProps {
  isVisible?: boolean;
  isContentReady?: boolean;
  onOpenContactModal?: () => void;
}

export default function Hero({ isVisible = false, isContentReady = false, onOpenContactModal }: HeroProps) {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handlePrimaryClick = () => {
    scrollToSection('products');
  };

  const handleSecondaryClick = () => {
    if (onOpenContactModal) {
      onOpenContactModal();
    }
  };
  const { elementRef, isVisible: isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });
  

  return (
    <section 
      ref={elementRef}
      id="hero" 
      className={`py-20 bg-white transition-all duration-1000 ${
        isVisible || isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-screen-xl mx-auto text-gray-700 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
        <div className={`flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl order-2 md:order-1 transition-all duration-1000 delay-200 ${
          isVisible || isInView ? 'animate-fade-in-left' : 'animate-hidden'
        }`}>
          <h1 className={`text-sm text-cyan-600 font-medium transition-all duration-700 delay-300 ${
            isVisible || isInView ? 'animate-fade-in-up' : 'animate-hidden'
          }`}>
            {t('hero.badge')}
          </h1>
          <h2 
            className={`text-4xl text-gray-900 font-extrabold md:text-5xl japanese-heading transition-all duration-700 delay-400 ${
              isVisible || isInView ? 'animate-fade-in-up' : 'animate-hidden'
            }`}
            dangerouslySetInnerHTML={{
              __html: t('hero.title')
                .replace('{smes}', `<span class="text-cyan-500">${t('hero.smesHighlight')}</span>`)
                .replace('{aiSolutions}', `<span class="text-cyan-500">${t('hero.aiSolutionsHighlight')}</span>`)
            }}
          />
          <p 
            className={`text-gray-600 japanese-text transition-all duration-700 delay-500 ${
              isVisible || isInView ? 'animate-fade-in-up' : 'animate-hidden'
            }`}
            dangerouslySetInnerHTML={{
              __html: t('hero.description')
                .replace('{chatAgents}', `<span class="text-cyan-600 font-medium">${t('hero.chatAgentsHighlight')}</span>`)
                .replace('{aiStrategy}', `<span class="text-cyan-600 font-medium">${t('hero.aiStrategyHighlight')}</span>`)
                .replace('{inHouseAlgorithms}', `<span class="text-cyan-600 font-medium">${t('hero.inHouseAlgorithmsHighlight')}</span>`)
                .replace('{personalConsultation}', `<span class="text-cyan-500">${t('hero.personalConsultationHighlight')}</span>`)
            }}
          />
          <div className={`items-center gap-x-3 space-y-3 sm:flex sm:space-y-0 transition-all duration-700 delay-600 ${
            isVisible || isInView ? 'animate-fade-in-up' : 'animate-hidden'
          }`}>
            <button
              onClick={handlePrimaryClick}
              className="block py-2 px-4 text-center text-white font-medium bg-cyan-600 duration-150 hover:bg-cyan-500 active:bg-cyan-700 rounded-lg shadow hover-bg-subtle"
            >
              {t('hero.primaryButton')}
            </button>
            <button
              onClick={handleSecondaryClick}
              className="flex items-center justify-center gap-x-2 py-2 px-4 text-cyan-700 hover:text-cyan-900 font-medium duration-150 active:bg-cyan-50 border border-cyan-300 hover:border-cyan-400 rounded-lg md:inline-flex hover-bg-subtle"
            >
              {t('hero.secondaryButton')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={`flex-none mt-14 md:mt-0 md:max-w-xl order-1 md:order-2 transition-all duration-1000 delay-300 ${
          isVisible || isInView ? 'animate-fade-in-right' : 'animate-hidden'
        }`}>
          <div className="h-80 md:h-[600px] orb-container" style={{ width: '100%', position: 'relative', aspectRatio: '1/1', maxWidth: '600px', margin: '0 auto' }}>
            <Orb
              hoverIntensity={0.8}
              rotateOnHover={true}
              hue={0}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
