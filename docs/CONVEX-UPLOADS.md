# Convex Uploads: Architecture and Usage

Author: tinotendajoe01

## ASCII Flow Diagram

```
+------------------+           +--------------------+          +------------------+
|  Client (Dialog) |           |  Convex Functions  |          |  Convex Storage  |
|  ConvexUpload.tsx|           |  uploads.ts        |          |  (Blob Storage)  |
+---------+--------+           +---------+----------+          +---------+--------+
          |                              |                               |
          | 1) generateUploadUrl()       |                               |
          +-----------------------------> |  mutation: generateUploadUrl  |
          |                              |  returns short-lived URL       |
          |                       +------v------+                        |
          |                       |  URL string |                        |
          | <---------------------+-------------+                        |
          |                                                              |
          | 2) POST file bytes to returned URL                           |
          +-------------------------------------------------------------> |
          |                                                              |  stores file
          |                                                              |  returns storageId
          |                                                              |
          | 3) saveUploadedFile({ storageId, alt })                      |
          +-----------------------------> +------------------------------+
          |                              |  mutation: saveUploadedFile   |
          |                              |  derives public URL via       |
          |                              |  ctx.storage.getUrl(storageId)|
          |                              +---------------+---------------+
          |                                              |
          |                                  { storageId, url }
          | <---------------------------------------------+
          |
          | 4) onUploaded({ storageId, url }) -> set image in dialog
          |
```

Key files:
- `components/ConvexUpload.tsx`: Reusable client uploader.
- `components/CarImageUpload.tsx`: Wraps `ConvexUpload`, sets preview and propagates URL.
- `components/RentCarModal.tsx`: Collects car data and submits to Convex `addCar` with `imageUrl`.
- `convex/uploads.ts`: Convex mutations/queries for uploads.

## How it Hooks into the Dialog

- `Navbar` mounts `RentCarModal` (site-wide).
- `RentCarModal` step 3 renders `CarImageUpload`.
- `CarImageUpload` uses `ConvexUpload` to upload and returns `{ storageId, url }`.
- The dialog stores `imageUrl` and submits a single payload to `api.carFunctions.addCar`.

## API Surface (Convex)

- `uploads.generateUploadUrl()`
  - Returns `{ url }` — short-lived upload URL for direct POST.
- `uploads.saveUploadedFile({ storageId, purpose?, carId?, alt? })`
  - Returns `{ storageId, url }` — persists metadata and resolves a public URL.
- `uploads.getFileUrl({ storageId })`
  - Returns `{ url }` — resolve URL later when only id is stored.

## Client Usage (ConvexUpload)

```tsx
// components/ConvexUpload.tsx
const { url } = await generateUploadUrl({});
const res = await fetch(url, { method: "POST", headers: { "Content-Type": file.type }, body: file });
const { storageId } = await res.json();
const { url: publicUrl } = await saveUploadedFile({ storageId, alt: file.name || undefined });
onUploaded({ storageId, url: publicUrl });
```

## Posting and Retrieving

- Posting
  1. Request upload URL from Convex.
  2. POST raw file bytes to that URL.
  3. Receive `storageId` (server-managed id in Convex Storage).
  4. Call `saveUploadedFile` to persist metadata and resolve a public URL.

- Retrieving
  - If you have `storageId`: call `uploads.getFileUrl({ storageId })`.
  - If you saved the `url` in your documents (e.g., `cars.imageUrl`), use it directly in `<img src={url} />` or `next/image`.

## Deleting (optional extension)

Current code does not delete uploads. Add this if needed:

```ts
// convex/uploads.ts
import { mutation } from "./_generated/server";
import { v } from "./values";
import type { Id } from "./_generated/dataModel";

export const deleteFile = mutation({
  args: v.object({ storageId: v.id("_storage") }),
  handler: async (ctx, { storageId }: { storageId: Id<"_storage"> }) => {
    await ctx.storage.delete(storageId);
    return { ok: true };
  },
});
```

Client usage:

```ts
const deleteFile = useMutation(api.uploads.deleteFile);
await deleteFile({ storageId });
```

## Notes

- The `alt` is set from the filename when available; otherwise omitted.
- All uploads are handled directly by Convex Storage; no UploadThing is used.
- For associating uploads with domain data, pass `carId` to `saveUploadedFile` or write to a dedicated table.


