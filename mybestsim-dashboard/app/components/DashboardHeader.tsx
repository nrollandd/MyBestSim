import Link from "next/link";
import { CardSim } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="mb-8 sm:mb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-teal-700 shadow-sm backdrop-blur">
        <CardSim className="h-3.5 w-3.5" />
        MyBestSim Analytics
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Dashboard eSIM MyBestSim
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600 sm:text-lg">
        Analyse du catalogue multi-fournisseurs
      </p>
      <nav className="mt-5">
        <Link
          href="/article/esim-croisiere"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-teal-200 hover:text-teal-800"
        >
          Lire l'article : Internet en croisière →
        </Link>
      </nav>
    </header>
  );
}
