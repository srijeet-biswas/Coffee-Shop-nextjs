"use client";

import { useState, useRef, useEffect } from 'react';
import { Utensils, Bike, GlassWater } from 'lucide-react';

const tabs = [
    { id: 'dining', label: 'Dine In', icon: <Utensils size={28} /> },
    { id: 'delivery', label: 'Delivery', icon: <Bike size={28} /> }
];

export default function SubHeader() {
    const [activeTab, setActiveTab] = useState(tabs[1].id);
    const [underlineStyle, setUnderlineStyle] = useState({});
    const tabsRef = useRef({});

    useEffect(() => {
        const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
        const activeTabElement = tabsRef.current[activeTabIndex];

        if(activeTabElement) {
            setUnderlineStyle({
                left: activeTabElement.offsetLeft,
                width: activeTabElement.offsetWidth
            });
        }
    }, [activeTab]);

    return (
        <div className="p-4 shadow-sm">
            <div className="relative border-b-2 border-gray-200">
                <div className="flex items-center space-x-8">
                    {tabs.map((tab, index) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                // 4. Assign a ref to each tab button
                                ref={(el) => (tabsRef.current[index] = el)}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 p-2 focus:outline-none transition-colors duration-300 ${
                                isActive ? "text-red-500" : "text-gray-600 hover:text-red-400"
                                }`}
                            >
                                {/* Icon with conditional background */}
                                <div
                                className={`p-2 rounded-full transition-colors duration-300 ${
                                    isActive ? "bg-yellow-100" : "bg-transparent"
                                }`}
                                >
                                {tab.icon}
                                </div>
                                <span className="text-lg font-semibold">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div
                    className="absolute bottom-[-2px] h-1 bg-red-500 rounded-full transition-all duration-300 ease-in-out"
                    style={underlineStyle}
                />
            </div>
        </div>
    );
}