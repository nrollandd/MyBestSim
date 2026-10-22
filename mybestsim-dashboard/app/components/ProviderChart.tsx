"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProviderChartProps = {
  repartition: Record<string, number>;
};

export default function ProviderChart({ repartition }: ProviderChartProps) {
  const data = Object.entries(repartition)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-200/60 backdrop-blur-sm sm:p-6">
      <div className="mb-4 sm:mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Répartition par fournisseur
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Nombre de produits eSIM par fournisseur (18 catalogues)
        </p>
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="h-[440px] min-w-[560px] sm:h-[520px] sm:min-w-0 sm:w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 20, left: 8, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e2e8f0"
              />
              <XAxis
                type="number"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={108}
                tick={{ fill: "#334155", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(13, 148, 136, 0.08)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
                formatter={(value) => [`${value} produits`, "Volume"]}
              />
              <Bar
                dataKey="count"
                fill="#0d9488"
                radius={[0, 8, 8, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
