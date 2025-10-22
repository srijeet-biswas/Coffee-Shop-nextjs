"use client";

import { useAuthModal } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function Orders() {
    const { user, openModal, setInitialView } = useAuthModal();

  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Please Sign In</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          You must be logged in to view your past orders.
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
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="mb-8 border-b pb-4 text-4xl font-bold">Your Orders</h1>

      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-card p-12 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-semibold">
          You have no past orders
        </h2>
        <p className="mt-2 text-muted-foreground">
          When you place an order, it will appear here.
        </p>
      </div>
    </div>
  );
}