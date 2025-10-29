// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface CarDetailsModalProps {
//   car: any; // your car type
// }

// export default function CarDetailsModal({ car }: CarDetailsModalProps) {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div className="cursor-pointer hover:shadow-lg transition-shadow rounded-lg p-2 border">
//           <Image
//             src={car.imageUrl || "/images/default-car.png"}
//             alt={car.name}
//             width={250}
//             height={150}
//             className="object-cover rounded-lg"
//           />
//           <h3 className="mt-2 font-semibold text-gray-900">{car.name}</h3>
//         </div>
//       </DialogTrigger>

//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>{car.name}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 mt-4">
//           <Image
//             src={car.imageUrl || "/images/default-car.png"}
//             alt={car.name}
//             width={400}
//             height={250}
//             className="object-cover rounded-lg"
//           />
//           <p className="text-gray-600">{car.description}</p>
//           <div className="flex justify-between text-gray-700">
//             <span>Year: {car.year}</span>
//             <span>Price/Day: ${car.price}</span>
//           </div>
//           <div className="flex justify-between text-gray-700">
//             <span>Seats: {car.seats || "-"}</span>
//             <span>Windows: {car.windows || "-"}</span>
//           </div>
//           <div className="text-gray-700">Max Speed: {car.maxSpeed || "-"}</div>
//           <div className="text-gray-700">Transmission: {car.automatic ? "Automatic" : "Manual"}</div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <Button onClick={() => {}}>Close</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }





"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CarDetailsModalProps {
  car: {
    _id: string;
    name: string;
    brand: string;
    imageUrl: string;
    pricePerDay: number;
    available: boolean;
    description?: string;
    year?: string;
    seats?: number;
    windows?: number;
    maxSpeed?: string;
    automatic?: boolean;
  };
}

export default function CarDetailsModal({ car }: CarDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:shadow-lg transition-shadow rounded-lg p-2 border">
          <Image
            src={car.imageUrl || "/placeholder-car.jpg"}
            alt={car.name}
            width={400}
            height={250}
            className="object-cover rounded-lg w-full h-64"
          />
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{car.name}</h3>
            <p className="text-gray-500">{car.brand}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{car.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Image
            src={car.imageUrl || "/placeholder-car.jpg"}
            alt={car.name}
            width={400}
            height={250}
            className="object-cover rounded-lg"
          />
          {car.description && <p className="text-gray-600">{car.description}</p>}
          <div className="flex justify-between text-gray-700">
            {car.year && <span>Year: {car.year}</span>}
            <span>Price/Day: ${car.pricePerDay}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Seats: {car.seats ?? "-"}</span>
            <span>Windows: {car.windows ?? "-"}</span>
          </div>
          {car.maxSpeed && <div className="text-gray-700">Max Speed: {car.maxSpeed}</div>}
          {car.automatic !== undefined && (
            <div className="text-gray-700">Transmission: {car.automatic ? "Automatic" : "Manual"}</div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => {}}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
