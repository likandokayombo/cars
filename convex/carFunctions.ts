// convex/functions/carFunctions.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

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
    ownerClerkId: v.optional(v.string()),
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

export const getCarsByOwnerClerkId = query({
  /**
   * @notice List cars created by a specific Clerk user.
   * @param clerkId Clerk auth id of the owner.
   * @author tinotendajoe01
   */
  args: v.object({ clerkId: v.string() }),
  handler: async (ctx, { clerkId }) => {
    const all = await ctx.db.query("cars").collect();
    return all.filter((c: any) => c.ownerClerkId === clerkId);
  },
});

/**
 * @notice Update an existing car by id.
 * @dev Only fields provided in data are updated.
 * @param carId Target car id.
 * @param data Partial car fields to update.
 * @author tinotendajoe01
 */
export const updateCar = mutation({
  args: v.object({
    carId: v.id("cars"),
    data: v.object({
      name: v.optional(v.string()),
      brand: v.optional(v.string()),
      model: v.optional(v.string()),
      year: v.optional(v.number()),
      pricePerDay: v.optional(v.number()),
      fuelType: v.optional(v.string()),
      transmission: v.optional(v.string()),
      seats: v.optional(v.number()),
      imageUrl: v.optional(v.string()),
      logoUrl: v.optional(v.string()),
      available: v.optional(v.boolean()),
      description: v.optional(v.string()),
      location: v.optional(v.string()),
    }),
  }),
  handler: async (ctx, { carId, data }) => {
    await ctx.db.patch(carId as Id<"cars">, data as any);
    return { ok: true };
  },
});

/**
 * @notice Delete a car by id.
 * @param carId Target car id.
 * @author tinotendajoe01
 */
export const deleteCar = mutation({
  args: v.object({ carId: v.id("cars") }),
  handler: async (ctx, { carId }) => {
    await ctx.db.delete(carId as Id<"cars">);
    return { ok: true };
  },
});
