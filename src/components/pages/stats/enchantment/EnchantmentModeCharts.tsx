import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/react/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/react/Select";
import { useState, useEffect } from "react";
import type { Log } from "@voxelio/breeze";
import { PACK_VERSION } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/react/recharts";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { VersionRangeSelect, type VersionOption } from "../VersionRangeSelect";
import { Identifier } from "@voxelio/breeze/core";

// Types of enchantment modes
export type EnchantmentMode = "normal" | "soft_delete" | "only_creative";

// Configuration for mode display
export type ModeConfig = Record<
    string,
    {
        label: string;
        color: string;
    }
>;

// Types for distribution data
export type ModeDistributionData = {
    mode: string;
    count: number;
    percentage: number;
};

// Types for enchantment mode data
export type EnchantmentModeData = {
    name: string;
    [key: string]: number | string;
    total: number;
};

/**
 * Unified component for enchantment mode analysis
 */
export function EnchantmentModeChart(props: {
    logs: Log[];
    title: string;
    description: string;
}) {
    // Extract namespaces
    const namespaces = new Set<string>();
    for (const log of props.logs) {
        for (const namespace of log.datapack.namespaces) {
            if (namespace === "[object Object]") continue;
            namespaces.add(namespace);
        }
    }

    const namespaceOptions = Array.from(namespaces).map((namespace) => ({
        value: namespace,
        label: namespace.charAt(0).toUpperCase() + namespace.slice(1).replace(/_/g, " ")
    }));

    // Extract versions
    const versions = new Set<number>();
    for (const log of props.logs) {
        versions.add(log.version);
    }

    // Create version options for selects
    const versionOptions: VersionOption[] = Array.from(versions)
        .sort((a, b) => a - b)
        .map((version) => ({
            value: version.toString(),
            label: PACK_VERSION[version.toString() as keyof typeof PACK_VERSION] || "Unknown"
        }));

    // State for filters
    const [selectedNamespace, setSelectedNamespace] = useState<string>(namespaceOptions.length > 0 ? namespaceOptions[0].value : "");
    const [fromVersion, setFromVersion] = useState<string>(versionOptions.length > 0 ? versionOptions[0].value : "");
    const [toVersion, setToVersion] = useState<string>(versionOptions.length > 0 ? versionOptions[versionOptions.length - 1].value : "");

    // Data states
    const [modeData, setModeData] = useState<ModeDistributionData[]>([]);
    const [enchantmentData, setEnchantmentData] = useState<EnchantmentModeData[]>([]);

    // Calculate data when filters change
    useEffect(() => {
        // Skip if no data or namespace
        if (props.logs.length === 0 || !selectedNamespace) {
            setModeData([]);
            setEnchantmentData([]);
            return;
        }

        // Convert versions to numbers for comparison
        const minVersion = fromVersion ? Number.parseInt(fromVersion, 10) : 0;
        const maxVersion = toVersion ? Number.parseInt(toVersion, 10) : Number.MAX_SAFE_INTEGER;

        // Counter for each mode
        const modeCounter: Record<EnchantmentMode, number> = {
            normal: 0,
            soft_delete: 0,
            only_creative: 0
        };

        // Map to collect mode counts for each enchantment
        const enchantmentModes = new Map<string, Record<EnchantmentMode, number>>();

        // Process logs
        for (const log of props.logs) {
            // Skip if namespace doesn't match
            if (!log.datapack.namespaces.includes(selectedNamespace)) continue;

            // Skip if version is out of range
            if (log.version < minVersion || log.version > maxVersion) continue;

            for (const fileLog of log.logs) {
                // Only process enchantment registries
                if (fileLog.registry !== "enchantment") continue;

                // Check if this enchantment belongs to the selected namespace
                const [namespace, enchantName] = fileLog.identifier.split(":");
                if (namespace !== selectedNamespace) continue;

                // Get the enchantment name without the namespace
                const enchantId = enchantName;

                // Initialize the enchantment if not existing
                if (!enchantmentModes.has(enchantId)) {
                    enchantmentModes.set(enchantId, {
                        normal: 0,
                        soft_delete: 0,
                        only_creative: 0
                    });
                }

                // Get current mode counts
                const modes = enchantmentModes.get(enchantId) || {
                    normal: 0,
                    soft_delete: 0,
                    only_creative: 0
                };

                // Extract mode from updated enchantments
                if (fileLog.type === "updated" && fileLog.differences) {
                    const modeDiff = fileLog.differences.find((diff) => diff.path === "mode");
                    if (modeDiff && modeDiff.type === "set" && typeof modeDiff.value === "string") {
                        const mode = modeDiff.value as EnchantmentMode;
                        modeCounter[mode]++;
                        modes[mode]++;
                    }
                }

                // Extract mode from added enchantments
                if (fileLog.type === "added" && fileLog.value && typeof fileLog.value === "object") {
                    const enchantmentData = fileLog.value as Record<string, unknown>;
                    if (enchantmentData.mode && typeof enchantmentData.mode === "string") {
                        const mode = enchantmentData.mode as EnchantmentMode;
                        modeCounter[mode]++;
                        modes[mode]++;
                    } else {
                        // Default to normal if not specified
                        modeCounter.normal++;
                        modes.normal++;
                    }
                }
            }
        }

        // Calculate totals and percentages for mode data
        const totalCount = Object.values(modeCounter).reduce((sum, count) => sum + count, 0);
        const newModeData = Object.entries(modeCounter).map(([mode, count]) => ({
            mode,
            count,
            percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
        }));

        // Convert enchantment data
        const newEnchantmentData = Array.from(enchantmentModes.entries())
            .map(([enchantId, modes]) => {
                const total = modes.normal + modes.soft_delete + modes.only_creative;
                return {
                    name: new Identifier({
                        namespace: selectedNamespace,
                        registry: "enchantment",
                        resource: enchantId
                    }).toResourceName(),
                    normal: modes.normal,
                    soft_delete: modes.soft_delete,
                    only_creative: modes.only_creative,
                    total
                };
            })
            .filter((item) => item.total > 0) // Only keep items with at least one mode
            .sort((a, b) => b.total - a.total) // Sort by total count descending
            .slice(0, 20); // Limit to top 10 enchantments

        // Update state
        setModeData(newModeData);
        setEnchantmentData(newEnchantmentData);
    }, [props.logs, selectedNamespace, fromVersion, toVersion]);

    // Colors for different modes
    const modeColors = {
        normal: "#14b8a6", // teal
        soft_delete: "#be185d", // pink
        only_creative: "#7c3aed" // purple
    };

    // Configuration for the chart
    const chartConfig: ModeConfig = {
        normal: { label: "Normal", color: modeColors.normal },
        soft_delete: { label: "Soft Delete", color: modeColors.soft_delete },
        only_creative: { label: "Only Creative", color: modeColors.only_creative }
    };

    // Mode keys for stacked bar chart
    const modeKeys: EnchantmentMode[] = ["normal", "soft_delete", "only_creative"];

    // Main render
    return (
        <Card className="bg-zinc-950/50 shadow-2xl">
            <CardHeader className="flex justify-between space-y-2 border-b">
                <div className="flex w-full justify-between gap-2 p-6">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>{props.title}</CardTitle>
                        <CardDescription>{props.description}</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div>
                            <p className="text-xs text-zinc-400 mb-1">Namespace</p>
                            <Select value={selectedNamespace} setValue={setSelectedNamespace}>
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
                        <VersionRangeSelect
                            versionOptions={versionOptions}
                            fromVersion={fromVersion}
                            toVersion={toVersion}
                            setFromVersion={setFromVersion}
                            setToVersion={setToVersion}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 px-6 pt-6">
                {/* Mode Distribution Chart */}
                <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4">Mode Distribution (Count)</h3>
                    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                        <BarChart data={modeData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="mode"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => {
                                    const modeKey = value as string;
                                    return chartConfig[modeKey]?.label || modeKey;
                                }}
                            />
                            <YAxis axisLine={false} tickLine={false} tickMargin={8} />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={(value) => [value, "Count"]}
                                        labelFormatter={(value) => {
                                            const modeKey = value as string;
                                            return chartConfig[modeKey]?.label || modeKey;
                                        }}
                                    />
                                }
                            />
                            <Bar dataKey="count">
                                {modeData.map((entry) => (
                                    <Cell
                                        key={`cell-${entry.mode}`}
                                        fill={chartConfig[entry.mode as keyof typeof chartConfig]?.color || "#cccccc"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>

                {/* Summary Data */}
                <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4">Summary</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {modeData.map((item) => (
                            <div key={item.mode} className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                                <h4 className="text-zinc-200 mb-1">
                                    {chartConfig[item.mode as keyof typeof chartConfig]?.label || item.mode}
                                </h4>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-zinc-100">{item.count}</span>
                                    <span className="text-xs text-zinc-400">{item.percentage}% of total enchantments</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enchantment Mode Distribution Chart */}
                <div>
                    <h3 className="text-sm font-medium text-zinc-400 mb-4">Mode Distribution by Enchantment</h3>
                    <ChartContainer config={chartConfig} className="aspect-auto h-[400px] w-full">
                        <BarChart data={enchantmentData} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 5 }}>
                            <CartesianGrid horizontal={false} />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Legend />
                            {modeKeys.map((key) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    name={chartConfig[key as keyof typeof chartConfig]?.label || key}
                                    stackId="a"
                                    fill={chartConfig[key as keyof typeof chartConfig]?.color || "#cccccc"}
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
