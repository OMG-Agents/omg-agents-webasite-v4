'use client';
import { useState, useEffect } from 'react';
import { usePageLoad } from '@/hooks/usePageLoad';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import WhyChoose from '@/components/WhyChoose';
import Footer from '@/components/Footer';
import LegalModal from '@/components/LegalModal';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [openProductId, setOpenProductId] = useState(null);
  const [openAboutCardId, setOpenAboutCardId] = useState(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Page load animation state
  const { isLoaded, isHeroVisible, isContentReady, loadProgress } = usePageLoad();

  // Removed scroll to top for debugging

  const handleOpenProduct = (productId: string) => {
    setOpenProductId(productId);
  };

  const handleCloseProductModal = () => {
    setOpenProductId(null);
  };

  const handleOpenAboutCard = (cardId: number) => {
    setOpenAboutCardId(cardId);
  };

  const handleCloseAboutModal = () => {
    setOpenAboutCardId(null);
  };

  const handleOpenLegalModal = (type: 'privacy' | 'terms') => {
    setLegalModalType(type);
  };

  const handleCloseLegalModal = () => {
    setLegalModalType(null);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className={`page-load-enter ${isLoaded ? 'page-load-enter-active' : ''}`} style={{ scrollBehavior: 'auto' }}>
      {/* Loading Progress Bar */}
      {!isContentReady && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}

      <Header 
        onOpenProduct={handleOpenProduct} 
        onOpenAboutCard={handleOpenAboutCard}
        onOpenContactModal={handleOpenContactModal}
        isLoaded={isLoaded}
      />
      
      <main>
        <Hero 
          isVisible={isHeroVisible}
          isContentReady={isContentReady}
        />
        <About 
          openCardId={openAboutCardId} 
          onCloseModal={handleCloseAboutModal}
          isContentReady={isContentReady}
        />
        <Products 
          openProductId={openProductId} 
          onCloseModal={handleCloseProductModal}
          isContentReady={isContentReady}
        />
        <WhyChoose 
          isContentReady={isContentReady}
        />
      </main>
      
      <Footer 
        onOpenProduct={handleOpenProduct} 
        onOpenAboutCard={handleOpenAboutCard}
        onOpenLegalModal={handleOpenLegalModal}
        onOpenContactModal={handleOpenContactModal}
        isContentReady={isContentReady}
      />
      
      {/* Legal Modal */}
      {legalModalType && (
        <LegalModal
          isOpen={!!legalModalType}
          onClose={handleCloseLegalModal}
          type={legalModalType}
        />
      )}
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </div>
  );
}
