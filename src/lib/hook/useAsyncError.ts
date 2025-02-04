import { DatapackError } from "@/lib/minecraft/core/errors/DatapackError";
import type { TranslationKey } from "@/lib/minecraft/i18n/translations";
import React from "react";

export default function useAsyncError() {
    const [_, setError] = React.useState();
    return React.useCallback((e: TranslationKey) => {
        setError(() => {
            throw new DatapackError(e);
        });
    }, []);
}
