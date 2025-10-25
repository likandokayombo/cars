// convex/bookings.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBooking = mutation({
  args: {
    carId: v.id("cars"),
    userId: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    totalPrice: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bookings", { ...args, status: "pending" });
  },
});

export const getUserBookings = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db.query("bookings").filter((q) => q.eq(q.field("userId"), userId)).collect();
  },
});
