"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CarImageUpload from "@/components/CarImageUpload";
import { useUser, SignInButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

interface RentCarModalProps {
  onClose?: () => void;
}

export default function RentCarModal({ onClose }: RentCarModalProps) {
  const { isSignedIn, user } = useUser();
  const [step, setStep] = useState(1);

  // ✅ Use Convex mutation
  const addCar = useMutation(api.carFunctions.addCar);

  const [carData, setCarData] = useState({
    logo: "",
    name: "",
    description: "",
    model: "",
    year: "",
    imageUrl: "",
    price: "",
    seats: 4,
    windows: 4,
    automatic: false,
  });

  const carLogos = [
    { name: "Toyota", logo: "/images/toyota-logo.png" },
    { name: "BMW", logo: "/images/bmw-logo.png" },
    { name: "Mercedes", logo: "/images/Mercedes.png" },
    { name: "Audi", logo: "/images/audi.png" },
    { name: "Peugeot", logo: "/images/peugeot-logo.png" },
    { name: "Lamborghini", logo: "/images/lamborghini-logo.png" },
    { name: "Volkswagen", logo: "/images/volkswagen-logo.png" },
    { name: "Suzuki", logo: "/images/suzuki-logo.png" },
    { name: "Mitsubishi", logo: "/images/mitsubishi-logo.png" },
    { name: "Nissan", logo: "/images/nissan-logo.png" },
    { name: "Tesla", logo: "/images/tesla-logo.png" },
    { name: "Kia", logo: "/images/kia-logo.png" },
    { name: "Honda", logo: "/images/honda.png" },
    { name: "Ford", logo: "/images/ford-logo.png" },
    { name: "Chevrolet", logo: "/images/chevrolet-logo.png" },
    { name: "Ferrari", logo: "/images/ferrari-logo.png" },
    { name: "Cadillac", logo: "/images/cadillac-logo.png" },
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleLogoSelect = (logo: string, name: string) =>
    setCarData({ ...carData, logo, name });

  const handleIncrement = (field: "seats" | "windows") =>
    setCarData((prev) => ({ ...prev, [field]: prev[field] + 1 }));

  const handleDecrement = (field: "seats" | "windows") =>
    setCarData((prev) => ({ ...prev, [field]: Math.max(prev[field] - 1, 0) }));

  const handleSubmit = async () => {
    if (!carData.name || !carData.imageUrl) {
      toast.error("Please provide at least a car name and image.");
      return;
    }

    const carToAdd = {
      name: carData.name,
      brand: carData.logo || carData.name,
      model: carData.model || "",
      year: Number(carData.year) || 0,
      pricePerDay: Number(carData.price) || 0,
      fuelType: "Petrol",
      transmission: carData.automatic ? "Automatic" : "Manual",
      seats: carData.seats,
      imageUrl: carData.imageUrl,
      logoUrl: carData.logo || undefined,
      available: true,
      description: carData.description || undefined,
      location: "",
      ownerClerkId: user?.id,
    };

    try {
      await addCar(carToAdd);
      toast.success("Car listed successfully!", {
        description: `${carData.name} has been added to the marketplace.`,
        duration: 3000,
      });
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car. Please try again.");
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-9 mb-6">
      {[1, 2, 3, 4].map(num => (
          <div
            key={num}
            className={cn("w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold",
              step >= num ? "bg-black text-white" : "bg-gray-200 text-gray-500",
              "transition-all duration-300 relative",
              "after:content-[''] after:h-0.5 after:block after:w-9 after:absolute after:top-1/2 after:left-8 last:after:hidden",
              step > num ? "after:bg-black" : "after:bg-gray-200"
            )}
          >
            {num}
          </div>
      ))}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-900">
          Rent your car
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[600px] max-sm:overflow-y-scroll w-11/12">
        {!isSignedIn ? (
          <div className="flex flex-col items-center justify-center p-5 sm:py-10">
            <p className="mb-4 text-center text-gray-700">
              You need to sign in to rent your car.
            </p>
            <SignInButton mode="modal">
              <Button className="bg-black text-white hover:bg-gray-900">
                Sign In
              </Button>
            </SignInButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Rent Your Car</DialogTitle>
              <DialogDescription>
                {step === 1 && "Choose your car brand"}
                {step === 2 && "Tell us more about your car specifications"}
                {step === 3 && "Add a picture of your car"}
                {step === 4 && "Set pricing & options"}
              </DialogDescription>
            </DialogHeader>

            <StepIndicator />

            <div className="mt-2 space-y-4">
              {step === 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {carLogos.map(({ logo, name }) => (
                    <div
                      key={logo}
                      className={`border-2 p-1 sm:p-2 rounded cursor-pointer hover:scale-105 transition-transform text-center ${
                        carData.logo === logo
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleLogoSelect(logo, name)}
                    >
                      <Image
                        src={logo}
                        alt={`${name} logo`}
                        width={80}
                        height={80}
                        className="object-contain w-full h-16 mx-auto"
                        loading="lazy"
                      />
                      <p className="text-xs mt-1 text-gray-600">{name}</p>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Label htmlFor="name">Car Name</Label>
                  <Input
                    id="name"
                    placeholder="Model Name"
                    value={carData.name}
                    onChange={(e) =>
                      setCarData({ ...carData, name: e.target.value })
                    }
                  />

                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Description"
                    value={carData.description}
                    onChange={(e) =>
                      setCarData({ ...carData, description: e.target.value })
                    }
                  />

                  <Label htmlFor="year">Model Year</Label>
                  <Input
                    id="year"
                    placeholder="2025"
                    value={carData.year}
                    onChange={(e) =>
                      setCarData({ ...carData, year: e.target.value })
                    }
                  />

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Seats</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleDecrement("seats")}
                        >
                          -
                        </Button>
                        <span>{carData.seats}</span>
                        <Button
                          variant="outline"
                          onClick={() => handleIncrement("seats")}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <CarImageUpload
                  imageUrl={carData.imageUrl}
                  setImageUrl={(url: string) =>
                    setCarData({ ...carData, imageUrl: url })
                  }
                />
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <Label htmlFor="price">Price per Day</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={carData.price}
                    onChange={(e) =>
                      setCarData({ ...carData, price: e.target.value })
                    }
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="automatic"
                      checked={carData.automatic}
                      onChange={(e) =>
                        setCarData({ ...carData, automatic: e.target.checked })
                      }
                    />
                    <Label htmlFor="automatic">Automatic Transmission</Label>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button onClick={nextStep}>Next</Button>
              ) : (
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
