import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import React from "react";

export function DashboardInteractiveAreaChart(props: {
    data: {
        date: string;
        value: number;
    }[];
    config: {
        label: string;
        color: string;
    };
    select: {
        label: string;
        value: string;
        days: number;
    }[];
    title: string;
    description: string;
}) {
    const [timeRange, setTimeRange] = React.useState("90d");

    const filteredData = props.data.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date();
        const selectedRange = props.select.find((range) => range.value === timeRange);
        const daysToSubtract = selectedRange?.days ?? 90;

        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    const maxValue = Math.max(...filteredData.map((item) => item.value));

    return (
        <Card className="bg-zinc-950/50 shadow-2xl">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-6 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left px-6 pt-6">
                    <CardTitle>{props.title}</CardTitle>
                    <CardDescription>{props.description}</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
                        <SelectValue placeholder="Last 3 months" />
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
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={{ [props.config.label]: props.config }} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id={`fillValue-${props.config.label}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={props.config.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={props.config.color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                });
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickMargin={8}
                            domain={[0, maxValue + Math.ceil(maxValue * 0.1)]}
                            scale="linear"
                            allowDataOverflow={false}
                            tickCount={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric"
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="value"
                            type="monotone"
                            fill={`url(#fillValue-${props.config.label})`}
                            stroke={props.config.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
