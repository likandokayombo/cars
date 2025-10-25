// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cars: defineTable({
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    pricePerDay: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.number(),
    imageUrl: v.string(), // from UploadThing
    logoUrl: v.optional(v.string()), // local logo (optional)
    available: v.boolean(),
    description: v.optional(v.string()),
    location: v.optional(v.string()), // e.g., "Lusaka"
  }),

  bookings: defineTable({
    carId: v.id("cars"),
    userId: v.string(), // from Clerk
    startDate: v.string(),
    endDate: v.string(),
    totalPrice: v.number(),
    status: v.string(), // "pending", "confirmed", "cancelled"
  }),

  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.optional(v.string()), // "user" or "admin"
  }),
});
