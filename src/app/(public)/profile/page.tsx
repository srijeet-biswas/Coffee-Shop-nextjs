"use client";

import { useAuthModal } from "@/src/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Profile() {

    const {user, openModal, setInitialView} = useAuthModal();

    if(!user) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="mb-4 text-3xl font-bold">Please sign in</h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    You must be logged in to view your profile page.
                </p>
                <Button
                onClick={() => {
                    setInitialView("signIn");
                    openModal();
                }}
                size="lg"
                >
                Sign In
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-2xl py-12">
        <h1 className="mb-8 border-b pb-4 text-4xl font-bold">Your Profile</h1>
        <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
            <p className="text-xl font-semibold">{user.name}</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-xl font-semibold">{user.email}</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm font-medium text-muted-foreground">User ID</p>
            <p className="text-xl font-semibold">{user.id}</p>
            </div>
        </div>
        </div>
    );
    
}