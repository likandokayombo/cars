import { v } from "convex/values";
// convex/users.ts
import { mutation, query } from "./_generated/server";

/**
 * @notice Get role for a given Clerk user id.
 * @dev Defaults to "user" if not found or role unset.
 * @param clerkId Clerk user id string.
 * @author tinotendajoe01
 */
export const getRoleByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .collect();
    const user = users[0];
    return user?.role ?? "USER";
  },
});

export const createUser = mutation({
  /**
   * @notice Create a user record if it does not exist.
   * @dev Defaults role to USER when not provided.
   * @param clerkId Clerk auth id.
   * @param name Display name.
   * @param email Primary email.
   * @param phone Optional phone.
   * @param role Optional role (ADMIN | USER).
   * @author tinotendajoe01
   */
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.optional(v.union(v.literal("ADMIN"), v.literal("USER"))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
    if (!existing) {
      await ctx.db.insert("users", { ...args, role: args.role ?? "USER" });
    }
  },
});

export const getUserByClerkId = query({
  /**
   * @notice Fetch a user by Clerk id.
   * @param clerkId Clerk auth id.
   * @author tinotendajoe01
   */
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .first();
  },
});

export const listUsers = query({
  /**
   * @notice List all users.
   * @author tinotendajoe01
   */
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const setRole = mutation({
  /**
   * @notice Set a user's role.
   * @param clerkId Clerk auth id.
   * @param role Target role (ADMIN | USER).
   * @author tinotendajoe01
   */
  args: {
    clerkId: v.string(),
    role: v.union(v.literal("ADMIN"), v.literal("USER")),
  },
  handler: async (ctx, { clerkId, role }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .first();
    if (!user?._id) return { ok: false };
    await ctx.db.patch(user._id, { role });
    return { ok: true };
  },
});

export const deleteUser = mutation({
  /**
   * @notice Delete a user by Clerk id.
   * @param clerkId Clerk auth id.
   * @author tinotendajoe01
   */
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .first();
    if (!user?._id) return { ok: false };
    await ctx.db.delete(user._id);
    return { ok: true };
  },
});
