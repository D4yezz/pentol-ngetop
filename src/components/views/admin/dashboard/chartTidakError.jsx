// "use client";

// import * as React from "react";
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export const description = "An interactive area chart";

// const chartData = [
//   { date: "2025-08-01", desktop: 15, mobile: 20 },
//   { date: "2025-08-02", desktop: 23, mobile: 88 },
//   { date: "2025-08-03", desktop: 27, mobile: 90 },
//   { date: "2025-08-04", desktop: 35, mobile: 20 },
//   { date: "2025-08-05", desktop: 41, mobile: 90 },
//   { date: "2025-08-06", desktop: 48, mobile: 20 },
//   { date: "2025-08-07", desktop: 38, mobile: 40 },
//   { date: "2025-08-08", desktop: 19, mobile: 10 },
//   { date: "2025-08-27", desktop: 33, mobile: 20 },
//   { date: "2025-08-28", desktop: 12, mobile: 80 },
//   { date: "2025-08-29", desktop: 35, mobile: 40 },
//   { date: "2025-08-30", desktop: 44, mobile: 80 },
//   { date: "2025-09-01", desktop: 15, mobile: 20 },
//   { date: "2025-09-02", desktop: 23, mobile: 39 },
//   { date: "2025-09-03", desktop: 27, mobile: 90 },
//   { date: "2025-09-04", desktop: 35, mobile: 20 },
//   { date: "2025-09-05", desktop: 41, mobile: 90 },
//   { date: "2025-09-06", desktop: 48, mobile: 20 },
//   { date: "2025-09-07", desktop: 38, mobile: 60 },
//   { date: "2025-09-08", desktop: 19, mobile: 10 },
//   { date: "2025-09-27", desktop: 33, mobile: 20 },
//   { date: "2025-09-28", desktop: 12, mobile: 80 },
//   { date: "2025-09-29", desktop: 35, mobile: 40 },
//   { date: "2025-09-30", desktop: 44, mobile: 80 },
//   { date: "2025-10-01", desktop: 22, mobile: 50 },
//   { date: "2025-10-02", desktop: 9, mobile: 10 },
//   { date: "2025-10-03", desktop: 17, mobile: 20 },
//   { date: "2025-10-04", desktop: 22, mobile: 60 },
//   { date: "2025-10-05", desktop: 33, mobile: 90 },
//   { date: "2025-10-06", desktop: 31, mobile: 40 },
//   { date: "2025-10-07", desktop: 25, mobile: 80 },
//   { date: "2025-10-08", desktop: 49, mobile: 20 },
//   { date: "2025-10-09", desktop: 5, mobile: 10 },
//   { date: "2025-10-10", desktop: 21, mobile: 90 },
//   { date: "2025-10-11", desktop: 37, mobile: 50 },
//   { date: "2025-10-12", desktop: 22, mobile: 10 },
//   { date: "2025-10-13", desktop: 32, mobile: 80 },
//   { date: "2025-10-14", desktop: 17, mobile: 20 },
//   { date: "2025-10-15", desktop: 10, mobile: 70 },
//   { date: "2025-10-16", desktop: 18, mobile: 90 },
//   { date: "2025-10-17", desktop: 46, mobile: 60 },
//   { date: "2025-10-18", desktop: 34, mobile: 10 },
//   { date: "2025-10-19", desktop: 23, mobile: 80 },
//   { date: "2025-10-20", desktop: 8, mobile: 10 },
//   { date: "2025-10-21", desktop: 17, mobile: 20 },
//   { date: "2025-10-22", desktop: 24, mobile: 70 },
//   { date: "2025-10-23", desktop: 18, mobile: 30 },
//   { date: "2025-10-24", desktop: 37, mobile: 90 },
//   { date: "2025-10-25", desktop: 25, mobile: 50 },
//   { date: "2025-10-26", desktop: 7, mobile: 10 },
//   { date: "2025-10-27", desktop: 33, mobile: 20 },
//   { date: "2025-10-28", desktop: 12, mobile: 80 },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "Pedas Banget",
//     color: "#fff",
//   },
//   mobile: {
//     label: "Pedas Manis",
//     color: "oklch(90.5% 0.182 98.111)",
//   },
// };

// export function ChartAreaInteractive() {
//   const [timeRange, setTimeRange] = React.useState("90d");

//   const filteredData = chartData.filter((item) => {
//     const date = new Date(item.date);
//     const referenceDate = new Date();
//     let daysToSubtract = 90;
//     if (timeRange === "30d") {
//       daysToSubtract = 30;
//     } else if (timeRange === "7d") {
//       daysToSubtract = 7;
//     }
//     const startDate = new Date(referenceDate);
//     startDate.setDate(startDate.getDate() - daysToSubtract);
//     return date >= startDate;
//   });

//   return (
//     <Card className="pt-0 gap-0 border-red-800 mt-4">
//       <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
//         <div className="grid flex-1 gap-1">
//           <CardTitle>Produk Pentol Ngetop</CardTitle>
//           <CardDescription>
//             Pantau penjualan produk pentol ngetop berdasarkan waktu
//           </CardDescription>
//         </div>
//         <Select value={timeRange} onValueChange={setTimeRange}>
//           <SelectTrigger
//             className="w-[160px] rounded-lg sm:ml-auto lg:flex border-red-800"
//             aria-label="Select a value"
//           >
//             <SelectValue placeholder="3 Bulan Terakhir" />
//           </SelectTrigger>
//           <SelectContent className="rounded-xl font-instrument font-medium">
//             <SelectItem value="90d" className="rounded-lg">
//               3 Bulan Terakhir
//             </SelectItem>
//             <SelectItem value="30d" className="rounded-lg">
//               30 Hari Terakhir
//             </SelectItem>
//             <SelectItem value="7d" className="rounded-lg">
//               7 Hari Terakhir
//             </SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 gradiasi-btn-merah">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[250px] w-full "
//         >
//           <AreaChart data={filteredData}>
//             <defs>
//               <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString("in-ID", {
//                   month: "short",
//                   day: "numeric",
//                 });
//               }}
//               style={{ fill: "#fff" }}
//             />
//             <YAxis style={{ fill: "#fff" }} />
//             <ChartTooltip
//               cursor={false}
//               content={
//                 <ChartTooltipContent
//                   className={"gradiasi-btn-merah text-white"}
//                   labelFormatter={(value) => {
//                     return new Date(value).toLocaleDateString("in-ID", {
//                       month: "long",
//                       day: "numeric",
//                       weekday: "long",
//                     });
//                   }}
//                   indicator="dot"
//                 />
//               }
//             />
//             <Area
//               dataKey="mobile"
//               type="natural"
//               fill="url(#fillMobile)"
//               stroke="var(--color-mobile)"
//               stackId="a"
//             />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="url(#fillDesktop)"
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//             <ChartLegend
//               className="text-white"
//               content={<ChartLegendContent />}
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }