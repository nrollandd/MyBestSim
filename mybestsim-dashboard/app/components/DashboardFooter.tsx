"use client";

import { useEffect, useState } from "react";

export default function DashboardFooter() {
  const [dateDuJour, setDateDuJour] = useState<string | null>(null);

  useEffect(() => {
    setDateDuJour(
      new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <footer className="relative mt-10 border-t border-slate-200/70 pt-6 text-center text-xs text-slate-400 sm:mt-12">
      {dateDuJour
        ? `Données générées le ${dateDuJour} · MyBestSim Analytics`
        : "MyBestSim Analytics"}
    </footer>
  );
}
