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
import supabase from "@/lib/db";

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [chartData, setChartData] = React.useState([]);
  const [topProducts, setTopProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [chartConfig, setChartConfig] = React.useState({
    visitors: { label: "Visitors" },
  });

  const fetchTopProducts = async () => {
    try {
      const { data: topProductsData, error } = await supabase
        .from("order_items")
        .select("product_id, product:product_id(id, nama)")
        .order("quantity", { ascending: false });

      if (error) throw error;

      const productCount = {};
      topProductsData.forEach((item) => {
        const productId = item.product_id;
        productCount[productId] = (productCount[productId] || 0) + 1;
      });

      const sortedProducts = Object.entries(productCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([productId]) => parseInt(productId));

      const { data: productsDetail, error: productError } = await supabase
        .from("product")
        .select("id, nama")
        .in("id", sortedProducts);

      if (productError) throw productError;

      setTopProducts(productsDetail);
      return productsDetail;
    } catch (error) {
      console.error("Error fetching top products:", error);
      return [];
    }
  };

  const fetchSalesData = async (products) => {
    if (!products || products.length === 0) return;

    try {
      const daysToSubtract =
        timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysToSubtract);

      const { data: orderData, error } = await supabase
        .from("order_items")
        .select("product_id, quantity, created_at")
        .in(
          "product_id",
          products.map((p) => p.id)
        )
        .gte("created_at", startDate.toISOString());

      if (error) throw error;

      const groupedData = {};

      orderData.forEach((item) => {
        const date = new Date(item.created_at).toISOString().split("T")[0];

        if (!groupedData[date]) {
          groupedData[date] = {};
          products.forEach((product) => {
            groupedData[date][`product_${product.id}`] = 0;
          });
        }

        groupedData[date][`product_${item.product_id}`] += item.quantity;
      });

      const formattedData = Object.entries(groupedData)
        .map(([date, values]) => ({
          date,
          ...values,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setChartData(formattedData);

      const config = {
        visitors: { label: "Penjualan" },
      };

      products.forEach((product, index) => {
        config[`product_${product.id}`] = {
          label: product.nama,
          color: index === 0 ? "#fff" : "oklch(90.5% 0.182 98.111)",
        };
      });

      setChartConfig(config);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const products = await fetchTopProducts();
      await fetchSalesData(products);
    };

    loadData();
  }, [timeRange]);

  if (loading) {
    return (
      <Card className="pt-0 gap-0 border-red-800 mt-4">
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-white">Memuat data...</p>
        </CardContent>
      </Card>
    );
  }

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
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              {topProducts.map((product, index) => (
                <linearGradient
                  key={product.id}
                  id={`fill_product_${product.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartConfig[`product_${product.id}`]?.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[`product_${product.id}`]?.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
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
                return date.toLocaleDateString("id-ID", {
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
                  className="gradiasi-btn-merah text-white"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {topProducts.map((product, index) => (
              <Area
                key={product.id}
                dataKey={`product_${product.id}`}
                type="natural"
                fill={`url(#fill_product_${product.id})`}
                stroke={chartConfig[`product_${product.id}`]?.color}
                stackId="a"
              />
            ))}
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
