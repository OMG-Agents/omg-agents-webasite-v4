'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import WhyChoose from '@/components/WhyChoose';

export default function Home() {
  const [openProductId, setOpenProductId] = useState(null);
  const [openAboutCardId, setOpenAboutCardId] = useState(null);

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

  return (
    <>
      <Header 
        onOpenProduct={handleOpenProduct} 
        onOpenAboutCard={handleOpenAboutCard}
      />
      <main>
        <Hero />
        <About 
          openCardId={openAboutCardId} 
          onCloseModal={handleCloseAboutModal}
        />
        <Products 
          openProductId={openProductId} 
          onCloseModal={handleCloseProductModal}
        />
        <WhyChoose />
      </main>
    </>
  );
}
