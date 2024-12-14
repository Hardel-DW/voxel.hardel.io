import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import { SECTIONS } from "@/lib/minecraft/core/schema/enchant/config/sections";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";

export const ENCHANT_TOOL_CONFIG: Unresolved<ToolConfiguration> = {
    interface: SECTIONS,
    sidebar: {
        action: {
            type: "set_value",
            field: "softDelete",
            value: false
        },
        description: "description"
    },
    analyser: {
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
