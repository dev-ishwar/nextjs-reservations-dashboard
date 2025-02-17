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

type PropsType = {
  statusCount: { count: number, label: string, status: string }[]
}

export function StatusPieChart({ statusCount }: Readonly<PropsType>) {

  const chartData = React.useMemo(() => {
    return statusCount.map(item => {
      switch (item.status) {
        case 'confirmed': return { ...item, fill: "var(--color-confirmed)" };
        case 'canceled': return { ...item, fill: "var(--color-canceled)" };
        case 'finished': return { ...item, fill: "var(--color-finished)" };
        case 'noShow': return { ...item, fill: "var(--color-noShow)" };
        default: return { ...item };
      }
    })
  }, [statusCount])

  const totalReservations = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

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
