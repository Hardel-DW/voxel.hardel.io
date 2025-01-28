import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/recharts";
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
    const groupedData = props.data.reduce<GroupedData[]>((acc, curr) => {
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
        <Card className="bg-zinc-950/50 shadow-2xl">
            <CardHeader className="px-12 pt-12">
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={props.config}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: -20
                        }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis dataKey="name" type="category" tickLine={false} tickMargin={10} axisLine={false} width={140} />
                        <XAxis dataKey="value" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Bar dataKey="value" layout="vertical" fill="#be185d" radius={12}>
                            <LabelList dataKey="value" position="right" offset={8} className="fill-white" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
