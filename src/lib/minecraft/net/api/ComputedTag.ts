import useSWR from "swr";

/**
 * Récupère les tags depuis l'API
 * @param registry - Le type de registre (ex: 'enchantment', 'block', etc.)
 * @param path - Le chemin du tag (ex: 'exclusive_set')
 * @param options - Options additionnelles
 * @returns Un objet contenant les tags et leurs valeurs
 */
export const useComputedTag = (
    registry: string,
    path: string,
    options: {
        namespace?: string;
        nested?: boolean;
    } = {}
) => {
    const { namespace = "minecraft", nested = false } = options;

    const params = new URLSearchParams({
        namespace,
        nested: nested.toString()
    });

    const { data, error, isLoading } = useSWR<Record<string, string[]>>(`/api/engine/tags/${registry}/${path}?${params}`, (url: string) =>
        fetch(url).then((res) => res.json())
    );

    return {
        data,
        isLoading,
        error
    };
};
