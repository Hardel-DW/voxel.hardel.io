import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const global: InterfaceConfiguration = {
    id: "global",
    section: "tools.enchantments.section.global",
    components: [
        {
            type: "Section",
            title: "tools.enchantments.section.global.description",
            id: "main",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Counter",
                            title: "tools.enchantments.section.global.components.maxLevel.title",
                            description: "tools.enchantments.section.global.components.maxLevel.description",
                            image: "/icons/tools/level.svg",
                            min: 1,
                            max: 10,
                            step: 1,
                            action: { type: "Dynamic", field: "maxLevel" },
                            value: {
                                params: {
                                    type: "Field",
                                    field: "maxLevel"
                                }
                            }
                        },
                        {
                            type: "Counter",
                            title: "tools.enchantments.section.global.components.weight.title",
                            description: "tools.enchantments.section.global.components.weight.description",
                            image: "/icons/tools/weight.svg",
                            min: 1,
                            max: 20,
                            step: 1,
                            action: { type: "Dynamic", field: "weight" },
                            value: {
                                params: {
                                    type: "Field",
                                    field: "weight"
                                }
                            }
                        },
                        {
                            type: "Counter",
                            title: "tools.enchantments.section.global.components.anvilCost.title",
                            description: "tools.enchantments.section.global.components.anvilCost.description",
                            image: "/icons/tools/anvil.svg",
                            min: 1,
                            max: 20,
                            step: 1,
                            action: { type: "Dynamic", field: "anvilCost" },
                            value: {
                                params: {
                                    type: "Field",
                                    field: "anvilCost"
                                }
                            }
                        }
                    ]
                },
                {
                    type: "Donation",
                    title: "tools.enchantments.section.global.components.donate.title",
                    description: "tools.enchantments.section.global.components.donate.description",
                    image: "/icons/tools/donate.svg",
                    link: "https://www.patreon.com/voxel"
                }
            ]
        }
    ]
};
