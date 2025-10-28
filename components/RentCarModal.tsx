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

interface RentCarModalProps {
  onClose?: () => void;
}

export default function RentCarModal({ onClose }: RentCarModalProps) {
  const { isSignedIn } = useUser();
  const [step, setStep] = useState(1);

  const [carData, setCarData] = useState({
    logo: "",
    name: "",
    description: "",
    year: "",
    imageUrl: "",
    price: "",
    maxSpeed: "",
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

  const handleSubmit = () => {
    console.log("Final car data:", carData);
    toast.success("Car listed successfully!", {
      description: `${carData.name || "Your car"} has been added to the marketplace.`,
      duration: 3000,
    });
    setTimeout(() => onClose && onClose(), 1500);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-6">
      {[1, 2, 3, 4].map((num, index) => (
        <div key={num} className="flex-1 flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
              ${step >= num ? "bg-black text-white" : "bg-gray-200 text-gray-500"}
              transition-all duration-300`}
          >
            {num}
          </div>
          {index < 3 && (
            <div
              className={`flex-1 h-[2px] ${
                step > num ? "bg-black" : "bg-gray-200"
              } transition-all duration-300`}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-900">Rent Car</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        {!isSignedIn ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-center text-gray-700">You need to sign in to rent your car.</p>
            <SignInButton mode="modal">
              <Button className="bg-black text-white hover:bg-gray-900">Sign In</Button>
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
              {/* Step 1: Car logos */}
              {step === 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {carLogos.map(({ logo, name }) => (
                    <div
                      key={logo}
                      className={`border-2 p-2 rounded cursor-pointer hover:scale-105 transition-transform text-center ${
                        carData.logo === logo ? "border-black" : "border-gray-200"
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

              {/* Step 2: Car details */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Tell us more about the car specifications</p>

                  <div>
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                      id="name"
                      placeholder="Model Name"
                      value={carData.name}
                      onChange={(e) => setCarData({ ...carData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Description of the car"
                      value={carData.description}
                      onChange={(e) => setCarData({ ...carData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="year">Model Year</Label>
                    <Input
                      id="year"
                      placeholder="2025"
                      value={carData.year}
                      onChange={(e) => setCarData({ ...carData, year: e.target.value })}
                    />
                  </div>

                  {/* Seats and Windows */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">How many seats does it have?</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleDecrement("seats")}
                          className="w-8 h-8"
                        >
                          -
                        </Button>
                        <span className="text-gray-700">{carData.seats}</span>
                        <Button
                          variant="outline"
                          onClick={() => handleIncrement("seats")}
                          className="w-8 h-8"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">How many windows does it have?</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleDecrement("windows")}
                          className="w-8 h-8"
                        >
                          -
                        </Button>
                        <span className="text-gray-700">{carData.windows}</span>
                        <Button
                          variant="outline"
                          onClick={() => handleIncrement("windows")}
                          className="w-8 h-8"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Image upload */}
              {step === 3 && (
                <div className="space-y-4">
                  <CarImageUpload
                    imageUrl={carData.imageUrl}
                    setImageUrl={(url: string) => setCarData({ ...carData, imageUrl: url })}
                  />
                </div>
              )}

              {/* Step 4: Pricing */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price per Day</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Price"
                      value={carData.price}
                      onChange={(e) => setCarData({ ...carData, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxSpeed">Max Speed</Label>
                    <Input
                      id="maxSpeed"
                      type="number"
                      placeholder="Max Speed"
                      value={carData.maxSpeed}
                      onChange={(e) => setCarData({ ...carData, maxSpeed: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="automatic"
                      checked={carData.automatic}
                      onChange={(e) => setCarData({ ...carData, automatic: e.target.checked })}
                    />
                    <Label htmlFor="automatic">Automatic Transmission</Label>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
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
