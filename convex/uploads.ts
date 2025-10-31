import { v } from "./values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

/**
 * @notice Generate a short‑lived Convex Storage upload URL.
 * @dev The client POSTs raw file bytes to this URL directly. No app server proxy.
 * @author tinotendajoe01
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx: MutationCtx) => {
    const url = await ctx.storage.generateUploadUrl();
    return { url };
  },
});

/**
 * @notice Persist metadata for an uploaded file and derive a public URL.
 * @dev Extend to associate files with domain entities (e.g., cars) in your schema.
 * @param args.storageId The Convex Storage id returned by the upload POST.
 * @param args.purpose Optional application-specific purpose label.
 * @param args.carId Optional car id to link this file with.
 * @param args.alt Optional alt text for accessibility.
 * @author tinotendajoe01
 */
export const saveUploadedFile = mutation({
  args: v.object({
    storageId: v.id("_storage"),
    purpose: v.optional(v.string()),
    carId: v.optional(v.id("cars")),
    alt: v.optional(v.string()),
  }),
  handler: async (
    ctx: MutationCtx,
    args: {
      storageId: Id<"_storage">;
      purpose?: string;
      carId?: Id<"cars">;
      alt?: string;
    }
  ) => {
    const { storageId } = args;

    // Derive a public URL for the stored file
    const url = await ctx.storage.getUrl(storageId);

    // Optionally store a record of this file (simple example uses a dedicated table-less return)
    return { storageId, url };
  },
});

/**
 * @notice Resolve a public URL for a given Convex Storage id.
 * @dev Useful for lazy URL resolution when only ids are stored.
 * @param storageId The Convex Storage id to resolve.
 * @author tinotendajoe01
 */
export const getFileUrl = query({
  args: v.object({ storageId: v.id("_storage") }),
  handler: async (
    ctx: QueryCtx,
    { storageId }: { storageId: Id<"_storage"> }
  ) => {
    const url = await ctx.storage.getUrl(storageId);
    return { url };
  },
});
