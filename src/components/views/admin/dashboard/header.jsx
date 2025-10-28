"use client";
import { Bar, BarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartAreaInteractive } from "./chartDashboard";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export default function HeaderDashboard() {
  return (
    <div className="flex flex-col px-8 mt-6 gap-2">
      <h1 className="text-3xl font-semibold gradiasi-btn-merah text-transparent bg-clip-text font-inter">
        Ringkasan Penjualan
      </h1>
      <p>Pantau website pentol ngetop dengan praktis</p>
    </div>
  );
}
