'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/contexts/TranslationContext';

interface ProductsProps {
  openProductId?: string | null;
  onCloseModal?: () => void;
  isContentReady?: boolean;
}

export default function Products({ openProductId = null, onCloseModal = null, isContentReady = false }: ProductsProps) {
  const [activeModal, setActiveModal] = useState(openProductId);
  const { t } = useTranslation();
  
  // Simple scroll animation for the section
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  // Handle opening modal when openProductId prop changes
  useEffect(() => {
    if (openProductId) {
      setActiveModal(openProductId);
    }
  }, [openProductId]);

  // Simple approach - just prevent scrolling without changing position
  useEffect(() => {
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

  // Helper function to ensure arrays are properly formatted
  const ensureArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [];
  };

  const productSuites = [
    {
      id: 1,
      title: t('products.suites.chat.title'),
      tagline: t('products.suites.chat.tagline'),
      description: t('products.suites.chat.description'),
      bgGradient: "from-blue-400 to-blue-600",
      illustration: "🤖💬", // Placeholder for illustration
      products: [
        {
          id: 'chat-1',
          name: t('products.chatProducts.customerService.name'),
          description: t('products.chatProducts.customerService.description'),
          fullDescription: t('products.chatProducts.customerService.fullDescription'),
          features: ensureArray(t('products.chatProducts.customerService.features')),
          useCases: ensureArray(t('products.chatProducts.customerService.useCases'))
        },
        {
          id: 'chat-2',
          name: t('products.chatProducts.internalHelpdesk.name'),
          description: t('products.chatProducts.internalHelpdesk.description'),
          fullDescription: t('products.chatProducts.internalHelpdesk.fullDescription'),
          features: ensureArray(t('products.chatProducts.internalHelpdesk.features')),
          useCases: ensureArray(t('products.chatProducts.internalHelpdesk.useCases'))
        },
        {
          id: 'chat-3',
          name: t('products.chatProducts.leadQualification.name'),
          description: t('products.chatProducts.leadQualification.description'),
          fullDescription: t('products.chatProducts.leadQualification.fullDescription'),
          features: ensureArray(t('products.chatProducts.leadQualification.features')),
          useCases: ensureArray(t('products.chatProducts.leadQualification.useCases'))
        }
      ]
    },
    {
      id: 2,
      title: t('products.suites.voice.title'),
      tagline: t('products.suites.voice.tagline'),
      description: t('products.suites.voice.description'),
      bgGradient: "from-purple-400 to-purple-600",
      illustration: "📞🎙️",
      products: [
        {
          id: 'voice-1',
          name: t('products.voiceProducts.voiceAgent.name'),
          description: t('products.voiceProducts.voiceAgent.description'),
          fullDescription: t('products.voiceProducts.voiceAgent.fullDescription'),
          features: ensureArray(t('products.voiceProducts.voiceAgent.features')),
          useCases: ensureArray(t('products.voiceProducts.voiceAgent.useCases'))
        },
        {
          id: 'voice-2',
          name: t('products.voiceProducts.callAnalytics.name'),
          description: t('products.voiceProducts.callAnalytics.description'),
          fullDescription: t('products.voiceProducts.callAnalytics.fullDescription'),
          features: ensureArray(t('products.voiceProducts.callAnalytics.features')),
          useCases: ensureArray(t('products.voiceProducts.callAnalytics.useCases'))
        },
        {
          id: 'voice-3',
          name: t('products.voiceProducts.callCenterSolution.name'),
          description: t('products.voiceProducts.callCenterSolution.description'),
          fullDescription: t('products.voiceProducts.callCenterSolution.fullDescription'),
          features: ensureArray(t('products.voiceProducts.callCenterSolution.features')),
          useCases: ensureArray(t('products.voiceProducts.callCenterSolution.useCases'))
        }
      ]
    },
    {
      id: 3,
      title: t('products.suites.visual.title'),
      tagline: t('products.suites.visual.tagline'),
      description: t('products.suites.visual.description'),
      bgGradient: 'from-emerald-400 to-emerald-600',
      illustration: '👁️📹',
      products: [
        {
          id: 'visual-1',
          name: t('products.visualProducts.securityMonitoring.name'),
          description: t('products.visualProducts.securityMonitoring.description'),
          fullDescription: t('products.visualProducts.securityMonitoring.fullDescription'),
          features: ensureArray(t('products.visualProducts.securityMonitoring.features')),
          useCases: ensureArray(t('products.visualProducts.securityMonitoring.useCases'))
        },
        {
          id: 'visual-2',
          name: t('products.visualProducts.elderCare.name'),
          description: t('products.visualProducts.elderCare.description'),
          fullDescription: t('products.visualProducts.elderCare.fullDescription'),
          features: ensureArray(t('products.visualProducts.elderCare.features')),
          useCases: ensureArray(t('products.visualProducts.elderCare.useCases'))
        },
        {
          id: 'visual-3',
          name: t('products.visualProducts.businessAnalytics.name'),
          description: t('products.visualProducts.businessAnalytics.description'),
          fullDescription: t('products.visualProducts.businessAnalytics.fullDescription'),
          features: ensureArray(t('products.visualProducts.businessAnalytics.features')),
          useCases: ensureArray(t('products.visualProducts.businessAnalytics.useCases'))
        }
      ]
    }
  ];

  const allProducts = productSuites.flatMap(suite => 
    suite.products.map(product => ({ ...product, suiteTitle: suite.title }))
  );
  
  const activeProduct = allProducts.find(product => product.id === activeModal);

  return (
    <section 
      ref={elementRef}
      id="products" 
      className={`py-20 bg-gray-50 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Strong blue gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-100 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-lg font-normal text-gray-500 mb-4">{t('products.title')}</h2>
          <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t('products.subtitle')}
          </h3>
          <div className="w-24 h-1 bg-gray-900"></div>
        </div>

        {/* Hero Product Suite Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {productSuites.map((suite, index) => (
            <div
              key={suite.id}
              className={`bg-gradient-to-br ${suite.bgGradient} rounded-2xl p-8 text-white relative overflow-hidden transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-4 translate-y-4"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4">{suite.illustration}</div>
                <h4 className="text-xl font-bold mb-2">{suite.title}</h4>
                <p className="text-white/80 text-sm mb-4">{suite.tagline}</p>
                <p className="text-white/90 leading-relaxed">{suite.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Product Lists */}
        <div className="space-y-12">
          {productSuites.map((suite, suiteIndex) => (
            <div key={suite.id} className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: `${(suiteIndex + 1) * 300}ms` }}>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">{suite.title}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suite.products.map((product, productIndex) => {
                  const globalIndex = suiteIndex * 3 + productIndex;
                  return (
                    <div
                      key={product.id}
                      onClick={() => setActiveModal(product.id)}
                      className={`bg-white rounded-xl p-6 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-700 group hover-lift ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                      }`}
                      style={{ transitionDelay: `${(suiteIndex * 3 + productIndex) * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </h5>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                      <div className="text-sm text-indigo-600 font-medium group-hover:underline">
                        {t('products.learnMore')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal - Using React Portal to bypass transform contexts */}
        {activeModal && activeProduct && createPortal(
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
                maxWidth: '1000px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-white/80 mb-2">{activeProduct.suiteTitle}</div>
                    <h3 className="text-3xl font-bold mb-4">{activeProduct.name}</h3>
                    <p className="text-white/90 text-lg">{activeProduct.description}</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {activeProduct.fullDescription}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Features */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">{t('products.keyFeatures')}</h4>
                    <ul className="space-y-3">
                      {activeProduct?.features?.length > 0 ? activeProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      )) : (
                        <li className="text-gray-500 italic">Features information not available</li>
                      )}
                    </ul>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">{t('products.commonUseCases')}</h4>
                    <ul className="space-y-3">
                      {activeProduct?.useCases?.length > 0 ? activeProduct.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{useCase}</span>
                        </li>
                      )) : (
                        <li className="text-gray-500 italic">Use cases information not available</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
                  >
                    {t('products.close')}
                  </button>
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                    {t('products.requestDemo')}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body // This renders the modal directly to body, bypassing all transforms
        )}

      </div>
    </section>
  );
}
