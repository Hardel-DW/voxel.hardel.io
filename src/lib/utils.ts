import { twMerge } from "tailwind-merge";

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;

function toVal(mix: ClassValue): string {
    if (typeof mix === "string" || typeof mix === "number") {
        return String(mix);
    } else if (Array.isArray(mix)) {
        return mix
            .map((item: ClassValue) => toVal(item))
            .filter(Boolean)
            .join(" ");
    } else if (typeof mix === "object" && mix !== null) {
        return Object.keys(mix)
            .filter((key) => mix[key])
            .join(" ");
    }
    return "";
}

function clsx(...args: ClassValue[]): string {
    return args
        .map((arg) => toVal(arg))
        .filter(Boolean)
        .join(" ");
}

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

export const getFormattedDate = (date: string | number | Date, regions: string = "fr-fr") =>
    date
        ? new Date(date).toLocaleDateString(regions, {
              year: "numeric",
              month: "short",
              day: "numeric"
          })
        : "";
