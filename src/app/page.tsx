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
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [openAboutCardId, setOpenAboutCardId] = useState<number | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalMessage, setContactModalMessage] = useState<string>('');
  
  // Page load animation state
  const { isLoaded, isHeroVisible, isContentReady, loadProgress } = usePageLoad();

  // Ensure scroll is always available
  useEffect(() => {
    const restoreScroll = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    };

    // Listen for modal close events
    window.addEventListener('modalClosed', restoreScroll);
    
    // Restore scroll on page load
    restoreScroll();

    return () => {
      window.removeEventListener('modalClosed', restoreScroll);
    };
  }, []);

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

  const handleOpenContactModal = (preFilledMessage?: string) => {
    setContactModalMessage(preFilledMessage || '');
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setContactModalMessage(''); // Clear the message when closing
  };

  return (
    <div className={`page-load-enter ${isLoaded ? 'page-load-enter-active' : ''}`} style={{ scrollBehavior: 'smooth' }}>
      {/* Loading Progress Bar */}
      {!isContentReady && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full transition-all duration-300 ease-out"
            style={{ 
              background: 'linear-gradient(to right, #733CFF, #9333ea)',
              width: `${loadProgress}%` 
            }}
          />
        </div>
      )}

      <Header 
        onOpenProduct={handleOpenProduct} 
        onOpenAboutCard={handleOpenAboutCard}
        onOpenContactModal={handleOpenContactModal}
        isLoaded={isLoaded}
      />
      
      <main className="w-full">
        <Hero 
          isVisible={isHeroVisible}
          isContentReady={isContentReady}
          onOpenContactModal={handleOpenContactModal}
        />
        <section id="about">
          <About 
            openCardId={openAboutCardId} 
            onCloseModal={handleCloseAboutModal}
            isContentReady={isContentReady}
          />
        </section>
        <section id="products">
          <Products 
            openProductId={openProductId} 
            onCloseModal={handleCloseProductModal}
            isContentReady={isContentReady}
            onOpenContactModal={handleOpenContactModal}
          />
        </section>
        <section id="why-choose">
          <WhyChoose 
            isContentReady={isContentReady}
          />
        </section>
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
        preFilledMessage={contactModalMessage}
      />
    </div>
  );
}
