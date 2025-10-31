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
import { useEffect } from "react";

export default function Navbar() {
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
        {/* Admin (visible for admins) */}
        {isAdmin && (
          <Link href="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        )}

        {/* Rent Car button */}
        <RentCarModal />

        {/* Signed-in user */}
        <SignedIn>
          <span className="text-sm text-gray-700">
            Hello, {user?.firstName || user?.fullName || "there"}
          </span>
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
