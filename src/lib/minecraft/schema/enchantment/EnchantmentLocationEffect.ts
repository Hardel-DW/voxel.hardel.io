import type { AllOfEffect, AttributeEffect } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { SharedEffects } from "@/lib/minecraft/schema/enchantment/SharedEffects.ts";

export type EnchantmentLocationEffect = SharedEffects | AttributeEffect | AllOfEffect;
