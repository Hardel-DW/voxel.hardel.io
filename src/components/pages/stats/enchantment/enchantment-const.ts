import type { PropertyMapConfig } from "./EnchantmentStatsCharts";

// Configuration des propriétés - facile à étendre en ajoutant simplement une nouvelle propriété ici
export const PROPERTY_CONFIG: Record<string, PropertyMapConfig> = {
    maxLevel: { label: "Maximum Level" },
    weight: { label: "Weight" },
    anvilCost: { label: "Anvil Cost" }
};

// Liste des propriétés supportées
export const PROPERTY_KEYS = Object.keys(PROPERTY_CONFIG);
