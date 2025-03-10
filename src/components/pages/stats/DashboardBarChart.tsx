import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/react/Card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/react/Select.tsx";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/react/recharts";
import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

type GroupedData = {
    occurence: number;
    proportion: number;
    namespaces: string[];
    label: number;
};

export function DashboardBarChart(props: {
    data: {
        namespace: string;
        occurence: number;
        proportion: number;
    }[];
    per_month?: Record<
        string,
        {
            namespace: string;
            occurence: number;
            proportion: number;
        }[]
    >;
    select?: {
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
}) {
    const [timeRange, setTimeRange] = React.useState("365d");

    // Filter data based on time range
    const filteredData = React.useMemo(() => {
        if (!props.per_month || !props.select) return props.data;

        const selectedRange = props.select.find((range) => range.value === timeRange);
        if (!selectedRange) return props.data;

        // Calculate start date for filtering
        const referenceDate = new Date();
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - selectedRange.days);

        // Convert start date to YYYY-MM format for filtering months
        const startYearMonth = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;

        // Filter months after start date
        const filteredMonths = Object.keys(props.per_month).filter((month) => month >= startYearMonth);

        // If no months are found, return the original data
        if (filteredMonths.length === 0) return props.data;

        // Aggregate namespaces across filtered months
        const namespaceCounts: Record<
            string,
            {
                namespace: string;
                occurence: number;
                proportion: number;
            }
        > = {};

        for (const month of filteredMonths) {
            const monthData = props.per_month[month];
            if (!monthData) continue;

            for (const item of monthData) {
                if (!namespaceCounts[item.namespace]) {
                    namespaceCounts[item.namespace] = {
                        namespace: item.namespace,
                        occurence: 0,
                        proportion: 0
                    };
                }
                namespaceCounts[item.namespace].occurence += item.occurence;
            }
        }

        // Calculate proportions based on total occurrences
        const totalOccurences = Object.values(namespaceCounts).reduce((sum, item) => sum + item.occurence, 0);

        for (const namespace in namespaceCounts) {
            namespaceCounts[namespace].proportion =
                totalOccurences > 0 ? (namespaceCounts[namespace].occurence / totalOccurences) * 100 : 0;
        }

        // Sort by occurrence and limit to top 10
        return Object.values(namespaceCounts)
            .sort((a, b) => b.occurence - a.occurence)
            .slice(0, 15);
    }, [props.data, props.per_month, props.select, timeRange]);

    // Group namespaces with the same occurrence
    const groupedData = filteredData.reduce<GroupedData[]>((acc, curr) => {
        const existingGroup = acc.find((g) => g.occurence === curr.occurence);
        if (existingGroup) {
            existingGroup.namespaces.push(curr.namespace);
        } else {
            acc.push({
                occurence: curr.occurence,
                proportion: curr.proportion,
                namespaces: [curr.namespace],
                label: curr.occurence
            });
        }
        return acc;
    }, []);

    const chartData = groupedData.map((item) => ({
        name: item.namespaces.join(", "),
        value: item.occurence,
        proportion: item.proportion
    }));

    return (
        <Card className="bg-zinc-950/50 shadow-2xl flex flex-col h-full">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left px-6 pt-6">
                    <CardTitle>{props.title}</CardTitle>
                    <CardDescription>{props.description}</CardDescription>
                </div>
                {props.select && (
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
                )}
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center pt-6 pb-6 px-2">
                <div className="w-full min-h-[300px]">
                    <ChartContainer config={props.config} className="w-full h-full">
                        <BarChart accessibilityLayer data={chartData} layout="vertical" width={500} height={300} margin={{ right: 30 }}>
                            <CartesianGrid horizontal={false} />
                            <YAxis dataKey="name" type="category" tickLine={false} tickMargin={10} axisLine={false} width={140} />
                            <XAxis dataKey="value" type="number" hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="value" layout="vertical" fill="#be185d" radius={12} minPointSize={3}>
                                <LabelList dataKey="value" position="right" offset={8} className="fill-white" fontSize={12} />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
