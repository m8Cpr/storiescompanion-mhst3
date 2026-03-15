import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A precise version of Omit, allows you to construct a type with the properties of T except for those in type K,
 * while also forbidding you from passing properties in K which do not exist in type T, enabling IntelliSense
 * and safe-guarding against typos.
 *
 * @example
 * type Origin = { a: string; b: number; c: Date; }
 *
 * type Correct = OmitKeys<Origin, 'a'>
 * // result: { b: number; c: Date; }
 *
 * type Wrong = OmitKeys<Origin, 'a' | 'd'>
 * // error: type 'd' is not assignable to type 'keyof Origin'
 */
export type OmitKeys<T, K extends keyof T> = Omit<T, K>;

/**
 * A precise version of Extract, allows you to construct a type by extracting from T those types that are assignable to U,
 * while also forbidding you from passing types in U which do not belong in the union T, enabling IntelliSense
 * and safe-guarding against typos.
 *
 * @example
 * type Origin = 'a' | 'b' | 'c'
 *
 * type Correct = ExtractTypes<Origin, 'a' | 'b'>
 * // result: 'a' | 'b'
 *
 * type Wrong = ExtractTypes<Origin, 'a' | 'd'>
 * // error: type 'd' does not satisfy constraint 'a' | 'b' | 'c'
 */
export type ExtractTypes<T, U extends T> = Extract<T, U>;

/**
 * Picks props from an object.
 * @param obj The object from which to get the props
 * @param keys The name of the props to pick
 * @returns A subset of the object with only the selected props, properly typed
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) {
  return keys.reduce(
    (acc, curr) => {
      acc[curr] = obj[curr];
      return acc;
    },
    {} as Pick<T, K>
  );
}

/**
 * A type-friendly version of Object.keys which returns the keys of the correct keyof type.
 */
export function getObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
