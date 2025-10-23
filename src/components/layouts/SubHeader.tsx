"use client";

import { useEffect, useRef, useState } from "react";
import { Bike, Utensils } from "lucide-react";
// Import Next.js navigation hooks
import { usePathname, useRouter } from "next/navigation";
// Import your cn utility
import { cn } from "@/src/app/_libs/utils/cn";

const tabs = [
  { id: "dining", label: "Dine In", icon: <Utensils size={28} /> },
  { id: "delivery", label: "Delivery", icon: <Bike size={28} /> },
];

export default function SubHeader() {
  // We still use useState for the underline style
  const [underlineStyle, setUnderlineStyle] = useState({});
  // Update ref type for better TypeScript support
  const tabsRef = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const pathname = usePathname();
  const router = useRouter();

  // 1. Determine active mode and slug from the URL
  // e.g., URL is /delivery/pune/koregaon-park
  const segments = pathname.split('/').filter(Boolean);
  
  // activeMode is the first segment (e.g., "delivery")
  // We default to "delivery" if no segment is found
  const activeMode = segments[0] || 'delivery'; 
  
  // slugSegments are the rest (e.g., ["pune", "koregaon-park"])
  const slugSegments = segments.slice(1);

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeMode);
    const activeTabElement = tabsRef.current[activeTabIndex];

    if (activeTabElement) {
      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
    // Re-run this effect if the activeMode (from the URL) changes
  }, [activeMode, pathname]);

  // 2. Handle navigation on tab click
  const handleTabClick = (tabId: string) => {
    if (tabId !== activeMode) {
      // Rebuild the path with the new mode + existing slug
      // e.g., /dining/pune/koregaon-park
      const newPath = `/${tabId}/${slugSegments.join('/')}`;
      router.push(newPath);
    }
  };

  return (
    <div className="p-4 shadow-sm">
      <div className="relative border-b-2 border-gray-200">
        <div className="flex items-center space-x-8">
          {tabs.map((tab, index) => {
            // 3. Check active state against the URL mode
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => (tabsRef.current[index] = el)}
                // 4. Use the new navigation handler
                onClick={() => handleTabClick(tab.id)}
                // Use cn utility for cleaner class names
                className={cn(
                  "flex items-center space-x-2 p-2 transition-colors duration-300 focus:outline-none",
                  isActive ? "text-red-500" : "text-gray-600 hover:text-red-400",
                )}
              >
                <div
                  className={cn(
                    "rounded-full p-2 transition-colors duration-300",
                    isActive ? "bg-yellow-100" : "bg-transparent",
                  )}
                >
                  {tab.icon}
                </div>
                <span className="text-lg font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          className="absolute bottom-[-2px] h-1 rounded-full bg-red-500 transition-all duration-300 ease-in-out"
          style={underlineStyle}
        />
      </div>
    </div>
  );
}