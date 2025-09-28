'use client';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEffect } from 'react';
import LanguageToggle from './LanguageToggle';

interface FooterProps {
  onOpenProduct?: (productId: string) => void;
  onOpenAboutCard?: (cardId: number) => void;
  onOpenLegalModal?: (type: 'privacy' | 'terms') => void;
  onOpenContactModal?: () => void;
  isContentReady?: boolean;
}

export default function Footer({ onOpenProduct, onOpenAboutCard, onOpenLegalModal, onOpenContactModal, isContentReady = false }: FooterProps) {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openProduct = (productId: string) => {
    // Store current scroll position
    const currentScrollY = window.scrollY;
    sessionStorage.setItem('footerScrollPosition', currentScrollY.toString());
    
    if (onOpenProduct) {
      onOpenProduct(productId);
    }
    scrollToSection('products');
  };

  const openAboutCard = (cardId: number) => {
    // Store current scroll position
    const currentScrollY = window.scrollY;
    sessionStorage.setItem('footerScrollPosition', currentScrollY.toString());
    
    if (onOpenAboutCard) {
      onOpenAboutCard(cardId);
    }
    scrollToSection('about');
  };

  // Listen for modal close events and restore scroll position
  useEffect(() => {
    const handleModalClose = () => {
      const savedScrollY = sessionStorage.getItem('footerScrollPosition');
      if (savedScrollY) {
        window.scrollTo({
          top: parseInt(savedScrollY),
          behavior: 'smooth'
        });
        sessionStorage.removeItem('footerScrollPosition');
      }
    };

    // Listen for custom modal close events
    window.addEventListener('modalClosed', handleModalClose);
    
    return () => {
      window.removeEventListener('modalClosed', handleModalClose);
    };
  }, []);

  return (
    <footer className={`bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 relative transition-all duration-1000 ${
      isContentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {/* Strong blue gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-100 to-transparent pointer-events-none"></div>
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <button
                onClick={() => {
                  const element = document.getElementById('hero');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="/omg-logo-original.svg"
                  width={120}
                  height={50}
                  alt="OMG Agents logo"
                  className="w-24 h-10 md:w-[120px] md:h-[50px]"
                />
              </button>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 text-gray-800">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('navigation.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('navigation.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('navigation.products')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-choose')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('navigation.whyChoose')}
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-base font-bold mb-4 text-gray-800">
              {t('footer.solutions')}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openProduct('chat-1')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('footer.chatSolutions')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProduct('voice-1')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('footer.voiceSolutions')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProduct('visual-1')}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  {t('footer.visualSolutions')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-base font-bold mb-4 text-gray-800">
              {t('footer.contact')}
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>{t('footer.address')}</p>
              <p>
                <a 
                  href={`mailto:${t('footer.email')}`}
                  className="hover:text-gray-800 transition-colors"
                >
                  {t('footer.email')}
                </a>
              </p>
              <button
                onClick={onOpenContactModal}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors w-full justify-center"
              >
                {t('navigation.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © 2025 OMG Agents. {t('footer.allRightsReserved')}
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm">
              <div className="flex space-x-6">
                <button
                  onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t('footer.privacyPolicy')}
                </button>
                <button
                  onClick={() => onOpenLegalModal && onOpenLegalModal('terms')}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t('footer.termsOfService')}
                </button>
              </div>
              <div className="flex items-center">
                <LanguageToggle variant="footer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
