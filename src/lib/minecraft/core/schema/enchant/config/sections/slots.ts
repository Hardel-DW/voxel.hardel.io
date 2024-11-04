import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const slots: InterfaceConfiguration = {
    id: "enchant.slots",
    section: { type: "translate", value: "tools.enchantments.section.slots" },
    components: [
        {
            type: "Section",
            title: { type: "translate", value: "tools.enchantments.section.slots.description" },
            id: "slots",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Slot",
                            title: { type: "translate", value: "tools.enchantments.section.slots.mainhand.title" },
                            image: "/images/features/slots/mainhand.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "mainhand"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["mainhand", "any", "hand"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.slots.offhand.title",
                            image: "/images/features/slots/offhand.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "offhand"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["offhand", "any", "hand"]
                            }
                        }
                    ]
                },
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.slots.head.title",
                            image: "/images/features/slots/head.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "head"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["head", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.slots.chest.title",
                            image: "/images/features/slots/chest.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "chest"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["chest", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.slots.legs.title",
                            image: "/images/features/slots/legs.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "legs"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["legs", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.slots.feet.title",
                            image: "/images/features/slots/feet.webp",
                            action: {
                                type: "Slot",
                                field: "slots",
                                value: "feet"
                            },
                            condition: {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["feet", "any", "armor"]
                            }
                        }
                    ]
                },
                {
                    type: "Text",
                    content: [
                        {
                            type: "Paragraph",
                            content: { type: "translate", value: "tools.enchantments.section.slots.explanation.title" }
                        },
                        {
                            type: "UnorderedList",
                            sublist: [
                                {
                                    type: "ListItem",
                                    content: { type: "translate", value: "tools.enchantments.section.slots.explanation.list.1" }
                                },
                                {
                                    type: "ListItem",
                                    content: { type: "translate", value: "tools.enchantments.section.slots.explanation.list.2" }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
