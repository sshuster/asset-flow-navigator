
import React from 'react';
import PricingPage from '@/components/pricing/PricingPage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4">
          <PricingPage />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
