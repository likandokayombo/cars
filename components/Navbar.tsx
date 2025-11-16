"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import RentCarModal from "@/components/RentCarModal";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { user, isSignedIn } = useUser();
  const role = useQuery(
    api.users.getRoleByClerkId,
    isSignedIn && user?.id ? { clerkId: user.id } : "skip"
  ) as string | undefined;
  const isAdmin = role === "ADMIN";

  const existingUser = useQuery(
    api.users.getUserByClerkId,
    isSignedIn && user?.id ? { clerkId: user.id } : "skip"
  );
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;
    if (existingUser === undefined) return; // still loading
    if (existingUser) return; // already exists
    const name =
      user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const email = user.primaryEmailAddress?.emailAddress || "";
    createUser({ clerkId: user.id, name: name || "User", email }).catch(
      () => {}
    );
  }, [isSignedIn, user, existingUser, createUser]);

  const toggleNav = () => setShowMobileNav(prevState => !prevState);
  return (
    <nav className="flex items-center relative h-16 px-6 border-b bg-white/80 backdrop-blur-sm gap-3">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-auto">
        <Image
          src="/images/car.png"
          alt="Cars Logo"
          width={40}
          height={40}
          className="object-contain"
          loading="lazy"
        />
      </Link>

      <Navigations className="hidden sm:flex items-center gap-3" isAdmin={isAdmin} />

      <button className="sm:hidden z-50" onClick={toggleNav}>
        <Menu />
      </button>

      {/* Signed-in user */}
      <SignedIn>
        <span className="text-sm text-gray-700 hidden sm:inline">
          Hello, {user?.firstName || user?.fullName || "there"}
        </span>
        {/* User avatar */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <div className={
        cn("h-screen transition-all w-full sm:hidden fixed top-0 bg-white right-0 z-50 py-8 px-4", showMobileNav ? "right-0" : "-right-full")
      }>
        <div className="flex items-center justify-between">
          <Image
            src="/images/car.png"
            alt="Cars Logo"
            width={40}
            height={40}
            className="object-contain"
            loading="lazy"
          />

          <button onClick={toggleNav}><X/></button>
        </div>

        <Navigations className="flex flex-col gap-3 pt-20" isAdmin={isAdmin}/>
      </div>
    </nav>
  );
}


function Navigations({className, isAdmin}:{className?: string, isAdmin: boolean}){
  return(
    <div className={className}>
        {/* Admin (visible for admins) */}
        {isAdmin && (
          <Link href="/admin" className="max-sm:block">
            <Button className="max-sm:w-full" variant="outline">Admin</Button>
          </Link>
        )}

        {/* Rent Car button */}
        <RentCarModal />

        {/* Sign In button (signed out only) */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-black text-white hover:bg-gray-900">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
  )
}