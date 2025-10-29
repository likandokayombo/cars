// import { query } from "../../_generated/server";
// import { v } from "convex/values";

// export const getCarById = query({
//   args: { carId: v.id("cars") },
//   handler: async (ctx, args) => {
//     const car = await ctx.db.get(args.carId);
//     return car;
//   },
// });










// import { query } from "../../_generated/server";
// import { v } from "convex/values";

// export const getCarById = query({
//   args: (input: { carId: string }) => ({ carId: v.id("cars") }),
//   handler: async (ctx, { carId }) => {
//     return await ctx.db.get(carId);
//   },
// });




import { query } from "../../_generated/server";
import { v } from "convex/values";

export const getCarById = query({
  args: { carId: v.id("cars") }, // ✅ works in Convex 1.28.0
  handler: async (ctx, { carId }) => {
    const car = await ctx.db.get(carId);
    return car;
  },
});
