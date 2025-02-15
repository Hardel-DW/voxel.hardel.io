import type { DataDrivenElement, DataDrivenRegistryElement } from "@voxelio/breeze";
import { create } from "zustand";

const registries = new Map<string, string>();
registries.set("data/tag/item", "tags/item");
registries.set("data/tag/block", "tags/block");
registries.set("data/tag/entity_type", "tags/entity_type");
registries.set("data/tag/fluid", "tags/fluid");
registries.set("data/tag/game_event", "tags/game_event");
registries.set("data/tag/impact_effect", "tags/impact_effect");
registries.set("data/tag/item_condition", "tags/item_condition");

interface ResourceState {
    resourceCache: Map<string, any>;
    atlasCache: Blob | null;
    loading: Set<string>;
    getResource: <T extends DataDrivenElement>(resource: string) => Promise<DataDrivenRegistryElement<T>[]>;
    getResources: (resources: string[]) => Promise<Record<string, any>>;
    getAtlas: () => Promise<Blob>;
    clearCache: () => void;
}

const createResourceStore = () =>
    create<ResourceState>((set, get) => ({
        resourceCache: new Map(),
        atlasCache: null,
        loading: new Set(),

        getResource: async <T extends DataDrivenElement>(resource: string) => {
            const state = get();
            const cachedResource = state.resourceCache.get(resource) as Record<string, T>;

            if (cachedResource) {
                return Object.entries(cachedResource).map(([key, value]) => ({
                    identifier: {
                        namespace: "minecraft",
                        registry: registries.get(resource) || resource,
                        resource: key
                    },
                    data: value
                }));
            }

            if (state.loading.has(resource)) {
                while (state.loading.has(resource)) {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
                return get().getResource(resource);
            }

            state.loading.add(resource);

            try {
                const response = await fetch(`/api/tools/resource?resource=${resource}`);
                if (!response.ok) throw new Error("Resource not found");

                const data = await response.json();
                state.resourceCache.set(resource, data);

                return Object.entries(data).map(([key, value]) => ({
                    identifier: {
                        namespace: "minecraft",
                        registry: registries.get(resource) || resource,
                        resource: key
                    },
                    data: value as T
                }));
            } finally {
                state.loading.delete(resource);
            }
        },

        getResources: async (resources: string[]) => {
            const response = await fetch(`/api/tools/resources?resources=${resources.join(",")}`);
            if (!response.ok) throw new Error("Failed to fetch resources");

            const data = await response.json();
            for (const [resource, value] of Object.entries(data)) {
                get().resourceCache.set(resource, value);
            }

            return data;
        },

        getAtlas: async () => {
            const state = get();
            if (state.atlasCache) return state.atlasCache;

            const response = await fetch("/api/tools/atlas");
            if (!response.ok) throw new Error("Failed to fetch atlas");

            const blob = await response.blob();
            set({ atlasCache: blob });
            return blob;
        },

        clearCache: () =>
            set({
                resourceCache: new Map(),
                atlasCache: null,
                loading: new Set()
            })
    }));

export const useResourceStore = createResourceStore();
