import type { ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";

export const dungeon: ToolRevealElementType = {
    id: "dnt",
    logo: "/images/addons/logo/dnt.webp",
    image: "/images/addons/hero/dnt.png",
    soon: false,
    href: "https://modrinth.com/datapack/dungeons-and-taverns",
    title: "tools.enchantments.section.addons.dnt.title",
    description: "tools.enchantments.section.addons.dnt.description",
    children: [
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.global.title",
            children: [
                {
                    type: "Grid",
                    size: "250px",
                    children: [
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.dnt.overworld.title",
                            description: "tools.enchantments.section.addons.dnt.overworld.description",
                            image: "/images/features/structure/overworld.webp",
                            size: 128,
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:overworld"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:overworld"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.dnt.underwater.title",
                            description: "tools.enchantments.section.addons.dnt.underwater.description",
                            image: "/images/features/structure/underwater.webp",
                            size: 128,
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:underwater"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:underwater"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.dnt.nether.title",
                            description: "tools.enchantments.section.addons.dnt.nether.description",
                            image: "/images/features/structure/nether.webp",
                            size: 128,
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:nether"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:nether"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.addons.dnt.end.title",
                            description: "tools.enchantments.section.addons.dnt.end.description",
                            image: "/images/features/structure/end.webp",
                            size: 128,
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:end"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:end"]
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: "Category",
            title: "tools.enchantments.section.addons.dnt.structures.title",
            children: [
                {
                    type: "Grid",
                    size: "400px",
                    children: [
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.creeping_crypt.title",
                            description: "tools.enchantments.section.addons.dnt.creeping_crypt.description",
                            image: "/images/addons/card/dnt/creeping_crypt.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:creeping_crypt"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:creeping_crypt"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.nether_keep.title",
                            description: "tools.enchantments.section.addons.dnt.nether_keep.description",
                            image: "/images/addons/card/dnt/piglin_outstation.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:nether_keep"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:nether_keep"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.illager.title",
                            description: "tools.enchantments.section.addons.dnt.illager.description",
                            image: "/images/addons/card/dnt/illager_manor.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:illager"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:illager"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.illager_outpost.title",
                            description: "tools.enchantments.section.addons.dnt.illager_outpost.description",
                            image: "/images/addons/card/dnt/illager_hideout.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:illager_outpost"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:illager_outpost"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.pale_residence.title",
                            description: "tools.enchantments.section.addons.dnt.pale_residence.description",
                            image: "/images/addons/card/dnt/pale_residence.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:pale_residence"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:pale_residence"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.shrine.title",
                            description: "tools.enchantments.section.addons.dnt.shrine.description",
                            image: "/images/addons/card/dnt/shrine.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:shrine"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:shrine"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.shrine_ominous.title",
                            description: "tools.enchantments.section.addons.dnt.shrine_ominous.description",
                            image: "/images/addons/card/dnt/shrine_ominous.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:shrine_ominous"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:shrine_ominous"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.snowy.title",
                            description: "tools.enchantments.section.addons.dnt.snowy.description",
                            image: "/images/addons/card/dnt/stay_fort.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:snowy"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:snowy"]
                            }
                        },
                        {
                            type: "InlineSlot",
                            title: "tools.enchantments.section.addons.dnt.toxic_lair.title",
                            description: "tools.enchantments.section.addons.dnt.toxic_lair.description",
                            image: "/images/addons/card/dnt/toxic_lair.webp",
                            action: {
                                type: "List",
                                field: "tags",
                                value: "#nova_structures:toxic_lair"
                            },
                            condition: {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: ["#nova_structures:toxic_lair"]
                            }
                        }
                    ]
                }
            ]
        }
    ]
};
