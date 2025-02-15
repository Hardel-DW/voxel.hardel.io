import type { DataDrivenRegistryElement } from "@voxelio/breeze";
import type { Enchant } from "./Enchantment";
import type { TagType } from "@voxelio/breeze/schema";
import TagsComparator from "../tags/TagsComparator";

interface EnchantmentResult {
    level: number;
    enchantments: Array<{
        enchantment: Enchant;
        level: number;
    }>;
}

/**
 * Simulates Minecraft's enchantment system, including enchantment selection,
 * level calculation, and compatibility checking.
 */
export class EnchantmentSimulator {
    /**
     * Creates a new EnchantmentSimulator instance
     * @param enchantments Map of available enchantments
     * @param exclusivityTags Optional array of tags defining enchantment incompatibilities
     */
    constructor(
        private enchantments: Map<string, Enchant>,
        private exclusivityTags?: DataDrivenRegistryElement<TagType>[]
    ) {}

    /**
     * Simulates possible enchantment options for given parameters
     * @param bookshelves Number of bookshelves around the enchanting table
     * @param enchantability The enchantability value of the item
     * @returns Array of possible enchantment results with levels
     * @example
     * const simulator = new EnchantmentSimulator(enchantments, exclusivityTags);
     * const options = simulator.simulateEnchantmentOptions(15, 10);
     * // Returns array of possible enchantment combinations with their levels
     */
    public simulateEnchantmentOptions(bookshelves: number, enchantability: number): EnchantmentResult[] {
        const baseOptions = this.calculateBaseOptions(bookshelves);
        return baseOptions.map((baseLevel) => this.simulateSingleOption(baseLevel, enchantability));
    }

    private calculateBaseOptions(bookshelves: number): number[] {
        const baseLevel = this.calculateBaseLevel(bookshelves);
        return [
            Math.max(1, Math.floor(baseLevel / 3)), // Option basse
            Math.floor((baseLevel * 2) / 3), // Option moyenne
            Math.max(1, baseLevel) // Option haute
        ];
    }

    private simulateSingleOption(baseLevel: number, enchantability: number): EnchantmentResult {
        const modifiedLevel = this.calculateModifiedLevel(baseLevel, enchantability);
        const possibleEnchantments = this.getPossibleEnchantments(modifiedLevel);
        const selectedEnchantments = this.selectCompatibleEnchantments(possibleEnchantments);

        return {
            level: modifiedLevel,
            enchantments: selectedEnchantments
        };
    }

    private calculateBaseLevel(bookshelves: number): number {
        return Math.min(bookshelves * 2, 30);
    }

    private calculateModifiedLevel(baseLevel: number, enchantability: number): number {
        // Step 1: Apply enchantability modifier
        const r1 = this.getRandomEnchantabilityModifier(enchantability);
        const r2 = this.getRandomEnchantabilityModifier(enchantability);
        let level = baseLevel + r1 + r2 + 1;

        // Step 2: Apply random bonus (0.85 to 1.15)
        const bonus = 1 + (Math.random() + Math.random() - 1) * 0.15;
        level = Math.round(level * bonus);

        return Math.max(1, level);
    }

    private getRandomEnchantabilityModifier(enchantability: number): number {
        const max = Math.floor(enchantability / 4);
        return Math.floor(Math.random() * (max + 1));
    }

    private getPossibleEnchantments(level: number): Array<{ enchant: Enchant; weight: number }> {
        return Array.from(this.enchantments.values())
            .filter((enchant) => enchant.isObtainableWithBookshelves(level, 1))
            .map((enchant) => ({
                enchant,
                weight: enchant.enchant.weight
            }));
    }

    private isEnchantmentCompatible(newEnchant: Enchant, selectedEnchantments: Array<{ enchantment: Enchant; level: number }>): boolean {
        if (!this.exclusivityTags) return true;

        // Vérifie les incompatibilités pour chaque enchantement déjà sélectionné
        for (const { enchantment: existingEnchant } of selectedEnchantments) {
            if (this.areEnchantmentsIncompatible(newEnchant, existingEnchant)) {
                return false;
            }
        }
        return true;
    }

    private areEnchantmentsIncompatible(enchant1: Enchant, enchant2: Enchant): boolean {
        if (!enchant1.enchant.exclusive_set || !enchant2.enchant.exclusive_set) {
            return false;
        }

        // Vérifie les tags d'exclusivité directs
        if (this.checkDirectExclusivity(enchant1, enchant2)) {
            return true;
        }

        // Vérifie les tags d'exclusivité via les tags
        return this.checkTagExclusivity(enchant1, enchant2);
    }

    private checkDirectExclusivity(enchant1: Enchant, enchant2: Enchant): boolean {
        const exclusive1 = this.normalizeExclusiveSet(enchant1.enchant.exclusive_set);
        const exclusive2 = this.normalizeExclusiveSet(enchant2.enchant.exclusive_set);

        // Trouver les identifiants dans la Map
        const enchant1Id = this.findEnchantmentId(enchant1);
        const enchant2Id = this.findEnchantmentId(enchant2);

        if (!enchant1Id || !enchant2Id) return false;

        // Vérifie si l'un contient l'autre directement
        return exclusive1.includes(enchant2Id) || exclusive2.includes(enchant1Id);
    }

    /**
     * Trouve l'identifiant d'un enchantement dans la Map
     */
    private findEnchantmentId(enchant: Enchant): string | undefined {
        for (const [id, mapEnchant] of this.enchantments.entries()) {
            if (mapEnchant === enchant) {
                return id;
            }
        }
        return undefined;
    }

    private checkTagExclusivity(enchant1: Enchant, enchant2: Enchant): boolean {
        if (!this.exclusivityTags) return false;

        const tagsComparator = new TagsComparator(this.exclusivityTags);
        const tagValues = tagsComparator.getAllValues();

        // Vérifie si les deux enchantements sont dans le même tag d'exclusivité
        return tagValues.some((tagValue) => {
            const exclusive1 = this.normalizeExclusiveSet(enchant1.enchant.exclusive_set);
            const exclusive2 = this.normalizeExclusiveSet(enchant2.enchant.exclusive_set);
            return exclusive1.includes(tagValue) && exclusive2.includes(tagValue);
        });
    }

    private normalizeExclusiveSet(exclusiveSet: string | string[] | undefined): string[] {
        if (!exclusiveSet) return [];
        return Array.isArray(exclusiveSet) ? exclusiveSet : [exclusiveSet];
    }

    private selectCompatibleEnchantments(
        possibleEnchantments: Array<{ enchant: Enchant; weight: number }>
    ): Array<{ enchantment: Enchant; level: number }> {
        const selectedEnchantments: Array<{ enchantment: Enchant; level: number }> = [];
        let remainingEnchantments = [...possibleEnchantments];

        // Sélectionner au moins un enchantement
        const firstEnchant = this.selectWeightedRandom(remainingEnchantments);
        if (firstEnchant) {
            selectedEnchantments.push({
                enchantment: firstEnchant.enchant,
                level: this.getRandomEnchantmentLevel(firstEnchant.enchant)
            });
            remainingEnchantments = remainingEnchantments.filter((e) => e !== firstEnchant);
        }

        // 50% de chance d'ajouter un autre enchantement compatible
        while (remainingEnchantments.length > 0 && Math.random() < 0.5) {
            // Filtrer les enchantements compatibles
            const compatibleEnchantments = remainingEnchantments.filter((e) =>
                this.isEnchantmentCompatible(e.enchant, selectedEnchantments)
            );

            if (compatibleEnchantments.length === 0) break;

            const nextEnchant = this.selectWeightedRandom(compatibleEnchantments);
            if (nextEnchant) {
                selectedEnchantments.push({
                    enchantment: nextEnchant.enchant,
                    level: this.getRandomEnchantmentLevel(nextEnchant.enchant)
                });
                remainingEnchantments = remainingEnchantments.filter((e) => e !== nextEnchant);
            }
        }

        return selectedEnchantments;
    }

    private selectWeightedRandom(enchantments: Array<{ enchant: Enchant; weight: number }>): { enchant: Enchant; weight: number } | null {
        const totalWeight = enchantments.reduce((sum, e) => sum + e.weight, 0);
        if (totalWeight === 0) return null;

        let random = Math.random() * totalWeight;
        for (const enchant of enchantments) {
            random -= enchant.weight;
            if (random <= 0) {
                return enchant;
            }
        }
        return enchantments[0];
    }

    private getRandomEnchantmentLevel(enchant: Enchant): number {
        return Math.floor(Math.random() * enchant.getMaxLevel()) + 1;
    }
}
