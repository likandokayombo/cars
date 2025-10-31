"use client";

import { useState } from "react";
import ConvexUpload from "@/components/ConvexUpload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Plus } from "lucide-react";

interface CarImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function CarImageUpload({
  imageUrl,
  setImageUrl,
}: CarImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  return (
    <div className="flex flex-col gap-3">
      <Label className="font-medium text-gray-700">Upload Image</Label>

      {!preview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all duration-300 text-center">
          {/* Upload Icon */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-orange-600" />
            </div>
            <div className="absolute bottom-1 right-1 bg-orange-500 rounded-full p-1 border-2 border-white">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Instructional Text */}
          <p className="text-gray-500 text-sm">
            Drop your images here <br /> or click below to browse
          </p>

          {/* Upload Button (Convex) */}
          <div className="mt-4">
            <ConvexUpload
              onUploaded={({ url }) => {
                setPreview(url);
                setImageUrl(url);
              }}
              accept="image/*"
              label="Upload image"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-lg group">
          <img
            src={preview}
            alt="Car Preview"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => {
                setPreview(null);
                setImageUrl("");
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
