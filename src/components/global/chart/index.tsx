"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";
import { chartConfig } from "./chart-config";
import { chartData } from "./chart-data";

const Chart = () => {
  return (
    <Card className="border-none  w-full lg:w-10/12 xl:w-6/12 p-[4px] rounded-xl flex flex-col bg-gradient-to-r from-demon-Yellow via-yellow-200 to-yellow-700 relative  ">
      <CardContent className=" w-full   p-8  rounded-xl flex flex-col bg-[#1E1E1E]/95  h-full">
        <ResponsiveContainer height={300} width="100%">
          <ChartContainer config={chartConfig} className="p-5">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(x) => x.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
              dataKey={"desktop"}
              type="natural"
              fill="#eec12f"
              fillOpacity={0.4}
              stroke="#eec12f"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
