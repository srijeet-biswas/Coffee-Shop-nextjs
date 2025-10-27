"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// --- Types ---
/** The two possible views for the modal. */
export type AuthView = 'signIn' | 'signUp';

export type User = {
    id: number;
    name: string;
    email: string;
};

/** The shape of the data and functions provided by the context. */
export type AuthContextType = {
    isModalOpen: boolean;
    initialView: AuthView;
    openModal: () => void;
    closeModal: () => void;
    setInitialView: (view: AuthView) => void;
    user: User|null;
    token: string|null;
    signIn: (data:any) => Promise<void>;
    signUp: (data:any) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
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
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('authToken');
            const storedUser = localStorage.getItem('authUser');

            if(storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }

        } catch(error) {
            console.error("Failed to load ", error);
        } finally {
            setIsAppLoading(false);
        }
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const signIn = async(data: any) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            
            if (!res.ok || !result.success) {
                throw new Error(result.error || 'Sign-in failed');
            }

            setUser(result.user);
            setToken(result.token);
            localStorage.setItem('authUser', JSON.stringify(result.user));
            localStorage.setItem('authToken', result.token);
            
            closeModal();

        } catch(error: any) {
            console.log('Sign in error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async(data: any) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if(!res.ok || !result.success) {
                throw new Error(result.error || 'Sign-up failed');
            }
            setInitialView('signIn');
            console.log('Sign up success !');

        } catch(error: any) {
            console.log('Error faced in Signup ', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
    };

    const contextValue: AuthContextType = {
        isModalOpen,
        initialView,
        openModal,
        closeModal,
        setInitialView,
        user,
        token,
        signIn,
        signUp,
        signOut,
        isLoading
    };

    if (isAppLoading) {
        return null; 
    }

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