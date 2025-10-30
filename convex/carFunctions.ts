


// convex/functions/carFunctions.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Add a new car
export const addCar = mutation({
  args: v.object({
    name: v.string(),
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    pricePerDay: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.number(),
    imageUrl: v.string(),
    logoUrl: v.optional(v.string()),
    available: v.boolean(),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
  }),
  handler: async (ctx, car) => {
    await ctx.db.insert("cars", car);
  },
});

// ✅ Fetch all cars
export const getCars = query({
  handler: async (ctx) => {
    return await ctx.db.query("cars").collect();
  },
});

// ✅ Fetch available cars
export const getAvailableCars = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("available"), true))
      .collect();
  },
});

// ✅ Fetch a single car by ID
export const getCarById = query({
  args: v.object({ carId: v.id("cars") }),
  handler: async (ctx, { carId }) => {
    return await ctx.db.get(carId);
  },
});
