"use client";

import { Bar, BarChart, Cell, LabelList } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



export function ChartBarNegative({data}) {


 

  const chartData = data.map((s) => ({
    name: s.symbol,
    percent_change: Number(s.percent_change_24h),
  }));



  const chartConfig = {
    percent_change: {
      label: "PERCENT CHANGE",
    },
  };

  return (
    <>
      <Card className=" bg-neutral-900">
        <CardHeader>
          <CardTitle className=" text-neutral-100 pl-32">
            1 DAY PERCENT CHANGE
    
          </CardTitle>
        </CardHeader>
        <CardContent className=" bg-neutral-900">
          <ChartContainer className=" h-[250px]" config={chartConfig}>
            <BarChart
              className=" h-[250px]"
              accessibilityLayer
              data={chartData}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar dataKey="percent_change">
                <LabelList position="top" dataKey="name" fillOpacity={1} />
                {chartData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={
                      item.percent_change > 0
                        ? "var(--chart-2)"
                        : "var(--chart-1)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
