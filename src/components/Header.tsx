'use client';
import { useState } from "react";
import { useTranslation } from '@/contexts/TranslationContext';
import LanguageToggle from './LanguageToggle';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
  onOpenProduct?: (productId: string) => void;
  onOpenAboutCard?: (cardId: number) => void;
  onOpenContactModal?: () => void;
  isLoaded?: boolean;
}

export default function Header({ onOpenProduct, onOpenAboutCard, onOpenContactModal, isLoaded = false }: HeaderProps) {
  const [state, setState] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className={`sticky top-0 z-[100000] bg-white w-full border-b border-gray-100 transition-all duration-1000 ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="flex items-center justify-between w-full px-4 sm:px-8 py-4">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => {
                  const element = document.getElementById('hero');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="transition-all duration-300 hover:opacity-80 hover:scale-105 micro-bounce"
              >
                <img
                  src="/omg-logo-original.svg"
                  width={120}
                  height={50}
                  alt="OMG Agents logo"
                  className="w-24 h-10 md:w-[120px] md:h-[50px] transition-all duration-300"
                />
              </button>
            </div>
        
        {/* Right side - Contact button and hamburger */}
        <div className="flex items-center space-x-4">
          {/* Contact Button */}
              <button
                onClick={onOpenContactModal}
                className="hidden sm:flex items-center space-x-2 hover:underline transition-all duration-300 text-black hover-lift micro-bounce"
                onMouseEnter={(e) => e.currentTarget.style.color = '#733CFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
              >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 micro-rotate"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">{t('navigation.contact')}</span>
          </button>

          {/* Language Toggle - Desktop */}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          
          {/* Language Toggle - Mobile */}
          <div className="block sm:hidden">
            <LanguageToggle />
          </div>
          
          {/* Hamburger Menu */}
          <button
            className="text-gray-600 hover:text-gray-800 outline-none transition-all duration-300 hover-lift micro-bounce"
            onClick={() => setState(!state)}
          >
            {state ? (
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
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
        
        {/* Navigation Menu */}
        <NavigationMenu 
          isOpen={state} 
          onClose={() => setState(false)} 
          onOpenProduct={onOpenProduct}
          onOpenAboutCard={onOpenAboutCard}
          onOpenContactModal={onOpenContactModal}
        />
      </div>
    </nav>
  );
}
