import type { Enchantment, EnchantmentCost } from "@voxelio/breeze/schema";
import toRoman from "@/lib/minecraft/utils";

/**
 * Represents a Minecraft enchantment with its properties and calculation methods.
 * Handles enchantment levels, costs, and compatibility with bookshelves.
 */
export class Enchant {
    /**
     * Creates a new Enchant instance
     * @param enchant The enchantment data containing properties like max_level, costs, etc.
     */
    constructor(public readonly enchant: Enchantment) {
        this.enchant = enchant;
    }

    /**
     * Gets the maximum level for this enchantment
     * @returns The maximum possible level for this enchantment
     * @example
     * const enchant = new Enchant({max_level: 3, ...});
     * enchant.getMaxLevel(); // Returns 3
     */
    public getMaxLevel() {
        return this.enchant.max_level;
    }

    /**
     * Gets the maximum level for this enchantment in Roman numerals
     * @returns The maximum possible level for this enchantment in Roman numerals
     * @example
     * const enchant = new Enchant({max_level: 3, ...});
     * enchant.getMaxLevelInRoman(); // Returns "III"
     */
    public getMaxLevelInRoman() {
        return toRoman(this.enchant.max_level);
    }

    /**
     * Checks if this enchantment is obtainable with a given number of bookshelves
     * and enchantability level
     * @param bookshelves Number of bookshelves around the enchanting table
     * @param enchantability The enchantability value of the item
     * @returns True if the enchantment is obtainable with these parameters
     * @example
     * const enchant = new Enchant({...});
     * enchant.isObtainableWithBookshelves(15, 10); // Returns true/false based on calculations
     */
    public isObtainableWithBookshelves(bookshelves: number, enchantability: number): boolean {
        const baseLevel = this.calculateBaseLevel(bookshelves);
        const modifiedLevels = this.calculatePossibleModifiedLevels(baseLevel, enchantability);

        return modifiedLevels.some((level) => this.isLevelInEnchantmentRange(level));
    }

    private calculateBaseLevel(bookshelves: number): number {
        // Each bookshelf adds 2 levels, max 30 at 15 bookshelves
        return Math.min(bookshelves * 2, 30);
    }

    private calculatePossibleModifiedLevels(baseLevel: number, enchantability: number): number[] {
        const levels: number[] = [];
        // Simulate multiple attempts to account for randomness
        for (let i = 0; i < 10; i++) {
            levels.push(this.calculateModifiedLevel(baseLevel, enchantability));
        }
        return levels;
    }

    private calculateModifiedLevel(baseLevel: number, enchantability: number): number {
        // Step 1: Apply enchantability modifier
        const r1 = this.getRandomEnchantabilityModifier(enchantability);
        const r2 = this.getRandomEnchantabilityModifier(enchantability);
        let level = baseLevel + r1 + r2 + 1;

        // Step 2: Apply random bonus (0.85 to 1.15)
        level = this.applyRandomBonus(level);

        return Math.max(1, level);
    }

    private getRandomEnchantabilityModifier(enchantability: number): number {
        const max = Math.floor(enchantability / 4);
        return Math.floor(Math.random() * (max + 1));
    }

    private applyRandomBonus(level: number): number {
        const bonus = 1 + (Math.random() + Math.random() - 1) * 0.15;
        return Math.round(level * bonus);
    }

    private isLevelInEnchantmentRange(level: number): boolean {
        const minRequired = this.calculateCostForLevel(this.enchant.min_cost, 1);
        const maxAllowed = this.calculateCostForLevel(this.enchant.max_cost, this.enchant.max_level);
        return level >= minRequired && level <= maxAllowed;
    }

    private calculateCostForLevel(cost: EnchantmentCost, level: number): number {
        if (level === 1) {
            return cost.base;
        }
        const levelsAboveFirst = level - 1;
        return cost.base + cost.per_level_above_first * levelsAboveFirst;
    }
}
