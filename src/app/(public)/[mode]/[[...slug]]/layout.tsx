import SubHeader from '@/components/layouts/SubHeader'; // Assuming this path
import { notFound } from 'next/navigation';
import React from 'react';

// Placeholder UI components (define these elsewhere or inline them)
const ModeHeaders: Record<string, React.FC<{ children: React.ReactNode }>> = {
  delivery: ({ children }) => (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <header className="sticky top-0 z-20 p-3 bg-red-500 text-white text-center shadow-lg">
        Delivery: Address and Cart Summary Bar
      </header>
      {children}
    </div>
  ),
  dining: ({ children }) => (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="p-3 bg-green-500 text-white text-center shadow-lg">
        Dine-In Layout: Table Reservation Tools
      </header>
      {children}
      <footer className="p-4 bg-green-700 text-white text-center">
        Dine-In Footer & Restaurant Details
      </footer>
    </div>
  ),
  // Add 'takeaway' here when you implement it
  // takeaway: ({ children }) => (/* ... takeaway specific UI ... */),
};

export default function DynamicModeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { mode: string; slug?: string[] };
}>) {
  const { mode } = params;
  
  // 1. Validate the mode parameter against known modes
  const ModeWrapper = ModeHeaders[mode];
  if (!ModeWrapper) {
    // If the URL is /invalidmode/pune, show 404
    notFound(); 
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* SubHeader is shared by ALL modes */}
      <SubHeader />
      <ModeWrapper>
        <main className="flex-grow container mx-auto p-4">{children}</main>
      </ModeWrapper>
    </div>
  );
}