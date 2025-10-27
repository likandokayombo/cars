

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Navbar from "@/components/Navbar";

// Load IBM Plex Mono fonts
const IBMPlexMonoBold = localFont({
  src: "./fonts/IBMPlexMono-Bold.ttf",
  variable: "--font-imb-bold",
  display: "swap",
});
const IBMPlexMonoMedium = localFont({
  src: "./fonts/IBMPlexMono-Medium.ttf",
  variable: "--font-imb-medium",
  display: "swap",
});
const IBMPlexMonoRegular = localFont({
  src: "./fonts/IBMPlexMono-Regular.ttf",
  variable: "--font-imb-regular",
  display: "swap",
});

// Combine all font variables
const combinedFonts = `${IBMPlexMonoBold.variable} ${IBMPlexMonoMedium.variable} ${IBMPlexMonoRegular.variable}`;

export const metadata: Metadata = {
  title: "Cars",
  description: "Car renting web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={combinedFonts}>
      <body className="antialiased">
        <ClerkProvider>
          <ConvexClientProvider>
            {/* Navbar always visible */}
            <Navbar />

            {/* App content */}
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
