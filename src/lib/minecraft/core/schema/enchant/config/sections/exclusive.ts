import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export const exclusive: InterfaceConfiguration = {
    id: "exclusive",
    section: { type: "translate", value: "tools.enchantments.section.exclusive" },
    soon: false,
    components: [
        {
            type: "Section",
            title: { type: "translate", value: "tools.enchantments.section.exclusive.description" },
            id: "set_exclusive",
            toggle: [
                {
                    title: { type: "translate", value: "tools.enchantments.section.toggle.exclusive.group.title" },
                    description: { type: "translate", value: "tools.enchantments.section.toggle.exclusive.group.description" },
                    name: "exclusiveSet"
                },
                {
                    title: { type: "translate", value: "tools.enchantments.section.toggle.exclusive.individual.title" },
                    description: { type: "translate", value: "tools.enchantments.section.toggle.exclusive.individual.description" },
                    name: "test"
                }
            ],
            children: [
                {
                    type: "Scrollable",
                    height: 620,
                    children: [
                        {
                            type: "List",
                            children: [
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.armor.title" },
                                    description: { type: "translate", value: "tools.enchantments.section.exclusive.set.armor.description" },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/armor",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/armor"
                                    }
                                },
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.bow.title" },
                                    description: { type: "translate", value: "tools.enchantments.section.exclusive.set.bow.description" },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/bow",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/bow"
                                    }
                                },
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.crossbow.title" },
                                    description: {
                                        type: "translate",
                                        value: "tools.enchantments.section.exclusive.set.crossbow.description"
                                    },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/crossbow",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/crossbow"
                                    }
                                },
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.damage.title" },
                                    description: {
                                        type: "translate",
                                        value: "tools.enchantments.section.exclusive.set.damage.description"
                                    },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/damage",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/damage"
                                    }
                                },
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.riptide.title" },
                                    description: {
                                        type: "translate",
                                        value: "tools.enchantments.section.exclusive.set.riptide.description"
                                    },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/riptide",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/riptide"
                                    }
                                },
                                {
                                    type: "SwitchSlot",
                                    title: { type: "translate", value: "tools.enchantments.section.exclusive.set.boots.title" },
                                    description: { type: "translate", value: "tools.enchantments.section.exclusive.set.boots.description" },
                                    action: {
                                        type: "String",
                                        value: "#minecraft:exclusive_set/boots",
                                        field: { type: "Toggle", group: "set_exclusive" }
                                    },
                                    condition: {
                                        condition: "Equals",
                                        type: "String",
                                        field: { type: "Toggle", group: "set_exclusive" },
                                        value: "#minecraft:exclusive_set/boots"
                                    }
                                }
                                /*                                {
                                    type: "Iteration",
                                    values: [
                                        {
                                            type: "CollectFromPath",
                                            registry: "tags/enchantment",
                                            path: "exclusive_set"
                                        }
                                    ],
                                    template: {
                                        type: "SwitchSlot",
                                        title: {
                                            type: "Context",
                                            key: "file_name"
                                        },
                                        description: {
                                            type: "Context",
                                            key: "namespace"
                                        },
                                        action: {
                                            type: "String",
                                            value: {
                                                type: "Context",
                                                key: "identifier"
                                            },
                                            field: { type: "Toggle", group: "set_exclusive" }
                                        },
                                        condition: {
                                            condition: "Equals",
                                            type: "String",
                                            field: { type: "Toggle", group: "set_exclusive" },
                                            value: {
                                                type: "Context",
                                                key: "identifier"
                                            }
                                        }
                                    }
                                }*/
                            ]
                        }

                        // {
                        //     type: "Grid",
                        //     children: [
                        //         {
                        //             type: "Collection",
                        //             field: "exclusiveSet",
                        //             includes: [
                        //                 "#minecraft:exclusive_set/armor",
                        //                 "#minecraft:exclusive_set/bow",
                        //                 "#minecraft:exclusive_set/crossbow",
                        //                 "#minecraft:exclusive_set/damage",
                        //                 "#minecraft:exclusive_set/mining",
                        //                 "#minecraft:exclusive_set/riptide",
                        //                 "#minecraft:exclusive_set/boots"
                        //             ],
                        //             value: {
                        //                 params: { type: "Field", field: "exclusiveSet" }
                        //             },
                        //             action: { type: "Dynamic", field: "exclusiveSet" }
                        //         }
                        //     ]
                        // },
                    ]
                }
            ]
        }
    ]
};
