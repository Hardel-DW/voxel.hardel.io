import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type.ts";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";

export const slots: Unresolved<InterfaceConfiguration> = {
    id: "enchant.slots",
    section: { type: "translate", value: "tools.enchantments.section.slots" },
    components: [
        {
            type: "Section",
            title: {
                type: "translate",
                value: "tools.enchantments.section.slots.description"
            },
            id: "slots",
            children: [
                {
                    type: "Grid",
                    children: [
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.mainhand.title"
                            },
                            image: "/images/features/slots/mainhand.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "mainhand"
                            },
                            condition: {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["mainhand", "any", "hand"]
                            }
                        },
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.offhand.title"
                            },
                            image: "/images/features/slots/offhand.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "offhand"
                            },
                            condition: {
                                condition: "contains_in_value",
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
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.head.title"
                            },
                            image: "/images/features/slots/head.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "head"
                            },
                            condition: {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["head", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.chest.title"
                            },
                            image: "/images/features/slots/chest.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "chest"
                            },
                            condition: {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["chest", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.legs.title"
                            },
                            image: "/images/features/slots/legs.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "legs"
                            },
                            condition: {
                                condition: "contains_in_value",
                                field: "slots",
                                values: ["legs", "any", "armor"]
                            }
                        },
                        {
                            type: "Slot",
                            title: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.feet.title"
                            },
                            image: "/images/features/slots/feet.webp",
                            action: {
                                type: "set_computed_slot",
                                field: "slots",
                                value: "feet"
                            },
                            condition: {
                                condition: "contains_in_value",
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
                            content: {
                                type: "translate",
                                value: "tools.enchantments.section.slots.explanation.title"
                            }
                        },
                        {
                            type: "UnorderedList",
                            sublist: [
                                {
                                    type: "ListItem",
                                    content: {
                                        type: "translate",
                                        value: "tools.enchantments.section.slots.explanation.list.1"
                                    }
                                },
                                {
                                    type: "ListItem",
                                    content: {
                                        type: "translate",
                                        value: "tools.enchantments.section.slots.explanation.list.2"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
