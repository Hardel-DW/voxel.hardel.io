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
