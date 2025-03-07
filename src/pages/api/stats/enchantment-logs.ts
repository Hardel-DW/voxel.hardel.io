import type { APIContext } from "astro";
import { db } from "@/database/db";
import { migrationLog } from "@/database/schema";
import { sql } from "drizzle-orm";
import type { FileLog, Log, FieldLogDifferenceSet } from "@voxelio/breeze";
import { PROPERTY_KEYS, type OptimizedEnchantmentData } from "@/components/pages/stats/enchantment/EnchantmentStatsCharts";

/**
 * Fetches enchantment data from the database in an optimized format
 * Returns only essential properties to reduce network payload
 */
export async function GET(_: APIContext): Promise<Response> {
    try {
        const logs = await db
            .select({
                id: migrationLog.id,
                date: migrationLog.date, 
                version: migrationLog.version,
                isModded: migrationLog.isModded,
                isMinified: migrationLog.isMinified,
                name: migrationLog.name,
                description: migrationLog.description,
                logs: migrationLog.logs
            })
            .from(migrationLog)
            .orderBy(sql`${migrationLog.date} ASC`) // Order by ASC to get oldest first for finding original values
            .limit(10000);

        // Map to store enchantment data with history
        const enchantmentMap = new Map<string, OptimizedEnchantmentData>();

        // Process all logs to extract enchantment data
        for (const log of logs) {
            const enchantmentFileEntries = log.logs.filter((entry: FileLog) => entry.registry === "enchantment");
            
            for (const entry of enchantmentFileEntries) {
                if (!entry.identifier || (entry.type !== "added" && entry.type !== "updated")) continue;
                
                const [namespace, name] = entry.identifier.split(":");
                if (!namespace || !name) continue;
                
                const identifier = entry.identifier;
                const version = log.version;
                
                // Créer un objet pour stocker les valeurs et valeurs originales
                const values: Record<string, number | null> = {};
                const origValues: Record<string, number | null> = {};
                
                if (entry.type === "added" && entry.value && typeof entry.value === "object") {
                    const data = entry.value as Record<string, unknown>;
                    
                    // Extraire les valeurs pour chaque propriété supportée
                    for (const prop of PROPERTY_KEYS) {
                        if (typeof data[prop] === "number") {
                            values[prop] = data[prop] as number;
                        }
                    }
                } else if (entry.type === "updated" && entry.differences) {
                    // Traiter chaque différence
                    for (const diff of entry.differences) {
                        if (diff.type === "set" && typeof diff.value === "number") {
                            const typedDiff = diff as FieldLogDifferenceSet;
                            
                            // Si le chemin correspond à une propriété supportée
                            if (PROPERTY_KEYS.includes(diff.path)) {
                                values[diff.path] = diff.value;
                                if (typeof typedDiff.origin_value === "number") {
                                    origValues[diff.path] = typedDiff.origin_value;
                                }
                            }
                        }
                    }
                }
                
                // Créer ou mettre à jour l'entrée dans la map
                if (!enchantmentMap.has(identifier)) {
                    // Créer un nouvel objet de données avec structure générique
                    const newData: OptimizedEnchantmentData = {
                        identifier,
                        namespace,
                        name,
                        version,
                        properties: {},     // Valeurs actuelles
                        history: {},        // Historiques des valeurs
                        originalValues: {}  // Valeurs originales
                    };
                    
                    // Initialiser les valeurs pour chaque propriété supportée
                    for (const prop of PROPERTY_KEYS) {
                        // Valeur par défaut = 0
                        newData.properties[prop] = 0;
                        newData.history[prop] = [];
                        newData.originalValues[prop] = 0;
                        
                        // Mettre à jour avec la nouvelle valeur si disponible
                        const value = values[prop];
                        if (value !== null && value !== undefined) {
                            newData.properties[prop] = value;
                            newData.history[prop].push(value);
                            newData.originalValues[prop] = value;
                        }
                    }
                    
                    enchantmentMap.set(identifier, newData);
                } else {
                    // Mettre à jour l'entrée existante
                    const existing = enchantmentMap.get(identifier)!;
                    
                    // Mettre à jour pour chaque propriété
                    for (const prop of PROPERTY_KEYS) {
                        const value = values[prop];
                        const origValue = origValues[prop];
                        
                        if (value !== null && value !== undefined) {
                            // Mettre à jour la valeur actuelle
                            existing.properties[prop] = value;
                            
                            // Ajouter à l'historique (créer tableau si nécessaire)
                            if (!existing.history[prop]) existing.history[prop] = [];
                            existing.history[prop].push(value);
                            
                            // Mettre à jour la valeur originale si nécessaire
                            if (origValue !== null && 
                                (existing.originalValues[prop] === undefined || existing.originalValues[prop] === 0)) {
                                existing.originalValues[prop] = origValue;
                            }
                        }
                    }
                    
                    // Mettre à jour la version
                    existing.version = version;
                }
            }
        }

        // Convert map to array of enchantment data
        const optimizedEnchantments = Array.from(enchantmentMap.values());

        return new Response(JSON.stringify(optimizedEnchantments), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error fetching enchantment data:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch enchantment data" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
