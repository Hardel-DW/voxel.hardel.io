import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import { toast } from "sonner";

export type Field = string | ToggleField;

export type ToggleField = {
    type: "Toggle";
    group: string;
};

export function getField<T>(params: Field, context: ConfiguratorContextType<T>): keyof T {
    const { toggleSection } = context;
    if (!toggleSection) {
        toast.error("Internal Server", {
            description: `An error occurred while trying to get the field ${params}`
        });

        throw new Error(`An error occurred while trying to get the field ${params}`);
    }

    if (typeof params === "string") {
        return params as keyof T;
    }

    switch (params.type) {
        case "Toggle": {
            return toggleSection[params.group] as keyof T;
        }
    }
}
