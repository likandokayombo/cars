"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ConvexUpload from "@/components/ConvexUpload";
import { toast } from "sonner";

type Car = {
  _id: Id<"cars">;
  name: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  fuelType: string;
  transmission: string;
  seats: number;
  imageUrl: string;
  logoUrl?: string;
  available: boolean;
  description?: string;
  location?: string;
};

/**
 * @notice Admin panel with Cars and Users management.
 * @dev Tabs: list/create cars; list users with promote/demote/delete and per-user cars.
 * @author tinotendajoe01
 */
export default function AdminPage() {
  const cars = useQuery(api.carFunctions.getCars) as Car[] | undefined;
  const addCar = useMutation(api.carFunctions.addCar);
  const updateCar = useMutation(api.carFunctions.updateCar);
  const deleteCar = useMutation(api.carFunctions.deleteCar);

  const [tab, setTab] = useState<"list" | "create" | "users">("list");
  const users = useQuery(api.users.listUsers) as
    | Array<{ clerkId: string; name: string; email: string; role?: string }>
    | undefined;
  const setRole = useMutation(api.users.setRole);
  const removeUser = useMutation(api.users.deleteUser);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 4,
    imageUrl: "",
    logoUrl: "",
    available: true,
    description: "",
    location: "",
  });

  const handleCreate = async () => {
    if (!form.name || !form.imageUrl) {
      toast.error("Name and image are required");
      return;
    }
    try {
      await addCar({
        name: form.name,
        brand: form.brand || form.name,
        model: form.model,
        year: Number(form.year) || 0,
        pricePerDay: Number(form.pricePerDay) || 0,
        fuelType: form.fuelType,
        transmission: form.transmission,
        seats: Number(form.seats) || 4,
        imageUrl: form.imageUrl,
        logoUrl: form.logoUrl || undefined,
        available: form.available,
        description: form.description || undefined,
        location: form.location || undefined,
      });
      toast.success("Car created");
      setTab("list");
    } catch (e: any) {
      toast.error(String(e?.message || "Failed to create"));
    }
  };

  const handleDelete = async (carId: Id<"cars">) => {
    try {
      await deleteCar({ carId });
      toast.success("Car deleted");
    } catch (e: any) {
      toast.error(String(e?.message || "Delete failed"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      <SignedOut>
        <div className="border p-6 rounded-md">
          <p className="mb-3">Sign in to access admin panel</p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="mb-6 flex gap-2">
          <Button
            variant={tab === "list" ? "default" : "outline"}
            onClick={() => setTab("list")}
          >
            Cars
          </Button>
          <Button
            variant={tab === "create" ? "default" : "outline"}
            onClick={() => setTab("create")}
          >
            Create
          </Button>
          <Button
            variant={tab === "users" ? "default" : "outline"}
            onClick={() => setTab("users")}
          >
            Users
          </Button>
        </div>

        {tab === "list" && (
          <div className="border rounded-md divide-y">
            {!cars && <div className="p-4">Loading...</div>}
            {cars && cars.length === 0 && <div className="p-4">No cars</div>}
            {cars &&
              cars.map((c) => (
                <div
                  key={c._id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-500">
                        {c.brand} • ${c.pricePerDay}/day
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateCar({
                          carId: c._id,
                          data: { available: !c.available },
                        })
                      }
                    >
                      {c.available ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {tab === "create" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pricePerDay">Price/Day</Label>
                  <Input
                    id="pricePerDay"
                    value={form.pricePerDay}
                    onChange={(e) =>
                      setForm({ ...form, pricePerDay: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="seats">Seats</Label>
                  <Input
                    id="seats"
                    value={String(form.seats)}
                    onChange={(e) =>
                      setForm({ ...form, seats: Number(e.target.value || 4) })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="fuel">Fuel</Label>
                  <Input
                    id="fuel"
                    value={form.fuelType}
                    onChange={(e) =>
                      setForm({ ...form, fuelType: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="trans">Transmission</Label>
                  <Input
                    id="trans"
                    value={form.transmission}
                    onChange={(e) =>
                      setForm({ ...form, transmission: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Input
                  id="desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label>Image</Label>
              <ConvexUpload
                onUploaded={({ url }) => setForm({ ...form, imageUrl: url })}
                accept="image/*"
                label="Upload image"
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt={form.name}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <div className="pt-2">
                <Button onClick={handleCreate}>Create Car</Button>
              </div>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="border rounded-md divide-y">
            {!users && <div className="p-4">Loading...</div>}
            {users && users.length === 0 && <div className="p-4">No users</div>}
            {users &&
              users.map((u) => (
                <UserRow
                  key={u.clerkId}
                  u={u}
                  isExpanded={expandedUser === u.clerkId}
                  onToggle={() =>
                    setExpandedUser(
                      expandedUser === u.clerkId ? null : u.clerkId
                    )
                  }
                  setRole={setRole}
                  removeUser={removeUser}
                  updateCar={updateCar}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        )}
      </SignedIn>
    </div>
  );
}

/**
 * @notice Row for a single user in admin users tab.
 * @dev Loads cars lazily when expanded; allows role changes and deletion.
 * @author tinotendajoe01
 */
function UserRow({
  u,
  isExpanded,
  onToggle,
  setRole,
  removeUser,
  updateCar,
  handleDelete,
}: {
  u: { clerkId: string; name: string; email: string; role?: string };
  isExpanded: boolean;
  onToggle: () => void;
  setRole: ReturnType<typeof useMutation<typeof api.users.setRole>>;
  removeUser: ReturnType<typeof useMutation<typeof api.users.deleteUser>>;
  updateCar: ReturnType<typeof useMutation<typeof api.carFunctions.updateCar>>;
  handleDelete: (carId: Id<"cars">) => Promise<void>;
}) {
  const isAdmin = (u.role || "USER") === "ADMIN";
  const carsByUser = useQuery(
    api.carFunctions.getCarsByOwnerClerkId,
    isExpanded ? { clerkId: u.clerkId } : "skip"
  ) as Car[] | undefined;

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{u.name || u.email}</div>
          <div className="text-sm text-gray-500">
            {u.email} • {isAdmin ? "ADMIN" : "USER"}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setRole({ clerkId: u.clerkId, role: isAdmin ? "USER" : "ADMIN" })
            }
          >
            {isAdmin ? "Demote to USER" : "Promote to ADMIN"}
          </Button>
          <Button
            variant="destructive"
            onClick={() => removeUser({ clerkId: u.clerkId })}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={onToggle}>
            {isExpanded ? "Hide Cars" : "View Cars"}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="bg-gray-50 rounded p-3">
          {!carsByUser && <div>Loading...</div>}
          {carsByUser && carsByUser.length === 0 && <div>No cars</div>}
          {carsByUser &&
            carsByUser.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="w-16 h-10 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">
                      {c.brand} • ${c.pricePerDay}/day
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateCar({
                        carId: c._id,
                        data: { available: !c.available },
                      })
                    }
                  >
                    {c.available ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
