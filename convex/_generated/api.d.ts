/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as bookings from "../bookings.js";
import type * as carFunctions from "../carFunctions.js";
import type * as functions_cars_getAvailableCars from "../functions/cars/getAvailableCars.js";
import type * as functions_cars_getCarById from "../functions/cars/getCarById.js";
import type * as uploads from "../uploads.js";
import type * as users from "../users.js";
import type * as values from "../values.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  bookings: typeof bookings;
  carFunctions: typeof carFunctions;
  "functions/cars/getAvailableCars": typeof functions_cars_getAvailableCars;
  "functions/cars/getCarById": typeof functions_cars_getCarById;
  uploads: typeof uploads;
  users: typeof users;
  values: typeof values;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
