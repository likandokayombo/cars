"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ConvexUploadProps {
  onUploaded: (args: { storageId: string; url: string }) => void;
  accept?: string;
  label?: string;
}

/**
 * @notice Reusable client-side uploader backed by Convex Storage.
 * @dev Requests an upload URL from Convex, uploads bytes, persists metadata, returns URL.
 * @param onUploaded Callback invoked with { storageId, url } after a successful upload.
 * @param accept Optional input accept attribute (default: image/*).
 * @param label Optional button label (default: Upload).
 * @author tinotendajoe01
 */
export default function ConvexUpload({
  onUploaded,
  accept = "image/*",
  label = "Upload",
}: ConvexUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const saveUploadedFile = useMutation(api.uploads.saveUploadedFile);

  /**
   * @notice Handle file selection + upload pipeline.
   * @dev 1) get upload URL, 2) POST bytes to Convex, 3) save metadata + get URL.
   * @param file The selected File from the input element.
   * @author tinotendajoe01
   */
  const handleFileChange = async (file?: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const { url } = await generateUploadUrl({});
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");
      const json = (await result.json()) as { storageId: string };

      // After Convex stores the file, save and retrieve a public URL for UI usage.
      // Pass filename as alt if available.
      const saved = await saveUploadedFile({
        storageId: json.storageId,
        alt: file.name || undefined,
      });
      onUploaded({ storageId: json.storageId, url: saved.url });
      toast.success("Uploaded successfully");
    } catch (e: any) {
      toast.error(e?.message || "Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || undefined)}
        disabled={isUploading}
      />
      <Button type="button" disabled className="pointer-events-none">
        {isUploading ? "Uploading..." : label}
      </Button>
    </div>
  );
}
