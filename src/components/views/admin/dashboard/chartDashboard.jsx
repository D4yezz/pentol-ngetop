"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChartAreaInteractive() {
  const [chartData, setChartData] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/chart/products");
      const result = await res.json();

      if (result.status) {
        setProducts(result.products);
        setChartData(result.chartData);
      }
    };

    fetchData();
  }, []);
  const chartConfig = {
    p1: { label: products[0]?.nama || "Produk 1", color: "#fff" },
    p2: {
      label: products[1]?.nama || "Produk 2",
      color: "oklch(90.5% 0.182 98.111)",
    },
  };

  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0 gap-0 border-red-800 mt-4">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Produk Pentol Ngetop</CardTitle>
          <CardDescription>
            Pantau penjualan produk pentol ngetop berdasarkan waktu
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto lg:flex border-red-800"
            aria-label="Select a value"
          >
            <SelectValue placeholder="3 Bulan Terakhir" />
          </SelectTrigger>
          <SelectContent className="rounded-xl font-instrument font-medium">
            <SelectItem value="90d" className="rounded-lg">
              3 Bulan Terakhir
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 Hari Terakhir
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 Hari Terakhir
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 gradiasi-btn-merah">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full "
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-p1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-p1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-p2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-p2)"
                  stopOpacity={0.1}
                />
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
                return date.toLocaleDateString("in-ID", {
                  month: "short",
                  day: "numeric",
                });
              }}
              style={{ fill: "#fff" }}
            />
            <YAxis style={{ fill: "#fff" }} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className={"gradiasi-btn-merah text-white"}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("in-ID", {
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="p1"
              // dataKey={topProducts?.[1]}
              // dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="p2"
              // dataKey={topProducts?.[0]}
              // dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend
              className="text-white"
              content={<ChartLegendContent />}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
