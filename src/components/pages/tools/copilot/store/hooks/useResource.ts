import { useResourceStore } from "@/components/pages/tools/copilot/store/ResourceStore";
import type { DataDrivenElement, DataDrivenRegistryElement } from "@voxelio/breeze";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

interface ResourceState<T extends DataDrivenElement> {
    data: DataDrivenRegistryElement<T>[] | null;
    loading: boolean;
    error: Error | null;
}

export function useResource<T extends DataDrivenElement>(resource: string) {
    const [state, setState] = useState<ResourceState<T>>({ data: null, loading: true, error: null });
    const getResource = useResourceStore(useShallow((state) => state.getResource));

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                const data = await getResource<T>(resource);
                if (!mounted) return;
                setState({ data, loading: false, error: null });
            } catch (error) {
                if (!mounted) return;
                setState({ data: null, loading: false, error: error as Error });
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, [resource, getResource]);

    return state;
}
