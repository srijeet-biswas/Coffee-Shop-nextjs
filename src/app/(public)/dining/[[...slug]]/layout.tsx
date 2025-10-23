import React from 'react';
import SubHeader from '@/src/components/layouts/SubHeader';

// This is the specific layout for DINING mode
export default function DiningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* This is your unique UI for Dining.
        For example, a different header and a footer.
      */}
      <header className="p-3 bg-green-500 text-white text-center shadow-lg">
        Dine-In Mode
      </header>
      
      {/* The SubHeader is included in the layout */}
      <SubHeader />
      
      <main className="flex-grow">
        {children}
      </main>

      {/* A footer only for dining mode */}
      <footer className="p-4 bg-green-700 text-white text-center">
        Dine-In Footer & Restaurant Details
      </footer>
    </div>
  );
}