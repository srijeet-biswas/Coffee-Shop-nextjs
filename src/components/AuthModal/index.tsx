"use client";

import React, { useEffect } from 'react';
// Import the custom hook from your context file
import { useAuthModal, type AuthView } from '../../context/AuthContext';
// Import the form components
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

/**
 * The main component for the Sign In/Sign Up pop-up modal.
 * It manages the modal display, tab switching, and overall layout.
 */
const AuthModal: React.FC = () => {
    // Use the custom hook to access global state and functions
    const { 
        isModalOpen, 
        closeModal, 
        initialView, 
        setInitialView 
    } = useAuthModal();

    // Local state to manage whether to show Sign In or Sign Up, initialized from context
    const [currentView, setCurrentView] = React.useState<AuthView>(initialView);

    // Effect to synchronize the local view with the initialView set by the header buttons
    useEffect(() => {
        setCurrentView(initialView);
    }, [initialView]);

    // Cleanup effect: Reset the initialView state when the modal closes
    // This is important so the next time the modal opens, it respects the button clicked
    useEffect(() => {
        if (!isModalOpen) {
            setInitialView('signIn'); // Reset to default when closed
        }
    }, [isModalOpen, setInitialView]);


    // Function to switch between the two forms
    const switchView = (view: AuthView) => {
        setCurrentView(view);
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        // Modal Overlay: Fixed position, dark background, centered flex container
        // Close modal if the overlay is clicked (but not the content itself)
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center backdrop-blur-sm"
            onClick={closeModal}
        >
            {/* Modal Content: Dark card, centered, stops propagation on click */}
            <div 
                className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md relative border border-gray-700"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors focus:outline-none"
                    onClick={closeModal}
                    aria-label="Close Authentication Modal"
                >
                    &times;
                </button>

                {/* Tabbed View Navigation */}
                <div className="flex justify-center mb-6 border-b border-gray-700">
                    <button
                        className={`py-3 px-6 text-xl font-bold transition-colors focus:outline-none ${
                            currentView === 'signIn' 
                                ? 'text-blue-400 border-b-2 border-blue-400' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => switchView('signIn')}
                    >
                        Sign In
                    </button>
                    <button
                        className={`py-3 px-6 text-xl font-bold transition-colors focus:outline-none ${
                            currentView === 'signUp' 
                                ? 'text-blue-400 border-b-2 border-blue-400' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => switchView('signUp')}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Conditional Form Rendering */}
                {currentView === 'signIn' ? (
                    <SignInForm switchView={() => switchView('signUp')} closeModal={closeModal} />
                ) : (
                    <SignUpForm switchView={() => switchView('signIn')} closeModal={closeModal} />
                )}

            </div>
        </div>
    );
};

export default AuthModal;