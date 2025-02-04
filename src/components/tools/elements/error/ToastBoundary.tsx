import { DatapackError } from "@/lib/minecraft/core/errors/DatapackError";
import type { TranslationKey } from "@/lib/minecraft/i18n/types";
import { Component, type ReactNode } from "react";
import { toast } from "sonner";

interface Props {
    children: ReactNode;
    i18n: (key: TranslationKey, ...args: (string | number)[]) => string;
}

interface State {
    error: Error | null;
}

export default class ToastBoundary extends Component<Props, State> {
    state = { error: null };

    static getDerivedStateFromError(error: unknown) {
        return { error: error instanceof Error ? error : new Error(error as string) };
    }

    componentDidCatch(error: unknown) {
        const actualError = error instanceof Error ? error : new Error(error as string);
        this.setState({ error: actualError });

        if (error instanceof DatapackError) {
            toast.error(this.props.i18n("generic.error"), {
                description: this.props.i18n(error.message as TranslationKey)
            });
        } else {
            toast.error(this.props.i18n("generic.error"), {
                description: this.props.i18n("generic.unexpected_error")
            });
        }
    }

    render() {
        return this.props.children;
    }
}
