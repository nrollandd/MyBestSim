import {
  BadgeEuro,
  ChartColumn,
  Database,
  Layers3,
  Scale,
  Wallet,
} from "lucide-react";
import statsJson from "@/public/stats.json";
import AdvancedStats from "./components/AdvancedStats";
import DashboardFooter from "./components/DashboardFooter";
import DashboardHeader from "./components/DashboardHeader";
import ProviderChart from "./components/ProviderChart";
import StatCard from "./components/StatCard";
import type { Stats } from "./types/stats";

const stats = statsJson as Stats;

function formatEuro(value: number) {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })} €`;
}

export default function Home() {

  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-teal-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(14,165,233,0.18), transparent 34%), radial-gradient(circle at 88% 12%, rgba(13,148,136,0.16), transparent 30%), radial-gradient(circle at 70% 80%, rgba(56,189,248,0.12), transparent 28%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <DashboardHeader />

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total cartes eSIM"
            value={stats.total_produits.toLocaleString("fr-FR")}
            hint="Tous fournisseurs confondus"
            icon={Layers3}
            accent="teal"
          />
          <StatCard
            title="Produits > 100 €"
            value={stats.produits_plus_100_euros.toLocaleString("fr-FR")}
            hint="Offres premium du catalogue"
            icon={BadgeEuro}
            accent="amber"
          />
          <StatCard
            title="Fourchette de prix"
            value={`${formatEuro(stats.prix_min)} à ${formatEuro(stats.prix_max)}`}
            hint="Minimum et maximum observés"
            icon={Wallet}
            accent="sky"
          />
          <StatCard
            title="Prix moyen global"
            value={formatEuro(stats.prix_moyen)}
            hint="Moyenne arithmétique"
            icon={ChartColumn}
            accent="teal"
          />
          <StatCard
            title="Prix médian"
            value={formatEuro(stats.prix_median)}
            hint="Moins sensible aux extrêmes"
            icon={Scale}
            accent="emerald"
          />
          <StatCard
            title="Moyenne data / carte"
            value={`${stats.data_moyenne_go.toLocaleString("fr-FR")} Go`}
            hint="Hors offres illimitées"
            icon={Database}
            accent="sky"
          />
        </section>

        <div className="mb-8">
          <ProviderChart repartition={stats.repartition_fournisseurs} />
        </div>

        <AdvancedStats stats={stats} />
        <DashboardFooter />
      </main>
    </div>
  );
}
