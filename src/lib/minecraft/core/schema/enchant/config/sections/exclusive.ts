import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const exclusive: InterfaceConfiguration = {
    id: "exclusive",
    section: "tools.enchantments.section.exclusive",
    soon: true,
    components: [
        {
            type: "Section",
            title: "tools.enchantments.section.exclusive.description",
            id: "set_exclusive",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Collection",
                            field: "exclusiveSet",
                            includes: [
                                "#minecraft:exclusive_set/armor",
                                "#minecraft:exclusive_set/bow",
                                "#minecraft:exclusive_set/crossbow",
                                "#minecraft:exclusive_set/damage",
                                "#minecraft:exclusive_set/mining",
                                "#minecraft:exclusive_set/riptide",
                                "#minecraft:exclusive_set/boots"
                            ],
                            value: {
                                params: { type: "Field", field: "exclusiveSet" }
                            },
                            action: { type: "Dynamic", field: "exclusiveSet" }
                        }
                    ]
                }
            ],
            toggle: [
                {
                    title: "tools.enchantments.section.toggle.exclusive.group.title",
                    description: "tools.enchantments.section.toggle.exclusive.group.description",
                    name: "group"
                },
                {
                    title: "tools.enchantments.section.toggle.exclusive.individual.title",
                    description: "tools.enchantments.section.toggle.exclusive.individual.description",
                    name: "individual"
                }
            ]
        }
    ]
};
