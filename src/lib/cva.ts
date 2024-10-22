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

// Fonction utilitaire pour la conversion des valeurs falsy
const falsyToString = <T>(value: T): string | T => (typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value);

// Export des types et fonctions pour cx
export type CxOptions = Parameters<typeof clsx>;
export type CxReturn = ReturnType<typeof clsx>;
export const cx = clsx;

// Types pour la configuration CVA
type ConfigSchema = Record<string, Record<string, ClassValue>>;

type ConfigVariants<T extends ConfigSchema> = {
    [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};

type ConfigVariantsMulti<T extends ConfigSchema> = {
    [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | StringToBoolean<keyof T[Variant]>[] | undefined;
};

type Config<T> = T extends ConfigSchema
    ? {
          variants?: T;
          defaultVariants?: ConfigVariants<T>;
          compoundVariants?: (ConfigVariants<T> | (ConfigVariantsMulti<T> & ClassProp))[];
      }
    : never;

type Props<T> = T extends ConfigSchema ? ConfigVariants<T> & ClassProp : ClassProp;

// Fonction principale cva
export const cva =
    <T>(base?: ClassValue, config?: Config<T>) =>
    (props?: Props<T>): string => {
        if (!config?.variants) {
            return cx(base, props?.class, props?.className);
        }

        const { variants, defaultVariants } = config;

        // Gestion des variants simples
        const variantClassNames = Object.keys(variants).map((variant) => {
            const variantProp = props?.[variant as keyof typeof props];
            const defaultVariantProp = defaultVariants?.[variant];

            if (variantProp === null) return null;

            // Correction du typage pour variantKey
            const variantKey = (falsyToString(variantProp) || falsyToString(defaultVariantProp)) as string;

            // Vérification de l'existence de la clé avant d'accéder
            return variants[variant] && variantKey in variants[variant] ? variants[variant][variantKey] : null;
        });

        // Nettoyage des props undefined
        const cleanProps =
            props &&
            Object.entries(props).reduce<Record<string, unknown>>((acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});

        // Gestion des compound variants
        const compoundClassNames = config.compoundVariants?.reduce<ClassValue[]>(
            (acc, { class: cvClass, className: cvClassName, ...conditions }) => {
                const matches = Object.entries(conditions).every(([key, value]) => {
                    const currentValue = { ...defaultVariants, ...cleanProps }[key];
                    return Array.isArray(value) ? value.includes(currentValue) : currentValue === value;
                });

                if (matches) {
                    if (cvClass && typeof cvClass !== "symbol") {
                        acc.push(cvClass as ClassValue);
                    }
                    if (cvClassName && typeof cvClassName !== "symbol") {
                        acc.push(cvClassName as ClassValue);
                    }
                }
                return acc;
            },
            []
        );

        return cx(base, variantClassNames, compoundClassNames, props?.class, props?.className);
    };
