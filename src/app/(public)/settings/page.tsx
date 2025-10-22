"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthModal } from "@/context/AuthContext";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const { user, openModal, setInitialView, isLoading } = useAuthModal(); // Added isLoading
  const { theme, setTheme } = useTheme();

  // State for the profile form (pre-fill with user's name)
  const [name, setName] = useState(user?.name || "");

  // State for the password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // This is required for the theme toggle to work correctly without a hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Show a sign-in prompt if the user isn't logged in
  if (!user) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Please Sign In</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          You must be logged in to manage your account settings.
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

  // Prevents hydration mismatch on the theme toggle
  if (!mounted) {
    return null; // or return a skeleton loader
  }

  // Handle profile form submission (placeholder)
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to update the user's name
    console.log("Updating name to:", name);
    // You'd probably show a toast notification on success
  };

  // Handle password change form submission (placeholder)
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.error("New passwords do not match!");
      // Here you would show a toast error
      return;
    }
    // In a real app, you would call an API endpoint
    console.log("Changing password...", { currentPassword, newPassword });
    // Reset fields on success
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Show the user's settings
  return (
    <div className="container mx-auto max-w-2xl py-12">
      <h1 className="mb-8 border-b pb-4 text-4xl font-bold">
        Account Settings
      </h1>
      <div className="space-y-8">
        {/* --- Profile Settings --- */}
        <Card>
          <form onSubmit={handleProfileUpdate}>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information. Your email cannot be changed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* --- Security / Change Password --- */}
        <Card>
          <form onSubmit={handlePasswordChange}>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Change Password"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* --- Appearance Settings --- */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose how the application looks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={theme} onValueChange={setTheme}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="light">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </TabsTrigger>
                <TabsTrigger value="dark">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </TabsTrigger>
                <TabsTrigger value="system">
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* --- Danger Zone --- */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions related to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
            <p className="mt-2 text-sm text-muted-foreground">
              This action is permanent and cannot be undone.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}