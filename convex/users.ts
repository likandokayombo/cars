// convex/users.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("users").filter((q) => q.eq(q.field("clerkId"), args.clerkId)).first();
    if (!existing) {
      await ctx.db.insert("users", args);
    }
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db.query("users").filter((q) => q.eq(q.field("clerkId"), clerkId)).first();
  },
});
