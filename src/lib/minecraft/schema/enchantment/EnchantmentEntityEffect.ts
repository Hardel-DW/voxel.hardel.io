import type { AllOfEffect } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { SharedEffects } from "@/lib/minecraft/schema/enchantment/SharedEffects.ts";

export type EnchantmentEntityEffect = SharedEffects | AllOfEffect;
