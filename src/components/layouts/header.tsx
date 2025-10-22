"use client";

import Link from "next/link";
import { UserCircleIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the real auth hook
import { useAuthModal } from "@/context/AuthContext";

export default function Header() {
  // Get real auth state and functions from the context
  const { openModal, setInitialView, user, signOut } = useAuthModal();

  // --- Use REAL user state ---
  const isAuthenticated = !!user; // True if 'user' object exists
  const userName = user?.name || "User"; // Get name from user object
  const userImageUrl = ""; // Replace with user.imageUrl if you add it
  // --- End real user state ---

  const handleSignInClick = () => {
    setInitialView("signIn");
    openModal();
  };

  const handleSignUpClick = () => {
    setInitialView("signUp");
    openModal();
  };

  // The signOut function now comes directly from the context
  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="container mx-auto flex items-center justify-between py-4">
      <Link href="/" className="text-2xl font-bold text-red-500">
        zomato
      </Link>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // --- Show Profile Dropdown if authenticated ---
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {userImageUrl ? (
                    <AvatarImage src={userImageUrl} alt={userName} />
                  ) : (
                    <AvatarFallback>
                      {userName ? userName.split(' ').map(n => n[0]).join('') : <UserCircleIcon className="h-5 w-5" />}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email} {/* Display user email */}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 <Link href="/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // --- Show Sign in/Sign up buttons if not authenticated ---
          <>
            <Button onClick={handleSignInClick}>Sign in</Button>
            <Button onClick={handleSignUpClick}>Sign up</Button>
          </>
        )}
      </div>
    </header>
  );
}