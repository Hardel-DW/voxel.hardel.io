import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import { SECTIONS } from "@/lib/minecraft/core/schema/enchant/sections";
import type { ToolConfiguration } from "@/lib/minecraft/core/schema/primitive";

export const ENCHANT_TOOL_CONFIG: Unresolved<ToolConfiguration> = {
    interface: SECTIONS,
    sidebar: {
        lock: [
            {
                text: {
                    type: "translate",
                    value: "tools.disabled_because_vanilla"
                },
                condition: {
                    condition: "check_namespace",
                    values: "minecraft"
                }
            }
        ],
        action: {
            type: "set_value_from_computed_value",
            field: "softDelete"
        },
        description: "description"
    },
    analyser: {
        id: "enchantment",
        registries: {
            main: "enchantment",
            tags: "tags/enchantment"
        }
    }
};
