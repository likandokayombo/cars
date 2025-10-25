



// "use client";

// import { SetStateAction, useState } from "react";
// import type { ClientUploadedFileData } from "@uploadthing/react";
// import { UploadButton } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
// import { api } from "@/convex/_generated/api";
// import { useMutation } from "convex/react";

// export default function CarAdmin() {
//   const [name, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState<number | "">("");
//   const [pricePerDay, setPricePerDay] = useState<number | "">("");
//   const [fuelType, setFuelType] = useState("");
//   const [transmission, setTransmission] = useState("");
//   const [seats, setSeats] = useState<number | "">("");
//   const [available, setAvailable] = useState(true);
//   const [imageUrl, setImageUrl] = useState("");

//   // ✅ Use useMutation for Convex mutations
//   const addCar = useMutation(api.cars.addCar);

//   const handleAddCar = async () => {
//     if (!name || !brand || !imageUrl) {
//       alert("Please fill in at least name, brand, and upload an image.");
//       return;
//     }

//     try {
//       await addCar({
//         name,
//         brand,
//         model,
//         year: typeof year === "number" ? year : 0,
//         pricePerDay: typeof pricePerDay === "number" ? pricePerDay : 0,
//         fuelType,
//         transmission,
//         seats: typeof seats === "number" ? seats : 0,
//         imageUrl,
//         available,
//       });

//       alert("Car added successfully!");

//       // Clear form
//       setName("");
//       setBrand("");
//       setModel("");
//       setYear("");
//       setPricePerDay("");
//       setFuelType("");
//       setTransmission("");
//       setSeats("");
//       setImageUrl("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add car. Check console for details.");
//     }
//   };

//   const handleNumberInput = (
//     setter: (val: number | "") => void,
//     value: string
//   ) => {
//     setter(value === "" ? "" : Number(value));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
//       <h2 className="text-xl font-bold mb-4">Add a New Car</h2>

//       {/* Text inputs */}
//       {[{ placeholder: "Car Name", value: name, setter: setName },
//         { placeholder: "Brand", value: brand, setter: setBrand },
//         { placeholder: "Model", value: model, setter: setModel },
//         { placeholder: "Fuel Type", value: fuelType, setter: setFuelType },
//         { placeholder: "Transmission", value: transmission, setter: setTransmission },
//       ].map(input => (
//         <input
//           key={input.placeholder}
//           type="text"
//           placeholder={input.placeholder}
//           value={input.value}
//           onChange={e => input.setter(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//         />
//       ))}

//       {/* Number inputs */}
//       {[{ placeholder: "Year", value: year, setter: setYear },
//         { placeholder: "Price per Day", value: pricePerDay, setter: setPricePerDay },
//         { placeholder: "Seats", value: seats, setter: setSeats },
//       ].map(input => (
//         <input
//           key={input.placeholder}
//           type="number"
//           placeholder={input.placeholder}
//           value={input.value}
//           onChange={e => handleNumberInput(input.setter, e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//         />
//       ))}

//       {/* Available selector */}
//       <label className="block mb-2 font-medium">Available</label>
//       <select
//         value={available ? "true" : "false"}
//         onChange={e => setAvailable(e.target.value === "true")}
//         className="w-full border p-2 mb-4 rounded"
//       >
//         <option value="true">Yes</option>
//         <option value="false">No</option>
//       </select>

//       {/* UploadThing button */}
// <UploadButton<OurFileRouter, "imageUploader">
//   endpoint="imageUploader"
//   onClientUploadComplete={(res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
//     setImageUrl(res[0].file.ufsUrl); // <-- actual uploaded file URL
//     alert("Image uploaded successfully!");
//   }}
//   onUploadError={(err: { message: string }) =>
//     alert(`Upload failed: ${err.message}`)
//   }
//   className="mb-4"
// >
//   Upload Car Image
// </UploadButton>


//       <button
//         onClick={handleAddCar}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         Add Car
//       </button>
//     </div>
//   );
// }










// "use client";

// import { SetStateAction, useState } from "react";
// import { UploadButton } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";
// import { api } from "@/convex/_generated/api";
// import { useMutation } from "convex/react";

// // ✅ Create a typed UploadButton
// const ImageUploadButton = createUploadButton<OurFileRouter, "imageUploader">();

// export default function CarAdmin() {
//   const [name, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [model, setModel] = useState("");
//   const [year, setYear] = useState<number | "">("");
//   const [pricePerDay, setPricePerDay] = useState<number | "">("");
//   const [fuelType, setFuelType] = useState("");
//   const [transmission, setTransmission] = useState("");
//   const [seats, setSeats] = useState<number | "">("");
//   const [available, setAvailable] = useState(true);
//   const [imageUrl, setImageUrl] = useState("");

//   // ✅ Use useMutation for Convex
//   const addCar = useMutation(api.cars.addCar);

//   const handleAddCar = async () => {
//     if (!name || !brand || !imageUrl) {
//       alert("Please fill in at least name, brand, and upload an image.");
//       return;
//     }

//     try {
//       await addCar({
//         name,
//         brand,
//         model,
//         year: typeof year === "number" ? year : 0,
//         pricePerDay: typeof pricePerDay === "number" ? pricePerDay : 0,
//         fuelType,
//         transmission,
//         seats: typeof seats === "number" ? seats : 0,
//         imageUrl,
//         available,
//       });

//       alert("Car added successfully!");

//       // Clear form
//       setName("");
//       setBrand("");
//       setModel("");
//       setYear("");
//       setPricePerDay("");
//       setFuelType("");
//       setTransmission("");
//       setSeats("");
//       setImageUrl("");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add car. Check console for details.");
//     }
//   };

//   const handleNumberInput = (
//     setter: (val: number | "") => void,
//     value: string
//   ) => {
//     setter(value === "" ? "" : Number(value));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
//       <h2 className="text-xl font-bold mb-4">Add a New Car</h2>

//       {/* Text inputs */}
//       {[
//         { placeholder: "Car Name", value: name, setter: setName },
//         { placeholder: "Brand", value: brand, setter: setBrand },
//         { placeholder: "Model", value: model, setter: setModel },
//         { placeholder: "Fuel Type", value: fuelType, setter: setFuelType },
//         { placeholder: "Transmission", value: transmission, setter: setTransmission },
//       ].map((input) => (
//         <input
//           key={input.placeholder}
//           type="text"
//           placeholder={input.placeholder}
//           value={input.value}
//           onChange={(e) => input.setter(e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//         />
//       ))}

//       {/* Number inputs */}
//       {[
//         { placeholder: "Year", value: year, setter: setYear },
//         { placeholder: "Price per Day", value: pricePerDay, setter: setPricePerDay },
//         { placeholder: "Seats", value: seats, setter: setSeats },
//       ].map((input) => (
//         <input
//           key={input.placeholder}
//           type="number"
//           placeholder={input.placeholder}
//           value={input.value}
//           onChange={(e) => handleNumberInput(input.setter, e.target.value)}
//           className="w-full border p-2 mb-2 rounded"
//         />
//       ))}

//       {/* Available selector */}
//       <label className="block mb-2 font-medium">Available</label>
//       <select
//         value={available ? "true" : "false"}
//         onChange={(e) => setAvailable(e.target.value === "true")}
//         className="w-full border p-2 mb-4 rounded"
//       >
//         <option value="true">Yes</option>
//         <option value="false">No</option>
//       </select>

//       {/* ✅ UploadThing button */}
//       <ImageUploadButton
//         onClientUploadComplete={(res: { file: { ufsUrl: SetStateAction<string>; }; }[]) => {
//           setImageUrl(res[0].file.ufsUrl);
//           alert("Image uploaded successfully!");
//         }}
//         onUploadError={(err: { message: any; }) => alert(`Upload failed: ${err.message}`)}
//         className="mb-4"
//       />

//       <button
//         onClick={handleAddCar}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         Add Car
//       </button>
//     </div>
//   );
// }


















"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function CarAdmin() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [pricePerDay, setPricePerDay] = useState<number | "">("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seats, setSeats] = useState<number | "">("");
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const addCar = useMutation(api.cars.addCar);

  const handleAddCar = async () => {
    if (!name || !brand || !imageUrl) {
      alert("Please fill in at least name, brand, and upload an image.");
      return;
    }

    try {
      await addCar({
        name,
        brand,
        model,
        year: typeof year === "number" ? year : 0,
        pricePerDay: typeof pricePerDay === "number" ? pricePerDay : 0,
        fuelType,
        transmission,
        seats: typeof seats === "number" ? seats : 0,
        imageUrl,
        available,
      });
      alert("Car added successfully!");
      setName("");
      setBrand("");
      setModel("");
      setYear("");
      setPricePerDay("");
      setFuelType("");
      setTransmission("");
      setSeats("");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      alert("Failed to add car. Check console for details.");
    }
  };

  const handleNumberInput = (
    setter: (val: number | "") => void,
    value: string
  ) => {
    setter(value === "" ? "" : Number(value));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-xl font-bold mb-4">Add a New Car</h2>

      {/* Text inputs */}
      {[
        { placeholder: "Car Name", value: name, setter: setName },
        { placeholder: "Brand", value: brand, setter: setBrand },
        { placeholder: "Model", value: model, setter: setModel },
        { placeholder: "Fuel Type", value: fuelType, setter: setFuelType },
        { placeholder: "Transmission", value: transmission, setter: setTransmission },
      ].map((input) => (
        <input
          key={input.placeholder}
          type="text"
          placeholder={input.placeholder}
          value={input.value}
          onChange={(e) => input.setter(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
      ))}

      {/* Number inputs */}
      {[
        { placeholder: "Year", value: year, setter: setYear },
        { placeholder: "Price per Day", value: pricePerDay, setter: setPricePerDay },
        { placeholder: "Seats", value: seats, setter: setSeats },
      ].map((input) => (
        <input
          key={input.placeholder}
          type="number"
          placeholder={input.placeholder}
          value={input.value}
          onChange={(e) => handleNumberInput(input.setter, e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
      ))}

      {/* Available selector */}
      <label className="block mb-2 font-medium">Available</label>
      <select
        value={available ? "true" : "false"}
        onChange={(e) => setAvailable(e.target.value === "true")}
        className="w-full border p-2 mb-4 rounded"
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      {/* ✅ UploadThing button */}
      <UploadButton<OurFileRouter, "imageUploader">
  endpoint="imageUploader"
  onClientUploadComplete={(res) => {
    // res is ClientUploadedFileData<{ uploadedBy: string }>[]
    setImageUrl(res[0].url); // <-- use res[0].url instead of res[0].file.ufsUrl
    alert("Image uploaded successfully!");
  }}
  onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
  className="mb-4"
/>

      <button
        onClick={handleAddCar}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Car
      </button>
    </div>
  );
}
