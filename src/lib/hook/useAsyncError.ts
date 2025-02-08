import { DatapackError } from "@voxelio/breeze/core";
import type { TranslationKey } from "@voxelio/breeze/i18n";
import React from "react";

export default function useAsyncError() {
    const [_, setError] = React.useState();
    return React.useCallback((e: TranslationKey) => {
        setError(() => {
            throw new DatapackError(e);
        });
    }, []);
}
