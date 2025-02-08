import type { ClassValue } from "./utils";
import { clsx } from "./utils";

export type ClassProp =
    | { class: ClassValue; className?: never }
    | { class?: never; className: ClassValue }
    | { class?: never; className?: never };

export type OmitUndefined<T> = T extends undefined ? never : T;
export type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;
export type VariantProps<Component extends (props: Record<string, unknown>) => unknown> = Omit<
    OmitUndefined<Parameters<Component>[0]>,
    "class" | "className"
>;

// Export des types et fonctions pour cx
export type CxOptions = Parameters<typeof clsx>;
export type CxReturn = ReturnType<typeof clsx>;
export const cx = clsx;
