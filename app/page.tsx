// "use client";

// import Image from "next/image";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

// // Define a clear Car type
// type Car = {
//   _id: string;
//   name: string;
//   brand: string;
//   imageUrl: string;
//   pricePerDay: number;
// };

// export default function Home() {
//   const cars = useQuery(api.cars.getCars);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {cars?.map((car: Car) => (
//         <div key={car._id} className="border p-4 rounded-md w-full max-w-md">
//           <Image
//             src={car.imageUrl || "/placeholder-car.jpg"}
//             alt={car.name || "Car image"}
//             width={300}
//             height={200}
//             className="rounded-md object-cover"
//           />
//           <h2 className="text-lg font-semibold mt-2">{car.name}</h2>
//           <p className="text-gray-500">{car.brand}</p>
//           <p className="text-blue-600 font-semibold">${car.pricePerDay}/day</p>
//         </div>
//       ))}
//     </main>
//   );
// }



"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Car = {
  _id: string;
  name: string;
  brand: string;
  imageUrl: string;
  pricePerDay: number;
  available: boolean;
};

export default function Home() {
  // Fetch all cars from Convex
  const cars = useQuery(api.cars.getAvailableCars);

  if (!cars) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading cars...
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        No cars available at the moment.
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-8 gap-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cars.map((car: Car) => (
          <div
            key={car._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white"
          >
            <Image
              src={car.imageUrl || "/placeholder-car.jpg"}
              alt={car.name || "Car image"}
              width={400}
              height={250}
              className="object-cover w-full h-64"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-gray-500">{car.brand}</p>
              <p className="text-blue-600 font-bold mt-2">${car.pricePerDay}/day</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
