import { useTag } from "@/lib/minecraft/net/api/ComputedTag";
import { ToolTagCard } from "./ToolTagCard";

interface TagLoaderProps {
    registry: string;
    path: string;
    fileName: string;
    namespace?: string;
    values?: string[];
}

export function TagLoader({ registry, path, fileName, namespace, values }: TagLoaderProps) {
    const { data, isLoading, error } = useTag(registry, path, fileName, { namespace });

    if (isLoading) {
        return (
            <div className="flex justify-between items-center bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
                <div className="flex flex-col">
                    <h2 className="text-zinc-200 text-sm">Données Vanilla</h2>
                    <p className="text-zinc-500 text-sm">Récupération des données depuis le datapack Vanilla</p>
                </div>
                <div className="w-16 h-16 bg-zinc-800 rounded-full animate-pulse" />
            </div>
        );
    }
    if (error) {
        return <div className="text-center py-6 text-zinc-500 text-sm">Erreur lors de la récupération des tags</div>;
    }
    if (!data) {
        return <div className="text-center py-6 text-zinc-500 text-sm">Aucune entrée trouvée</div>;
    }
    return (
        <div className="space-y-2">
            {data
                .filter((value) => values?.includes(value))
                .map((value) => (
                    <ToolTagCard key={value} value={value} />
                ))}
        </div>
    );
}
