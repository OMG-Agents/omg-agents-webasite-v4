'use client';
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function About({ openCardId = null, onCloseModal = null }) {
  const [activeModal, setActiveModal] = useState<number | null>(openCardId);
  const { t } = useTranslation();

  // Handle opening modal when openCardId prop changes
  React.useEffect(() => {
    if (openCardId) {
      setActiveModal(openCardId);
    }
  }, [openCardId]);

  // Function to close modal and notify parent
  const closeModal = () => {
    setActiveModal(null);
    if (onCloseModal) {
      onCloseModal();
    }
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 916 0zm6 3a2 2 0 11-4 0 2 2 0 914 0zM7 10a2 2 0 11-4 0 2 2 0 914 0z" />
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
    <section id="about" className="py-20 bg-gray-100 relative">
      {/* Strong blue gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-100 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-lg font-normal text-gray-500 mb-4">{t('about.title')}</h2>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {t('about.subtitle')}
          </h3>
          <div className="w-24 h-1 bg-gray-900"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
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
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-gradient-to-br ${card.bgColor} rounded-xl p-6 border ${card.borderColor} 
                    cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                  onClick={() => setActiveModal(card.id)}
                >
                  <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {card.icon}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{card.summary}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span>{t('about.learnMore')}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Overlay */}
        {activeModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${activeCard?.gradientBg} text-white p-8 rounded-t-2xl`}>
                <div className="flex items-start justify-between">
                   <div className="flex items-center">
                     <div className={`w-16 h-16 ${activeCard?.iconBg} rounded-xl flex items-center justify-center mr-4`}>
                       <div className="w-8 h-8 text-white">
                         {activeCard && React.cloneElement(activeCard.icon, { 
                           className: "w-8 h-8 text-white",
                           fill: "none",
                           stroke: "currentColor"
                         })}
                       </div>
                     </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{activeCard?.title}</h3>
                      <p className="text-white text-opacity-90">{activeCard?.summary}</p>
                    </div>
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
                  {activeCard?.fullDescription}
                </p>

                <h4 className="text-xl font-semibold text-gray-900 mb-6">Key Benefits:</h4>
                <ul className="space-y-4">
                  {activeCard?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={closeModal}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}