import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import { exclusive } from "@/lib/minecraft/core/schema/enchant/config/sections/exclusive.ts";
import { find } from "@/lib/minecraft/core/schema/enchant/config/sections/find.ts";
import { global } from "@/lib/minecraft/core/schema/enchant/config/sections/global.ts";
import { slots } from "@/lib/minecraft/core/schema/enchant/config/sections/slots.ts";
import { supported } from "@/lib/minecraft/core/schema/enchant/config/sections/supported.ts";
import { technical } from "@/lib/minecraft/core/schema/enchant/config/sections/technical.ts";

export const ENCHANT_TOOL_CONFIG: ToolConfiguration = {
    interface: [global, find, slots, supported, technical, exclusive],
    sidebar: {
        toggle: {
            type: "Dynamic",
            field: "softDelete"
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
    }
};
