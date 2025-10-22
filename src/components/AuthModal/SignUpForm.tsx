// components/AuthModal/SignUpForm.tsx

import React, { useState } from 'react';

// Define the props for SignUpForm
interface SignUpFormProps {
    switchView: () => void; // Function to switch to the SignIn view
    closeModal: () => void; // Function to close the entire modal
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ switchView, closeModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!'); // Basic client-side validation
            return;
        }
        if (!agreedToTerms) {
            alert('You must agree to the Terms of Service and Privacy Policy.');
            return;
        }
        // Here you would typically send the registration data to your API
        //console.log('Signing Up with:', { name, email, password });
        // After successful registration, close the modal (or navigate to a dashboard)
        closeModal();
        // In a real app, handle loading, errors, and actual user session management
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input (Optional) */}
            <div>
                <label htmlFor="signUpName" className="block text-sm font-medium text-gray-300">
                    Full Name (optional)
                </label>
                <div className="mt-1">
                    <input
                        id="signUpName"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                        placeholder="John Doe"
                    />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-300">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="signUpEmail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label htmlFor="signUpPassword" className="block text-sm font-medium text-gray-300">
                    Password
                </label>
                <div className="mt-1 relative">
                    <input
                        id="signUpPassword"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full pr-10 px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white focus:outline-none"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                         {showPassword ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.006-.03A6.5 6.5 0 0112 10.5a6.478 6.478 0 01-5.027 2.113M15 9.153a4.5 4.5 0 00-4.5-4.5V9.153c0 1.25-.457 2.441-1.282 3.328m7.027 3.003V16.5a6.5 6.5 0 01-4.787 3.256M12 19l4.586-4.586M17.414 12L21 15.586M2 2L22 22" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Confirm Password Input */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm Password
                </label>
                <div className="mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'} // Use same visibility toggle as main password
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="appearance-none block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-center">
                <input
                    id="termsAndPrivacy"
                    name="termsAndPrivacy"
                    type="checkbox"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
                <label htmlFor="termsAndPrivacy" className="ml-2 block text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                        Privacy Policy
                    </a>
                </label>
            </div>

            {/* Sign Up Button */}
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-opacity-90"
                >
                    Sign Up
                </button>
            </div>

            {/* Social Login / Separator (similar to SignInForm) */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Google Sign Up */}
                <div>
                    <a
                        href="#"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <span className="sr-only">Sign up with Google</span>
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.482 11.231H12v2.32H16.5c-.246 1.488-1.574 2.766-3.832 2.766-3.791 0-6.884-3.093-6.884-6.884s3.093-6.884 6.884-6.884c2.059 0 3.693.896 4.542 1.744L17.7 7.07c-.63-.585-1.78-.9-2.738-.9-2.454 0-4.444 1.99-4.444 4.444s1.99 4.444 4.444 4.444c2.454 0 3.968-1.68 4.214-3.698H12.482z" />
                        </svg>
                        Google
                    </a>
                </div>

                {/* Facebook Sign Up */}
                <div>
                    <a
                        href="#"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <span className="sr-only">Sign up with Facebook</span>
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.502 1.492-3.893 3.776-3.893 1.094 0 2.24.195 2.24.195v2.453H15.83c-1.213 0-1.585.758-1.585 1.54V12h3.06l-.493 3.013h-2.567v6.987C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                        Facebook
                    </a>
                </div>
            </div>

            {/* Switch to Sign In */}
            <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                    Already a member?{' '}
                    <button type="button" onClick={switchView} className="font-medium text-blue-400 hover:text-blue-300">
                        Sign In
                    </button>
                </p>
            </div>
        </form>
    );
};