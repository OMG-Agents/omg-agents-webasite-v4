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
    <footer className={`bg-gray-900 text-white transition-all duration-1000 ${
      isContentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6 -ml-6">
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
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              {t('footer.companyDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#733CFF' }}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('navigation.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('navigation.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('navigation.products')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('why-choose')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('navigation.whyChoose')}
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#733CFF' }}>
              {t('footer.solutions')}
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => openProduct('chat-1')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.chatSolutions')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProduct('voice-1')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.voiceSolutions')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProduct('visual-1')}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.visualSolutions')}
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: '#733CFF' }}>
              {t('footer.company')}
            </h3>
            <ul className="space-y-3 mb-8">
              <li>
                <button
                  onClick={() => openAboutCard(1)}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('about.card1Title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutCard(2)}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('about.card2Title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutCard(3)}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('about.card3Title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openAboutCard(4)}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('about.card4Title')}
                </button>
              </li>
            </ul>
            
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#733CFF' }}>
              {t('footer.contact')}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p>{t('footer.address')}</p>
              <p>
                <a 
                  href={`mailto:${t('footer.email')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('footer.email')}
                </a>
              </p>
              <button
                onClick={onOpenContactModal}
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                {t('navigation.contact')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 OMG Agents. {t('footer.allRightsReserved')}
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
              <div className="flex space-x-8">
                <button
                  onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('footer.privacyPolicy')}
                </button>
                <button
                  onClick={() => onOpenLegalModal && onOpenLegalModal('terms')}
                  className="text-gray-400 hover:text-white transition-colors"
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
