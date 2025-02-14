"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { status: "confirmed", count: 275, fill: "var(--color-confirmed)" },
  { status: "canceled", count: 200, fill: "var(--color-canceled)" },
  { status: "finished", count: 287, fill: "var(--color-finished)" },
  { status: "noShow", count: 173, fill: "var(--color-noShow)" },
]

const chartConfig = {
  reservations: {
    label: "Reservations",
  },
  confirmed: {
    label: "Confirmed",
    color: "hsl(var(--chart-1))",
  },
  canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-2))",
  },
  finished: {
    label: "Finished",
    color: "hsl(var(--chart-3))",
  },
  noShow: {
    label: "NoShow",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function StatusPieChart() {
  const totalReservations = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col items-center p-4 grow">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[250px] overflow-hidden"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalReservations.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Reservations
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent className="flex-wrap" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
