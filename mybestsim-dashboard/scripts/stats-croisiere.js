const fs = require("fs");
const path = require("path");

const PRODUITS_FILE = path.join(__dirname, "..", "public", "produits.json");

const ZONES_CIBLE = [
  { label: "Europe", match: (p) => p.pays_zone === "Europe" || p.code_zone === "EU" },
  { label: "Caraïbes", match: (p) => /cara[iï]bes/i.test(p.pays_zone || "") || p.code_zone === "CB" },
  { label: "Monde", match: (p) => p.pays_zone === "Monde" || p.code_zone === "WW" },
];

function round2(value) {
  return Math.round(value * 100) / 100;
}

function formatPrice(value) {
  return value == null ? "n/a" : `${round2(value).toFixed(2)} €`;
}

function statsZone(offres) {
  const prix = offres.map((o) => o.prix).filter(Number.isFinite);
  const dataFinie = offres
    .filter((o) => !o.illimite && Number.isFinite(o.data_go))
    .map((o) => o.data_go);

  const minPrix = prix.length ? Math.min(...prix) : null;
  const maxPrix = prix.length ? Math.max(...prix) : null;
  const moyPrix = prix.length ? prix.reduce((a, b) => a + b, 0) / prix.length : null;
  const moyData =
    dataFinie.length ? dataFinie.reduce((a, b) => a + b, 0) / dataFinie.length : null;

  // Prix min par fournisseur, puis les 3 moins chers
  const minParFournisseur = new Map();
  for (const o of offres) {
    if (!Number.isFinite(o.prix) || !o.fournisseur) continue;
    const prev = minParFournisseur.get(o.fournisseur);
    if (prev == null || o.prix < prev) {
      minParFournisseur.set(o.fournisseur, o.prix);
    }
  }
  const top3 = [...minParFournisseur.entries()]
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  return {
    count: offres.length,
    minPrix,
    maxPrix,
    moyPrix,
    moyData,
    top3,
  };
}

function printZone(label, offres) {
  console.log(`\n=== ${label} ===`);
  if (offres.length === 0) {
    console.log("Aucune offre pour cette zone.");
    return;
  }
  const s = statsZone(offres);
  console.log(`Offres disponibles : ${s.count}`);
  console.log(`Prix min / max     : ${formatPrice(s.minPrix)} / ${formatPrice(s.maxPrix)}`);
  console.log(`Prix moyen         : ${formatPrice(s.moyPrix)}`);
  console.log(
    `Data moyenne (Go)  : ${
      s.moyData == null ? "n/a (aucune offre limitée)" : round2(s.moyData).toFixed(2)
    }`
  );
  console.log("Top 3 fournisseurs les moins chers :");
  if (s.top3.length === 0) {
    console.log("  (aucun)");
  } else {
    s.top3.forEach(([nom, prix], i) => {
      console.log(`  ${i + 1}. ${nom} — ${formatPrice(prix)}`);
    });
  }
}

function main() {
  const raw = fs.readFileSync(PRODUITS_FILE, "utf8");
  const produits = JSON.parse(raw);
  if (!Array.isArray(produits)) {
    throw new Error("produits.json doit être un tableau d'offres");
  }

  console.log(`Dataset : ${produits.length} offres (${path.relative(process.cwd(), PRODUITS_FILE)})`);

  const zonesPresentes = [
    ...new Map(
      produits.map((p) => [`${p.pays_zone || "?"} (${p.code_zone || "?"})`, true])
    ).keys(),
  ].sort((a, b) => a.localeCompare(b, "fr"));

  for (const zone of ZONES_CIBLE) {
    const offres = produits.filter(zone.match);

    if (zone.label === "Caraïbes" && offres.length === 0) {
      console.log(`\n=== Caraïbes ===`);
      console.log(
        'Zone "Caraïbes" absente du dataset (aucun pays_zone / code_zone correspondant).'
      );
      console.log("Zones réellement présentes :");
      zonesPresentes.forEach((z) => console.log(`  - ${z}`));
      continue;
    }

    printZone(zone.label, offres);
  }

  console.log("");
}

main();
