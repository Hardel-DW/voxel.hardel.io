import { twMerge } from "tailwind-merge";

export type ClassDictionary = Record<string, unknown>;
export type ClassArray = ClassValue[];
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;

function toVal(mix: ClassValue): string {
    if (typeof mix === "string" || typeof mix === "number") {
        return String(mix);
    }
    if (Array.isArray(mix)) {
        return mix
            .map((item: ClassValue) => toVal(item))
            .filter(Boolean)
            .join(" ");
    }
    if (typeof mix === "object" && mix !== null) {
        return Object.keys(mix)
            .filter((key) => mix[key])
            .join(" ");
    }
    return "";
}

/**
 * A utility function to merge classnames
 * @param args
 */
function clsx(...args: ClassValue[]): string {
    return args
        .map((arg) => toVal(arg))
        .filter(Boolean)
        .join(" ");
}

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

/**
 * Get the formatted date in the format "dd MMM yyyy"
 * @param date
 * @param regions
 */
export const getFormattedDate = (date: string | number | Date, regions = "fr-fr") =>
    date
        ? new Date(date).toLocaleDateString(regions, {
              year: "numeric",
              month: "short",
              day: "numeric"
          })
        : "";

/**
 * Capitalize the first letter of a string
 * @param s - string
 * @returns string with the first letter capitalized
 */
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Get the property of an object safely with a default value. If the property is an array, return the array.
 * @param obj
 * @param key
 * @param defaultValue
 */
export function getPropertySafely<T extends object, K>(obj: T, key: keyof T, defaultValue: K): K {
    if (key in obj && Array.isArray(obj[key])) {
        return obj[key] as K;
    }
    return defaultValue;
}

export function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string");
}

/**
 * Adds quotes to both sides of a given string.
 * @param str The input string to be quoted
 * @returns The quoted string
 */
export function quoteString(str: string): string {
    return `"${str}"`;
}
