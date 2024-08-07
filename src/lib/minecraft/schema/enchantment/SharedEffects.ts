import type { DamageType } from "@/lib/minecraft/registry/DamagaTypeRegistry.ts";

export interface SharedEffects {
    "minecraft:apply_mob_effect"?: {
        to_apply: string[];
        min_duration: LevelBasedValue;
        max_duration: LevelBasedValue;
        min_amplifier: LevelBasedValue;
        max_amplifier: LevelBasedValue;
    };
    "minecraft:damage_entity"?: {
        damage_type: DamageType;
        min_damage: LevelBasedValue;
        max_damage: LevelBasedValue;
    };
    "minecraft:damage_item"?: {
        amount: LevelBasedValue;
    };
    "minecraft:explode"?: {
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
    "minecraft:ignite"?: {
        duration: LevelBasedValue;
    };
    "minecraft:play_sound"?: {
        sound: SoundValue;
        volume: number;
        pitch: number;
    };
    "minecraft:replace_block"?: {
        block_state: any;
        predicate?: any;
        offset?: [number, number, number];
        trigger_game_event?: GameEvent;
    };
    "minecraft:replace_disk"?: {
        block_state: any;
        predicate?: any;
        radius: LevelBasedValue;
        height: LevelBasedValue;
        offset?: [number, number, number];
        trigger_game_event?: GameEvent;
    };
    "minecraft:run_function"?: { function: string };
    "minecraft:set_block_properties"?: {
        properties: Record<string, string>;
        offset?: [number, number, number];
        trigger_game_event?: GameEvent;
    };
    "minecraft:spawn_particles"?: {
        particle: ParticleRegistry;
        horizontal_position: ParticlePositionSource;
        vertical_position: ParticlePositionSource;
        horizontal_velocity: ParticleVelocitySource;
        vertical_velocity: ParticleVelocitySource;
        speed: number;
    };
    "minecraft:summon_entity"?: {
        entity: string[];
        join_team?: boolean;
    };
}
