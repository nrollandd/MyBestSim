"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type NetworkChartProps = {
  repartition: {
    "4G": number;
    "5G": number;
  };
};

/** Couleurs alignées sur la charte du dashboard (sky / teal). */
const COLORS = {
  "4G": "#0ea5e9",
  "5G": "#0d9488",
};

export default function NetworkChart({ repartition }: NetworkChartProps) {
  const total = repartition["4G"] + repartition["5G"];

  const data = [
    { name: "4G", value: repartition["4G"], color: COLORS["4G"] },
    { name: "5G", value: repartition["5G"], color: COLORS["5G"] },
  ];

  const formatPercent = (value: number) =>
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="relative mx-auto h-72 w-full max-w-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={64}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              /* Ancré en haut du conteneur (x suit le curseur) : ne chevauche
                 jamais le total au centre du donut. */
              position={{ y: 0 }}
              allowEscapeViewBox={{ x: true, y: true }}
              /* Au-dessus du texte central (z-auto) et de tout le reste. */
              wrapperStyle={{ zIndex: 50 }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
              }}
              formatter={(value, name) => {
                const v = Number(value);
                return [
                  `${v.toLocaleString("fr-FR")} offres (${formatPercent(v)} %)`,
                  String(name),
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Total centré dans l'anneau */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold tracking-tight text-slate-900">
            {total.toLocaleString("fr-FR")}
          </p>
          <p className="text-xs text-slate-500">produits</p>
        </div>
      </div>

      {/* Légende informative : label — nombre d'offres (%), une ligne par entrée */}
      <ul className="mt-4 space-y-1.5">
        {data.map((entry) => (
          <li
            key={entry.name}
            className="flex items-center justify-center gap-2 text-sm text-slate-600"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden
            />
            <span className="font-semibold text-slate-800">{entry.name}</span>
            <span>
              — {entry.value.toLocaleString("fr-FR")} offres (
              {formatPercent(entry.value)} %)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
