"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CarImageUpload from "@/components/CarImageUpload";
import { useUser } from "@clerk/nextjs";

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
    automatic: false,
  });

  const carLogos = [
    "/logos/toyota.png",
    "/logos/bmw.png",
    "/logos/mercedes.png",
    "/logos/audi.png",
  ]; // replace with your own logos in /public/logos

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleLogoSelect = (logo: string) => setCarData({ ...carData, logo });

  const handleSubmit = () => {
    console.log("Final car data:", carData);
    if (onClose) onClose();
    // Here call your Convex mutation to add the car
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-gray-900">
          Rent Car
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Rent Your Car</DialogTitle>
          <DialogDescription>
            {step === 1 && "Choose your car brand"}
            {step === 2 && "Tell us more about your car"}
            {step === 3 && "Add a picture of your car"}
            {step === 4 && "Set pricing & options"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Step 1: Car logo */}
          {step === 1 && (
            <div className="grid grid-cols-4 gap-4">
              {carLogos.map((logo) => (
                <div
                  key={logo}
                  className={`border-2 p-2 rounded cursor-pointer ${carData.logo === logo ? "border-blue-500" : "border-gray-200"}`}
                  onClick={() => handleLogoSelect(logo)}
                >
                  <img src={logo} alt="logo" className="w-full h-16 object-contain" />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Car details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  placeholder="Modal Name"
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
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  placeholder="2025"
                  value={carData.year}
                  onChange={(e) => setCarData({ ...carData, year: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Upload car image */}
          {step === 3 && (
            <CarImageUpload
              imageUrl={carData.imageUrl}
              setImageUrl={(url: any) => setCarData({ ...carData, imageUrl: url })}
            />
          )}

          {/* Step 4: Pricing & options */}
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
            <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
