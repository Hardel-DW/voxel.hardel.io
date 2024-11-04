import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import { SECTIONS } from "@/lib/minecraft/core/schema/enchant/config/sections";

export const ENCHANT_TOOL_CONFIG: ToolConfiguration = {
    interface: SECTIONS,
    sidebar: {
        toggle: {
            field: "softDelete",
            action: {
                type: "Dynamic",
                field: "softDelete"
            }
        },
        value: {
            field: "softDelete"
        },
        description: {
            field: "description"
        }
    },
    parser: {
        id: "enchantment",
        registries: {
            main: "enchantment",
            tags: "tags/enchantment"
        }
    },
    compiler: {
        merge_field_to_tags: ["exclusiveSet"]
    }
};
