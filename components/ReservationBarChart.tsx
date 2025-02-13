"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { MONTH_MAPPING } from "@/app/utils/constants"
import { Card, CardContent } from "./ui/card"
import { ReservationBarChartData } from "@/app/dashboard/barChart"

type PropsType = {
    chartData: Array<ReservationBarChartData>,
    chartConfig: ChartConfig
}

export function ReservationsBarChart({ chartData, chartConfig }: Readonly<PropsType>) {
    console.log('chartData: ', chartData, chartConfig)
    return (
        <Card className="flex flex-col items-center p-4">
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px]">
                    <BarChart
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
                            // minTickGap={32}
                            tickFormatter={(value: number) => MONTH_MAPPING[value].slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        {/* MARK: TODO: RCA and fix app crash  */}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(_, payload) => {
                                        return MONTH_MAPPING[payload[0]?.payload?.month]
                                    }}
                                    indicator="line"
                                />
                            }
                            cursor={false}
                            defaultIndex={1}
                        />

                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="reservation" fill="var(--color-reservation)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
