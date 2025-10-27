

// "use client";

// import { Label } from "@/components/ui/label";
// import { UploadButton } from "@/app/utils/uploadthing";

// interface CarImageUploadProps {
//   imageUrl: string;
//   setImageUrl: (url: string) => void;
// }

// export default function CarImageUpload({ imageUrl, setImageUrl }: CarImageUploadProps) {
//   return (
//     <div>
//       <Label>Car Image</Label>

//       <UploadButton
//         endpoint="imageUploader" // matches your core.ts
//         onClientUploadComplete={(res) => {
//           // res is ClientUploadedFileData<{ uploadedBy: string }>[]
//           if (res && res[0]?.ufsUrl) {
//             setImageUrl(res[0].ufsUrl);
//           }
//         }}
//         onUploadError={(error: Error) => {
//           alert(`Upload failed: ${error.message}`);
//         }}
//       />

//       {imageUrl && (
//         <p className="text-green-600 text-sm mt-1">
//           ✅ Image uploaded successfully!
//         </p>
//       )}
//     </div>
//   );
// }
























"use client";

import { Label } from "@/components/ui/label";
import { UploadButton } from "@/app/utils/uploadthing";

interface CarImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function CarImageUpload({ imageUrl, setImageUrl }: CarImageUploadProps) {
  return (
    <div>
      <Label>Upload Image</Label>

      <UploadButton
        endpoint="imageUploader" // must match your core.ts
        onClientUploadComplete={(res) => {
          // ClientUploadedFileData<{ uploadedBy: string }>[]
          if (res && res[0]?.ufsUrl) {
            setImageUrl(res[0].ufsUrl);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />

      {imageUrl && (
        <p className="text-green-600 text-sm mt-1">
          ✅ Image uploaded successfully!
        </p>
      )}
    </div>
  );
}
