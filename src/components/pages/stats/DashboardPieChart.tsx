import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/react/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/react/Select.tsx";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/react/recharts";
import React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

export function DashboardPieChart(props: {
    data: {
        version: number;
        minecraft_version: string;
        count: number;
    }[];
    per_month?: Record<string, { version: number; minecraft_version: string; count: number }[]>;
    select: {
        label: string;
        value: string;
        days: number;
    }[];
    config: Record<
        string,
        {
            label: string;
            color: string;
        }
    >;
    title: string;
    description: string;
    text: string;
}) {
    const [timeRange, setTimeRange] = React.useState("365d");

    // Filtrer les données en fonction de la période sélectionnée
    const filteredData = React.useMemo(() => {
        if (!props.per_month) return mergeByMinecraftVersion(props.data);

        const selectedRange = props.select.find((range) => range.value === timeRange);
        if (!selectedRange) return mergeByMinecraftVersion(props.data);

        // Calculer la date de début pour le filtrage
        const referenceDate = new Date();
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - selectedRange.days);

        // Convertir la date de début en format YYYY-MM pour filtrer les mois
        const startYearMonth = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;

        // Filtrer les mois qui sont postérieurs à la date de début
        const filteredMonths = Object.keys(props.per_month).filter((month) => month >= startYearMonth);

        // Calculer les totaux par version pour les mois filtrés
        const versionCounts: Record<number, { version: number; minecraft_version: string; count: number }> = {};

        for (const month of filteredMonths) {
            const monthData = props.per_month[month];
            if (!monthData) continue;

            for (const item of monthData) {
                if (!versionCounts[item.version]) {
                    versionCounts[item.version] = {
                        version: item.version,
                        minecraft_version: item.minecraft_version,
                        count: 0
                    };
                }
                versionCounts[item.version].count += item.count;
            }
        }

        // Convertir l'objet en tableau et fusionner les entrées avec la même minecraft_version
        return mergeByMinecraftVersion(Object.values(versionCounts));
    }, [props.data, props.per_month, props.select, timeRange]);

    // Fonction pour fusionner les entrées avec la même minecraft_version
    function mergeByMinecraftVersion(data: { version: number; minecraft_version: string; count: number }[]) {
        const merged: Record<string, { version: number; minecraft_version: string; count: number }> = {};

        for (const item of data) {
            if (!merged[item.minecraft_version]) {
                merged[item.minecraft_version] = {
                    version: item.version,
                    minecraft_version: item.minecraft_version,
                    count: 0
                };
            }
            merged[item.minecraft_version].count += item.count;
        }

        return Object.values(merged).sort((a, b) => b.count - a.count);
    }

    return (
        <Card className="bg-zinc-950/50 shadow-2xl flex flex-col h-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left px-6 pt-6">
                    <CardTitle>{props.title}</CardTitle>
                    <CardDescription>{props.description}</CardDescription>
                </div>
                <Select value={timeRange} setValue={setTimeRange}>
                    <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a time range">
                        <SelectValue placeholder="Last year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        {props.select.map((item) => (
                            <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer config={props.config} className="mx-auto w-full">
                    <PieChart margin={{ left: 80, right: 80 }}>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="minecraft_version" />}
                            verticalAlign="middle"
                            align="left"
                            layout="vertical"
                            className="-translate-x-4 flex-col gap-2 *:w-full"
                        />
                        <Pie
                            label
                            data={filteredData}
                            dataKey="count"
                            nameKey="minecraft_version"
                            innerRadius={80}
                            outerRadius={120}
                            cx="70%"
                            cy="50%"
                            strokeWidth={1}>
                            {filteredData.map((entry) => (
                                <Cell key={`cell-${entry.minecraft_version}`} fill={props.config[entry.minecraft_version]?.color} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-3xl font-bold">
                                                    {filteredData.reduce((acc, curr) => acc + curr.count, 0).toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-white">
                                                    {props.text}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
