"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/context/AuthContext"; // Adjust path as needed

export default function Header() {
    const { openModal, setInitialView } = useAuthModal();

    const handleSignInClick = () => {
        setInitialView('signIn');
        openModal();
    };

    const handleSignUpClick = () => {
        setInitialView('signUp');
        openModal();
    };

    return (
        <header className="container mx-auto flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-red-500">
                zomato
            </Link>
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={handleSignInClick}>
                    Log in
                </Button>
                <Button onClick={handleSignUpClick}>
                    Sign up
                </Button>
            </div>
        </header>
    );
}