

"use client";

import Link from "next/link";

import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import RentalCarModal from "@/components/RentCarModal";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <Link href="/" className="text-lg font-bold text-gray-900">
        Cars
      </Link>

      <div className="flex items-center gap-3">
        {/* Rent Car button */}
        <RentalCarModal />

        {/* Dashboard (signed in only) */}
        <SignedIn>
          <Link href="/dashboard">
            <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-900">
              <span>Dashboard</span>
              <span className="text-xs font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                Free Plan
              </span>
            </Button>
          </Link>

          {/* User avatar */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        {/* Sign In button (signed out only) */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-black text-white hover:bg-gray-900">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
