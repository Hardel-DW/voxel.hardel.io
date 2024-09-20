import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const slots: InterfaceConfiguration = {
    id: "slots",
    section: "tools.enchantments.section.slot",
    components: [
        {
            type: "Section",
            title: "tools.enchantments.section.slot.description",
            id: "slots",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Slot",
                            title: "tools.enchantments.section.exclusive.components.mainhand.title",
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
                            title: "tools.enchantments.section.exclusive.components.offhand.title",
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
                            title: "tools.enchantments.section.exclusive.components.head.title",
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
                            title: "tools.enchantments.section.exclusive.components.chest.title",
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
                            title: "tools.enchantments.section.exclusive.components.legs.title",
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
                            title: "tools.enchantments.section.exclusive.components.feet.title",
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
                }
            ]
        }
    ]
};
