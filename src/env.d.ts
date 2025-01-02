/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        session: import("lucia").Session | null;
        user: import("lucia").User | null;
    }
}

interface ImportMetaEnv {
    readonly STRIPE_SECRET_KEY: string;
    readonly STRIPE_PUBLIC_KEY: string;
    readonly PUBLIC_SITE_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly DATABASE_URL: string;
    readonly VITE_ENVIRONMENT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type SingleOrMultiple<T> = T | T[];
