import type { Metadata } from "next";
import Link from "next/link";
import EsimCroisiereArticle from "./EsimCroisiereArticle";

export const metadata: Metadata = {
  title: "Internet en Croisière : Quelle eSIM Choisir ? Guide Complet 2026 | MyBestSim",
  description:
    "Wifi du bateau hors de prix, roaming maritime piégeux, escales multi-pays : découvrez quelle eSIM choisir pour une croisière, avec vrais prix et checklist anti-surprises.",
};

export default function EsimCroisierePage() {
  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-sky-50 via-white to-teal-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(14,165,233,0.18), transparent 34%), radial-gradient(circle at 88% 12%, rgba(13,148,136,0.16), transparent 30%), radial-gradient(circle at 70% 80%, rgba(56,189,248,0.12), transparent 28%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-teal-200 hover:text-teal-800"
          >
            ← Retour au dashboard
          </Link>
        </nav>

        <main className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-8 shadow-sm backdrop-blur sm:px-6 sm:py-10">
          <EsimCroisiereArticle />
        </main>
      </div>
    </div>
  );
}
