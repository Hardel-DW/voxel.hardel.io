import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/react/Card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/react/recharts";
import { Cell, Label, Pie, PieChart } from "recharts";

export function DashboardPieChart(props: {
    data: {
        version: number;
        minecraft_version: string;
        count: number;
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
    return (
        <Card className="bg-zinc-950/50 shadow-2xl flex flex-col h-full">
            <CardHeader className="px-12 pt-12">
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
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
                            data={props.data}
                            dataKey="count"
                            nameKey="minecraft_version"
                            innerRadius={80}
                            outerRadius={120}
                            cx="70%"
                            cy="50%"
                            strokeWidth={1}>
                            {props.data.map((entry) => (
                                <Cell key={entry.minecraft_version} fill={props.config[entry.minecraft_version]?.color} />
                            ))}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-3xl font-bold">
                                                    {props.data.reduce((acc, curr) => acc + curr.count, 0).toLocaleString()}
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
