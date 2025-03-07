import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/react/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/react/Select";
import { useState, useMemo } from "react";
import { calculateMedian, PACK_VERSION } from "@/lib/utils";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/react/recharts";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { VersionRangeSelect, type VersionOption } from "../VersionRangeSelect";
import { Identifier } from "@voxelio/breeze/core";
import { TextInput } from "@/components/ui/react/TextInput";

// Types for property selection
export type EnchantmentProperty = string;

// Types for property mapping configuration 
export interface PropertyMapConfig {
    label: string;
}

// Configuration des propriétés - facile à étendre en ajoutant simplement une nouvelle propriété ici
export const PROPERTY_CONFIG: Record<string, PropertyMapConfig> = {
    maxLevel: { label: "Maximum Level" },
    weight: { label: "Weight" },
    anvilCost: { label: "Anvil Cost" }
};

// Liste des propriétés supportées
export const PROPERTY_KEYS = Object.keys(PROPERTY_CONFIG);

// Configuration for chart display
export type PropertyConfig = Record<
    string,
    {
        label: string;
        color: string;
    }
>;

// Types for enchantment property data
export type EnchantmentStatData = {
    name: string;
    originalValue: number;
    averageValue: number;
    medianValue: number;
    namespace: string;
    id: string;
};

// Structure générique pour les données d'enchantement optimisées
export interface OptimizedEnchantmentData {
    identifier: string;
    namespace: string;
    name: string;
    version: number;
    properties: Record<string, number>;
    history: Record<string, number[]>;
    originalValues: Record<string, number>;
}

// Type for tracking enchantment values
type EnchantmentTracker = {
    id: string;
    values: number[];
    originalValue: number;
};

// Extract namespaces from optimized data
function extractNamespaces(data: OptimizedEnchantmentData[]): string[] {
    return [...new Set(data.map(item => item.namespace))];
}

// Extract versions from optimized data
function extractVersions(data: OptimizedEnchantmentData[]): number[] {
    return [...new Set(data.map(item => item.version))].sort((a, b) => a - b);
}

// Process optimized data to extract statistics
function processEnchantmentData(
    data: OptimizedEnchantmentData[],
    selectedNamespace: string,
    fromVersion: string,
    toVersion: string,
    selectedProperty: EnchantmentProperty,
    maxValueFilter: string
): EnchantmentTracker[] {
    // Skip if no data or namespace
    if (data.length === 0 || !selectedNamespace) {
        return [];
    }
    
    // Convert versions to numbers for comparison
    const minVersion = fromVersion ? Number.parseInt(fromVersion, 10) : 0;
    const maxVersion = toVersion ? Number.parseInt(toVersion, 10) : Number.MAX_SAFE_INTEGER;
    
    // Parse maximum value filter if provided
    const maxValue = maxValueFilter && !Number.isNaN(parseFloat(maxValueFilter)) 
        ? parseFloat(maxValueFilter) 
        : Infinity;
    
    // Filter data by namespace, version, and property value
    const filteredData = data.filter(item => {
        // Check namespace
        if (item.namespace !== selectedNamespace) return false;
        
        // Check version range
        if (item.version < minVersion || item.version > maxVersion) return false;
        
        // Check property value against max threshold
        const propValue = item.properties[selectedProperty] || 0;
        return propValue <= maxValue;
    });
    
    // Build tracker for each enchantment
    return filteredData.map(item => {
        const enchantId = item.name;
        
        // Get history array and original value
        const history = item.history[selectedProperty] || [];
        const originalValue = item.originalValues[selectedProperty] || 0;
        
        return {
            id: enchantId,
            values: history.length > 0 ? history : [item.properties[selectedProperty] || 0], 
            originalValue: originalValue
        };
    });
}

// Convert tracker data to chart data
function prepareChartData(
    trackers: EnchantmentTracker[],
    namespace: string,
    searchQuery: string
): EnchantmentStatData[] {
    if (trackers.length === 0) return [];
    
    return trackers
        .map(({ id, values, originalValue }) => {
            const average = values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
            const median = calculateMedian(values);
            
            // Ensure all values are correctly formatted
            return {
                name: new Identifier({ namespace, registry: "enchantment", resource: id}).toResourceName(),
                id,
                namespace,
                originalValue: originalValue,
                averageValue: parseFloat(average.toFixed(2)),
                medianValue: parseFloat(median.toFixed(2))
            };
        })
        .filter((item) => item.averageValue > 0 || item.medianValue > 0)
        .sort((a, b) => b.averageValue - a.averageValue)
        .filter((item) => {
            if (searchQuery.trim()) {
                return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.id.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return true;
        })
        .slice(0, 15);
}

/**
 * Component for enchantment stats analysis (maxLevel, anvilCost, weight)
 */
export function EnchantmentStatsChart(props: {
    data: OptimizedEnchantmentData[];
    title: string;
    description: string;
}) {
    // Extract namespaces and options
    const namespaces = useMemo(() => extractNamespaces(props.data), [props.data]);
    const namespaceOptions = useMemo(() => 
        namespaces.map((namespace) => ({
            value: namespace,
            label: namespace.charAt(0).toUpperCase() + namespace.slice(1).replace(/_/g, " ")
        })), 
        [namespaces]
    );

    // Extract versions and options
    const versions = useMemo(() => extractVersions(props.data), [props.data]);
    const versionOptions: VersionOption[] = useMemo(() => 
        versions.map((version) => ({
            value: version.toString(),
            label: PACK_VERSION[version.toString() as keyof typeof PACK_VERSION] || "Unknown"
        })),
        [versions]
    );

    // State for filters
    const [selectedNamespace, setSelectedNamespace] = useState<string>(namespaceOptions.length > 0 ? namespaceOptions[0].value : "");
    const [fromVersion, setFromVersion] = useState<string>(versionOptions.length > 0 ? versionOptions[0].value : "");
    const [toVersion, setToVersion] = useState<string>(versionOptions.length > 0 ? versionOptions[versionOptions.length - 1].value : "");
    const [selectedProperty, setSelectedProperty] = useState<EnchantmentProperty>(PROPERTY_KEYS[0] || "maxLevel");
    const [maxValueFilter, setMaxValueFilter] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Process logs and prepare data using memoization
    const trackers = useMemo(() => 
        processEnchantmentData(props.data, selectedNamespace, fromVersion, toVersion, selectedProperty, maxValueFilter),
        [props.data, selectedNamespace, fromVersion, toVersion, selectedProperty, maxValueFilter]
    );
    
    const statData = useMemo(() => 
        prepareChartData(trackers, selectedNamespace, searchQuery),
        [trackers, selectedNamespace, searchQuery]
    );

    // Handlers for filter changes
    const handleNamespaceChange = (value: string) => setSelectedNamespace(value);
    const handlePropertyChange = (value: string) => setSelectedProperty(value);
    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxValueFilter(e.target.value);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
    const handleFromVersionChange = (value: string) => setFromVersion(value);
    const handleToVersionChange = (value: string) => setToVersion(value);

    // Colors for different statistics
    const statColors = {
        original: "#14b8a6",
        average: "#be185d",
        median: "#7c3aed"
    };

    // Property options derived from PROPERTY_CONFIG
    const propertyOptions = Object.entries(PROPERTY_CONFIG).map(([key, config]) => ({
        value: key,
        label: config.label
    }));

    // Configuration for the chart
    const chartConfig: PropertyConfig = {
        original: { label: "Original Value", color: statColors.original },
        average: { label: "Average Value", color: statColors.average },
        median: { label: "Median Value", color: statColors.median }
    };

    // Main render
    return (
        <Card className="bg-zinc-950/50 shadow-2xl">
            <CardHeader className="flex justify-between space-y-2 border-b">
                <div className="flex w-full gap-2 p-6">
                    <div className="flex flex-col gap-1 text-center sm:text-left">
                        <CardTitle>{props.title}</CardTitle>
                        <CardDescription>{props.description}</CardDescription>
                    </div>
                    <div className="grid grid-rows-3 gap-4 justify-end w-full">
                        {/* Column 1: Search and Maximum Value */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-xs text-zinc-400 mb-1">Search</p>
                                <TextInput
                                    id="enchantment-search"
                                    className="w-full rounded-lg"
                                    type="text"
                                    placeholder="Search enchantments..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 mb-1">Maximum Value</p>
                                <TextInput
                                    id="max-value-filter"
                                    className="w-full rounded-lg"
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="Max value"
                                    value={maxValueFilter}
                                    onChange={handleMaxValueChange}
                                />
                            </div>
                        </div>
                        
                        {/* Column 2: Namespace and Property */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-zinc-400 mb-1">Namespace</p>
                                <Select value={selectedNamespace} setValue={handleNamespaceChange}>
                                    <SelectTrigger className="w-full rounded-lg" aria-label="Select a namespace">
                                        <SelectValue placeholder="Select namespace" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {namespaceOptions.map((item) => (
                                            <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-zinc-400 mb-1">Property</p>
                                <Select value={selectedProperty} setValue={handlePropertyChange}>
                                    <SelectTrigger className="w-full rounded-lg" aria-label="Select a property">
                                        <SelectValue placeholder="Select property" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {propertyOptions.map((item) => (
                                            <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        {/* Column 3: Version Range */}
                        <VersionRangeSelect
                            className="grid grid-cols-2 gap-2"
                            versionOptions={versionOptions}
                            fromVersion={fromVersion}
                            toVersion={toVersion}
                            setFromVersion={handleFromVersionChange}
                            setToVersion={handleToVersionChange}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 pt-6 pb-2">
                <div className="text-sm flex justify-between mb-4">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statColors.original }} />
                            <span>Original Value</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statColors.average }} />
                            <span>Average Value</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statColors.median }} />
                            <span>Median Value</span>
                        </div>
                    </div>
                    <div className="text-zinc-400">
                        {PROPERTY_CONFIG[selectedProperty]?.label || "Property"} Analysis
                    </div>
                </div>

                <div className="mt-4">
                    {statData.length > 0 ? (
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 12 }} />
                                    <Tooltip content={<ChartTooltipContent indicator="line" />} />
                                    <Legend />
                                    <Bar name="Original Value" dataKey="originalValue" fill={statColors.original} barSize={10} />
                                    <Bar name="Average Value" dataKey="averageValue" fill={statColors.average} barSize={10} />
                                    <Bar name="Median Value" dataKey="medianValue" fill={statColors.median} barSize={10} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    ) : (
                        <div className="flex h-full items-center justify-center text-zinc-500">
                            No data available for the selected criteria
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
