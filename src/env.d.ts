/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        session: import("lucia").Session | null;
        user: import("lucia").User | null;
    }
}

interface ImportMetaEnv {
    readonly PAYMENT_KEY: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly DATABASE_URL: string;
    readonly VITE_ENVIRONMENT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
