

"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/app/utils/uploadthing";
import { Button } from "@/components/ui/button";

interface CarImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function CarImageUpload({ imageUrl, setImageUrl }: CarImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (preview && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.src = preview;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw a fancy blurred background
        ctx.filter = "blur(10px) brightness(0.8)";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.filter = "none";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [preview]);

  return (
    <div className="flex flex-col gap-3">
      <Label>Upload Image</Label>

      {!preview ? (
        <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all duration-300">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0]?.ufsUrl) {
                const url = res[0].ufsUrl;
                setPreview(url);
                setImageUrl(url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
          />
          <p className="text-gray-500 text-sm mt-2">📸 Drag or select your car photo</p>
        </div>
      ) : (
        <div className="relative w-full h-60 overflow-hidden rounded-xl shadow-lg">
          {/* Canvas blurred background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
          />
          {/* Foreground image */}
          <img
            src={preview}
            alt="Car Preview"
            className="absolute inset-0 w-full h-full object-contain transition-transform hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 hover:bg-white"
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
