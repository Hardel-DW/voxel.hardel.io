import type { ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";

export const yggdrasil: ToolRevealElementType = {
    id: "yggdrasil",
    logo: "/images/addons/logo/yggdrasil.webp",
    image: "/images/addons/hero/yggdrasil.png",
    href: "https://modrinth.com/datapack/yggdrasil-structure",
    title: "tools.enchantments.section.addons.yggdrasil.title",
    description: "tools.enchantments.section.addons.yggdrasil.description",
    children: [
        {
            type: "Grid",
            children: [
                {
                    type: "Slot",
                    image: "/images/features/title/yg.webp",
                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title",
                    description: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description",
                    action: {
                        type: "Multiple",
                        field: "tags",
                        values: [
                            "#yggdrasil:equipment/item/bow",
                            "#yggdrasil:equipment/item/sword",
                            "#yggdrasil:equipment/item/helmet",
                            "#yggdrasil:equipment/item/chestplate",
                            "#yggdrasil:equipment/item/leggings",
                            "#yggdrasil:equipment/item/boots"
                        ]
                    },
                    condition: {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: [
                            "#yggdrasil:equipment/item/bow",
                            "#yggdrasil:equipment/item/sword",
                            "#yggdrasil:equipment/item/helmet",
                            "#yggdrasil:equipment/item/chestplate",
                            "#yggdrasil:equipment/item/leggings",
                            "#yggdrasil:equipment/item/boots"
                        ]
                    }
                },
                {
                    type: "Slot",
                    image: "/images/tools/rarity/common.webp",
                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.title",
                    description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.description",
                    action: {
                        type: "List",
                        field: "tags",
                        value: "#yggdrasil:structure/common"
                    },
                    condition: {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: ["#yggdrasil:structure/common"]
                    }
                },
                {
                    type: "Slot",
                    image: "/images/tools/rarity/rare.webp",
                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.title",
                    description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.description",
                    action: {
                        type: "List",
                        field: "tags",
                        value: "#yggdrasil:structure/rare"
                    },
                    condition: {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: ["#yggdrasil:structure/rare"]
                    }
                },
                {
                    type: "Slot",
                    image: "/images/tools/rarity/unique.webp",
                    title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.title",
                    description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.description",
                    action: {
                        type: "List",
                        field: "tags",
                        value: "#yggdrasil:structure/unique"
                    },
                    condition: {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: ["#yggdrasil:structure/unique"]
                    }
                }
            ]
        }
    ]
};
