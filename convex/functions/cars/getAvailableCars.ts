import { query } from "../../_generated/server"



export const getAvailableCars = query({
  handler: async (ctx) => {
    const allCars = await ctx.db.query("cars").collect();
    return allCars.filter((car) => car.available);
  },
});