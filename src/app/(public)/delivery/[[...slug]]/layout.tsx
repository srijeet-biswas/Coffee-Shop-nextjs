import React from 'react';
import SubHeader from '@/src/components/layouts/SubHeader';

// This is the specific layout for DELIVERY mode
export default function DeliveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* This is your unique UI for Delivery.
        For example, a sticky header.
      */}
      {/* <header className="sticky top-0 z-20 p-3 bg-red-500 text-white text-center shadow-lg">
        Delivery Mode
      </header> */}
      
      {/* The SubHeader is included in the layout */}
      <SubHeader />
      
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}