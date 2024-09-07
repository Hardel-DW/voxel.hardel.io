import type { DamageType } from "@/lib/minecraft/registry/DamagaTypeRegistry.ts";

type ApplyMobEffect = {
    type: "minecraft:apply_mob_effect";
    to_apply: string[];
    min_duration: LevelBasedValue;
    max_duration: LevelBasedValue;
    min_amplifier: LevelBasedValue;
    max_amplifier: LevelBasedValue;
};

type DamageEntity = {
    type: "minecraft:damage_entity";
    damage_type: DamageType;
    min_damage: LevelBasedValue;
    max_damage: LevelBasedValue;
};

type DamageItem = {
    type: "minecraft:damage_item";
    amount: LevelBasedValue;
};

type Explode = {
    type: "minecraft:explode";
    damage_type?: DamageType;
    radius: LevelBasedValue;
    offset: [number, number, number];
    block_interaction: "none" | "block" | "tnt" | "trigger" | "mob";
    small_particle: ParticleRegistry;
    large_particle: ParticleRegistry;
    sound: SoundValue;
    immune_blocks?: SingleOrMultiple<string>;
    knockback_multiplier?: LevelBasedValue;
    attribute_to_user?: boolean;
    create_fire?: boolean;
};

type Ignite = {
    type: "minecraft:ignite";
    duration: LevelBasedValue;
};

type PlaySound = {
    type: "minecraft:play_sound";
    sound: SoundValue;
    volume: number;
    pitch: number;
};

type ReplaceBlock = {
    type: "minecraft:replace_block";
    block_state: any;
    predicate?: any;
    offset?: [number, number, number];
    trigger_game_event?: GameEvent;
};

type ReplaceDisk = {
    type: "minecraft:replace_disk";
    block_state: any;
    predicate?: any;
    radius: LevelBasedValue;
    height: LevelBasedValue;
    offset?: [number, number, number];
    trigger_game_event?: GameEvent;
};

type RunFunction = {
    type: "minecraft:run_function";
    function: string;
};

type SetBlockProperties = {
    type: "minecraft:set_block_properties";
    properties: Record<string, string>;
    offset?: [number, number, number];
    trigger_game_event?: GameEvent;
};

type SpawnParticles = {
    type: "minecraft:spawn_particles";
    particle: ParticleRegistry;
    horizontal_position: ParticlePositionSource;
    vertical_position: ParticlePositionSource;
    horizontal_velocity: ParticleVelocitySource;
    vertical_velocity: ParticleVelocitySource;
    speed: number;
};

type SummonEntity = {
    type: "minecraft:summon_entity";
    entity: string[];
    join_team?: boolean;
};

export type SharedEffects =
    | ApplyMobEffect
    | DamageEntity
    | DamageItem
    | Explode
    | Ignite
    | PlaySound
    | ReplaceBlock
    | ReplaceDisk
    | RunFunction
    | SetBlockProperties
    | SpawnParticles
    | SummonEntity;
