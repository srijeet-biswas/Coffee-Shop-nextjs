"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

// import { useAuthModal } from "@/context/AuthContext"; // Assuming this is correct

export default function Header() {
  // const { openModal, setInitialView } = useAuthModal();

  // const handleSignInClick = () => {
  //     console.log('handleClick signIn');
  //     // setInitialView('signIn');
  //     // openModal();
  // };

  const handleSignUpClick = () => {
    console.warn("handleClick signUp");
    // setInitialView('signUp');
    // openModal();
  };

  return (
    <header className="container mx-auto flex items-center justify-between py-4">
      <Link href="/" className="text-2xl font-bold text-red-500">
        zomato
      </Link>
      <div className="flex items-center gap-4">
        {/* Semicolon removed from this line */}
        <button onClick={() => alert("Clicked!")}>Click Me</button>

        {/* This button's functionality depends on the Button component's implementation */}
        <Button onClick={handleSignUpClick}>Sign up</Button>
      </div>
    </header>
  );
}
