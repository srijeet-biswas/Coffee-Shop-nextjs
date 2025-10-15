"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';

// --- Types ---
/** The two possible views for the modal. */
export type AuthView = 'signIn' | 'signUp';

/** The shape of the data and functions provided by the context. */
export type AuthContextType = {
    isModalOpen: boolean;
    initialView: AuthView;
    openModal: () => void;
    closeModal: () => void;
    setInitialView: (view: AuthView) => void;
};

// --- Context Creation ---
// Initialize with undefined, as the consumer hook will enforce use within the Provider.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider Component ---
interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Manages the global state and functions for the authentication modal.
 */
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialView, setInitialView] = useState<AuthView>('signIn');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const contextValue: AuthContextType = {
        isModalOpen,
        initialView,
        openModal,
        closeModal,
        setInitialView,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Custom Hook for Consumption ---

/**
 * Custom hook to safely consume the AuthContext with built-in type checking.
 * Throws an error if used outside of AuthContextProvider.
 * @returns The AuthContextType object.
 */
export const useAuthModal = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        // Enforce proper usage, a crucial TypeScript pattern.
        throw new Error('useAuthModal must be used within an AuthContextProvider');
    }

    return context;
};