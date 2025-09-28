'use client';
import { createPortal } from 'react-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import LanguageToggle from './LanguageToggle';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct?: (productId: string) => void;
  onOpenAboutCard?: (cardId: number) => void;
  onOpenContactModal?: () => void;
}

export default function NavigationMenu({ isOpen, onClose, onOpenProduct, onOpenAboutCard, onOpenContactModal }: NavigationMenuProps) {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  const openProduct = (productId: string) => {
    if (onOpenProduct) {
      onOpenProduct(productId);
    }
    scrollToSection('products');
    onClose();
  };

  const openAboutCard = (cardId: number) => {
    if (onOpenAboutCard) {
      onOpenAboutCard(cardId);
    }
    scrollToSection('about');
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
        zIndex: 50,
        backgroundColor: 'white',
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={() => {
              const element = document.getElementById('hero');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                onClose();
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
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 transition-colors"
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Sections */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              {t('navigation.mainSections')}
            </h3>
            
            <div className="space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center space-x-2 text-left transition-colors hover:text-purple-600 text-gray-700"
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <span className="font-medium text-gray-700">{t('navigation.home')}</span>
              </button>
              
              <button
                onClick={() => scrollToSection('about')}
                className="flex items-center space-x-2 text-left transition-colors hover:text-purple-600 text-gray-700"
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <span className="font-medium text-gray-700">{t('navigation.about')}</span>
              </button>
              
              <button
                onClick={() => scrollToSection('products')}
                className="flex items-center space-x-2 text-left transition-colors hover:text-purple-600 text-gray-700"
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <span className="font-medium text-gray-700">{t('navigation.products')}</span>
              </button>
              
              <button
                onClick={() => scrollToSection('why-choose')}
                className="flex items-center space-x-2 text-left transition-colors hover:text-purple-600 text-gray-700"
              >
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <span className="font-medium text-gray-700">{t('navigation.whyChoose')}</span>
              </button>
            </div>
          </div>

          {/* AI Solutions */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              {t('navigation.aiSolutions')}
            </h3>
            
            {/* Chat Solutions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <h4 className="font-medium text-gray-700">{t('navigation.chatSolutions')}</h4>
              </div>
              <div className="ml-5 space-y-2">
                <button
                  onClick={() => openProduct('chat-1')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.chatProducts.customerService.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('chat-2')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.chatProducts.internalHelpdesk.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('chat-3')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.chatProducts.leadQualification.name')}</span>
                </button>
              </div>
            </div>

            {/* Voice Solutions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <h4 className="font-medium text-gray-700">{t('navigation.voiceSolutions')}</h4>
              </div>
              <div className="ml-5 space-y-2">
                <button
                  onClick={() => openProduct('voice-1')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.voiceProducts.voiceAgent.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('voice-2')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.voiceProducts.callAnalytics.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('voice-3')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.voiceProducts.callCenterSolution.name')}</span>
                </button>
              </div>
            </div>

            {/* Visual Solutions */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#733CFF' }}></div>
                <h4 className="font-medium text-gray-700">{t('navigation.visualSolutions')}</h4>
              </div>
              <div className="ml-5 space-y-2">
                <button
                  onClick={() => openProduct('visual-1')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.visualProducts.securityMonitoring.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('visual-2')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.visualProducts.elderCare.name')}</span>
                </button>
                <button
                  onClick={() => openProduct('visual-3')}
                  className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{t('products.visualProducts.businessAnalytics.name')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
              {t('navigation.company')}
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{t('navigation.ourStory')}</span>
              </button>
              <button
                onClick={() => openAboutCard(1)}
                className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{t('navigation.ourTechnology')}</span>
              </button>
              <button
                onClick={() => openAboutCard(2)}
                className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{t('navigation.personalConsultation')}</span>
              </button>
              <button
                onClick={() => openAboutCard(3)}
                className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{t('navigation.smeFocus')}</span>
              </button>
              <button
                onClick={() => openAboutCard(4)}
                className="flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{t('navigation.continuousInnovation')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Section */}
      <div className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <button
              onClick={onOpenContactModal}
              className="text-gray-600 transition-colors font-medium hover:text-purple-600"
            >
              {t('navigation.contactUs')}
            </button>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body // This renders the navigation menu directly to body, bypassing all transforms
  );
}
