import { Globe2, Infinity, RefreshCw, Wifi } from "lucide-react";
import type { Stats } from "../types/stats";
import NetworkChart from "./NetworkChart";

type AdvancedStatsProps = {
  stats: Stats;
};

export default function AdvancedStats({ stats }: AdvancedStatsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Statistiques avancées
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Illimité, réseau, top-up, couverture et positionnement prix
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <Infinity className="h-4 w-4 text-teal-600" />
            <h3 className="text-sm font-semibold">Data illimitée</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">
            {stats.nombre_offres_illimitees}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {stats.pourcentage_illimite} % du catalogue
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60">
          <div className="mb-1 flex items-center gap-2 text-slate-700">
            <Wifi className="h-4 w-4 text-sky-600" />
            <h3 className="text-sm font-semibold">Répartition réseau</h3>
          </div>
          <NetworkChart repartition={stats.repartition_network} />
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <RefreshCw className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold">Top-up disponible</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">
            {stats.pourcentage_top_up_disponible} %
          </p>
          <p className="mt-1 text-sm text-slate-500">
            des offres permettent un rechargement
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60">
          <div className="mb-3 flex items-center gap-2 text-slate-700">
            <Globe2 className="h-4 w-4 text-sky-600" />
            <h3 className="text-sm font-semibold">Zones couvertes</h3>
          </div>
          <p className="text-3xl font-semibold text-slate-900">
            {stats.nombre_zones_distinctes}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            pays et zones géographiques distincts
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60 md:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-700">
            Top 5 fournisseurs les moins chers
          </h3>
          <ul className="space-y-3">
            {stats.top_5_fournisseurs_moins_chers.map((item, index) => {
              const max = stats.top_5_fournisseurs_moins_chers[4]?.prix_moyen ?? 1;
              const width = Math.max(18, (item.prix_moyen / max) * 100);

              return (
                <li key={item.fournisseur}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {index + 1}. {item.fournisseur}
                    </span>
                    <span className="tabular-nums text-slate-500">
                      {item.prix_moyen.toFixed(2)} €
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
