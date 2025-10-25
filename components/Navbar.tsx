

// "use client";

// import Link from "next/link";
// import {
//   SignUpButton,
//   SignedOut,
//   SignedIn,
//   UserButton,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   return (
//     <nav className="flex justify-between items-center h-16 px-6 border-b bg-white/80 backdrop-blur-sm">
//       {/* Logo */}
//       <Link href="/" className="text-lg font-bold text-gray-900">
//         Cars
//       </Link>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Signed out view */}
//         <SignedOut>
//           <SignUpButton mode="modal">
//             <Button variant="default">Sign In</Button>
//           </SignUpButton>
//         </SignedOut>

//         {/* Signed in view */}
//         <SignedIn>
//           {/* Dashboard Button */}
//           <Link href="/dashboard">
//             <Button
//               variant="default"
//               size="sm"
//               className="flex items-center gap-2 bg-black text-white hover:bg-gray-900"
//             >
//               <span>Dashboard</span>
//               <span className="text-xs font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
//                 Free Plan
//               </span>
//             </Button>
//           </Link>

//           {/* User avatar */}
//           <UserButton afterSignOutUrl="/" />
//         </SignedIn>
//       </div>
//     </nav>
//   );
// }














"use client";

import Link from "next/link";
import {
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <Link href="/" className="text-lg font-bold text-gray-900">
        Cars
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Signed out view */}
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>

        {/* Signed in view */}
        <SignedIn>
          {/* Dashboard Button */}
          <Link href="/dashboard">
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 bg-black text-white hover:bg-gray-900"
            >
              <span>Dashboard</span>
              <span className="text-xs font-medium bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                Free Plan
              </span>
            </Button>
          </Link>

          {/* User avatar */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
