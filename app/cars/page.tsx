
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function CarDetailsPage() {
  const { id } = useParams();

  const carArgs = id ? { carId: id as Id<"cars"> } : "skip";
  const car = useQuery(api.carFunctions.getCarById, carArgs) as any;

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading car details...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-8 gap-6 min-h-screen bg-gray-50">
      <Link href="/cars" className="self-start text-blue-600 hover:underline">
        ← Back to Cars
      </Link>

      <div className="max-w-4xl w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="relative w-full h-96">
          <Image
            src={car.imageUrl || "/placeholder-car.jpg"}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <p className="text-gray-500">{car.brand} {car.model && `- ${car.model}`}</p>
          {car.description && <p className="text-gray-500">{car.description}</p>}

          <div className="flex flex-wrap gap-4 text-gray-700">
            {car.year && <p><strong>Year:</strong> {car.year}</p>}
            {car.seats && <p><strong>Seats:</strong> {car.seats}</p>}
            {car.maxSpeed && <p><strong>Max Speed:</strong> {car.maxSpeed} km/h</p>}
            {car.automatic !== undefined && (
              <p><strong>Automatic:</strong> {car.automatic ? "Yes" : "No"}</p>
            )}
          </div>

          <p className="text-blue-600 font-bold text-xl">${car.pricePerDay}/day</p>
        </div>
      </div>
    </main>
  );
}
