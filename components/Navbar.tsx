


"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import RentCarModal from "@/components/RentCarModal";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/car.png" 
          alt="Cars Logo"
          width={40}
          height={40}
          className="object-contain"
          loading="lazy" 
        />
        
      </Link>

      <div className="flex items-center gap-3">
        {/* Rent Car button */}
        <RentCarModal />

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
