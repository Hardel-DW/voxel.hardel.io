import { getRegistry } from "@voxelio/breeze/net";
import { useEffect, useState } from "react";

export function useRegistry(registryType: string, isOpen: boolean) {
    const [items, setItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        setIsLoading(true);

        const loadRegistry = async () => {
            try {
                const registry = await getRegistry(registryType);
                setItems(Array.isArray(registry) ? registry : []);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to load registry"));
                setIsLoading(false);
            }
        };

        loadRegistry();
    }, [registryType, isOpen]);

    return { items, isLoading, error };
}
