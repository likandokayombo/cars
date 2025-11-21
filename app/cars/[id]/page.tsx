


"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { Calendar } from "@/components/ui/calendar";

type Car = {
  _id: Id<"cars">;
  name: string;
  brand: string;
  model?: string;
  description?: string;
  year?: number;
  seats?: number;
  maxSpeed?: number;
  automatic?: boolean;
  pricePerDay: number;
  imageUrl?: string;
};

export default function CarDetailsPage() {
  const { id } = useParams();

  const carArgs = id ? { carId: id as Id<"cars"> } : "skip";
  const car = useQuery(api.carFunctions.getCarById, carArgs) as Car | undefined;

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading car details...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 sm:px-8 py-8 gap-6 min-h-screen bg-gray-50">
      <Link href="/" className="self-start text-orange-500 hover:underline">
        ← Back to Cars
      </Link>

      {/* 🚗 Car Card */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow overflow-hidden">
        <div className="relative w-full aspect-video">
          <Image
            src={car.imageUrl || "/placeholder-car.jpg"}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 sm:p-6 space-y-2 sm:space-y-4">
          <h1 className="text-xl sm:text-3xl font-bold">{car.name}</h1>
          <p className="text-gray-500">
            {car.brand} {car.model && `- ${car.model}`}
          </p>
          {car.description && <p className="text-gray-500">{car.description}</p>}

          <div className="flex flex-wrap gap-4 text-gray-700">
            {car.year && <p><strong>Year:</strong> {car.year}</p>}
            {car.seats && <p><strong>Seats:</strong> {car.seats}</p>}
            {car.maxSpeed && <p><strong>Max Speed:</strong> {car.maxSpeed} km/h</p>}
            {car.automatic !== undefined && (
              <p><strong>Automatic:</strong> {car.automatic ? "Yes" : "No"}</p>
            )}
          </div>

          <p className="text-orange-500 font-bold text-lg sm:text-xl">
            ${car.pricePerDay}/day
          </p>
        </div>
      </div>

      {/* 🗓️ Calendar Card (always below) */}
      <div className="max-w-4xl w-full flex flex-col items-center p-4 sm:p-6">
  <h2 className="font-semibold mb-4 text-lg text-center">Select Rental Date</h2>
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
     />
  </div>
    </main>
  );
}
