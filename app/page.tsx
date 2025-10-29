

"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type CarFromConvex = {
  _id: string;
  _creationTime: number;
  name: string;
  brand: string;
  model?: string;
  year?: number;
  description?: string;
  seats?: number;
  windows?: number;
  maxSpeed?: string;
  automatic?: boolean;
  pricePerDay: number;
  imageUrl?: string;
  logoUrl?: string;
  available: boolean;
};

export default function Home() {
  // ✅ Updated namespace from 'cars' → 'carFunctions'
  const cars = useQuery(api.carFunctions.getAvailableCars);

  if (!cars)
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading cars...
      </div>
    );

  if (cars.length === 0)
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        No cars available at the moment.
      </div>
    );

  return (
    <main className="flex flex-col items-center p-8 gap-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {cars.map((car: CarFromConvex) => (
          <Link
            key={car._id}
            href={`/cars/${car._id}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white"
          >
            <div className="relative w-full h-64">
              <Image
                src={car.imageUrl || car.logoUrl || "/placeholder-car.jpg"}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-gray-500">{car.brand}</p>
              <p className="text-blue-600 font-bold mt-2">${car.pricePerDay}/day</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
