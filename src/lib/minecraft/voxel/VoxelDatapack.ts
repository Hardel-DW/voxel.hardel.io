import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";

const axes: TagType = {
    values: ["#minecraft:axes"]
};

const hoes: TagType = {
    values: ["#minecraft:hoes"]
};

const pickaxes: TagType = {
    values: ["#minecraft:pickaxes"]
};

const shovels: TagType = {
    values: ["#minecraft:shovels"]
};

const elytra: TagType = {
    values: ["minecraft:elytra"]
};

const melee: TagType = {
    values: ["#minecraft:enchantable/weapon", "#minecraft:enchantable/trident"]
};

const range: TagType = {
    values: ["#minecraft:enchantable/crossbow", "#minecraft:enchantable/bow"]
};

const shield: TagType = {
    values: ["minecraft:shield"]
};

export const voxelDatapacks: RegistryElement<TagType>[] = [
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/axes"),
        data: axes
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/hoes"),
        data: hoes
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/pickaxes"),
        data: pickaxes
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/shovels"),
        data: shovels
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/elytra"),
        data: elytra
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/melee"),
        data: melee
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/range"),
        data: range
    },
    {
        identifier: new Identifier("voxel", "tags/item", "enchantable/shield"),
        data: shield
    }
];
