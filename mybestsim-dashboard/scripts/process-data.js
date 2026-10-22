const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

const PROJECT_ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(PROJECT_ROOT, "..", "data");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const STATS_FILE = path.join(PUBLIC_DIR, "stats.json");
const PRODUITS_FILE = path.join(PUBLIC_DIR, "produits.json");

function median(sortedNumbers) {
  const n = sortedNumbers.length;
  if (n === 0) return 0;
  const mid = Math.floor(n / 2);
  if (n % 2 === 0) {
    return (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2;
  }
  return sortedNumbers[mid];
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function normalizeRow(row) {
  const dataDisplay = (row.data_display || "").trim();
  const dataGbRaw = (row.data_gb ?? "").toString().trim();
  const illimite =
    dataDisplay.toLowerCase() === "illimité" ||
    dataDisplay.toLowerCase() === "illimite" ||
    dataGbRaw === "";

  const data_go = illimite ? null : parseFloat(dataGbRaw);
  const prix = parseFloat(row.price);

  return {
    sku: row.sku,
    fournisseur: row.provider,
    nom_produit: row.product_name,
    prix,
    devise: row.currency,
    data_go: Number.isFinite(data_go) ? data_go : null,
    illimite,
    duree_jours: parseInt(row.validity_days, 10),
    pays_zone: row.country_name,
    code_zone: row.country_code,
    network: row.network,
    top_up: row.top_up,
  };
}

function loadProduits() {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Dossier data introuvable : ${DATA_DIR}`);
  }

  const csvFiles = fs
    .readdirSync(DATA_DIR)
    .filter((name) => name.toLowerCase().endsWith(".csv"))
    .sort();

  if (csvFiles.length === 0) {
    throw new Error(`Aucun fichier CSV dans ${DATA_DIR}`);
  }

  const produits = [];

  for (const file of csvFiles) {
    const filePath = path.join(DATA_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      console.warn(`Avertissements parsing ${file}:`, parsed.errors.slice(0, 3));
    }

    for (const row of parsed.data) {
      if (!row.sku && !row.provider) continue;
      produits.push(normalizeRow(row));
    }
  }

  return { produits, csvFiles };
}

function computeStats(produits) {
  const total_produits = produits.length;
  const prices = produits.map((p) => p.prix).filter(Number.isFinite);
  const sortedPrices = [...prices].sort((a, b) => a - b);

  const produits_plus_100_euros = produits.filter((p) => p.prix > 100).length;
  const prix_min = sortedPrices[0] ?? 0;
  const prix_max = sortedPrices[sortedPrices.length - 1] ?? 0;
  const prix_moyen = round2(
    prices.reduce((sum, p) => sum + p, 0) / (prices.length || 1)
  );
  const prix_median = round2(median(sortedPrices));

  const dataValues = produits
    .filter((p) => !p.illimite && p.data_go !== null && Number.isFinite(p.data_go))
    .map((p) => p.data_go);
  const data_moyenne_go = round2(
    dataValues.reduce((sum, d) => sum + d, 0) / (dataValues.length || 1)
  );

  const repartition_fournisseurs = {};
  for (const p of produits) {
    repartition_fournisseurs[p.fournisseur] =
      (repartition_fournisseurs[p.fournisseur] || 0) + 1;
  }

  const nombre_offres_illimitees = produits.filter((p) => p.illimite).length;
  const pourcentage_illimite = round2(
    (nombre_offres_illimitees / (total_produits || 1)) * 100
  );

  const repartition_network = { "4G": 0, "5G": 0 };
  for (const p of produits) {
    if (p.network === "4G" || p.network === "5G") {
      repartition_network[p.network] += 1;
    }
  }

  const topUpOui = produits.filter(
    (p) => (p.top_up || "").toLowerCase() === "oui"
  ).length;
  const pourcentage_top_up_disponible = round2(
    (topUpOui / (total_produits || 1)) * 100
  );

  const sumByFournisseur = {};
  const countByFournisseur = {};
  for (const p of produits) {
    sumByFournisseur[p.fournisseur] =
      (sumByFournisseur[p.fournisseur] || 0) + p.prix;
    countByFournisseur[p.fournisseur] =
      (countByFournisseur[p.fournisseur] || 0) + 1;
  }

  const top_5_fournisseurs_moins_chers = Object.keys(sumByFournisseur)
    .map((fournisseur) => ({
      fournisseur,
      prix_moyen: round2(
        sumByFournisseur[fournisseur] / countByFournisseur[fournisseur]
      ),
    }))
    .sort((a, b) => a.prix_moyen - b.prix_moyen)
    .slice(0, 5);

  const nombre_zones_distinctes = new Set(produits.map((p) => p.pays_zone))
    .size;

  return {
    total_produits,
    produits_plus_100_euros,
    prix_min,
    prix_max,
    prix_moyen,
    prix_median,
    data_moyenne_go,
    repartition_fournisseurs,
    nombre_offres_illimitees,
    pourcentage_illimite,
    repartition_network,
    pourcentage_top_up_disponible,
    top_5_fournisseurs_moins_chers,
    nombre_zones_distinctes,
  };
}

function printSummary(stats, csvFiles) {
  console.log("\n========== Résumé traitement eSIM ==========");
  console.log(`Fichiers CSV lus     : ${csvFiles.length}`);
  console.log(`Total produits       : ${stats.total_produits}`);
  console.log(`Prix > 100 €         : ${stats.produits_plus_100_euros}`);
  console.log(
    `Prix min / max / moy : ${stats.prix_min} / ${stats.prix_max} / ${stats.prix_moyen} €`
  );
  console.log(`Prix médian          : ${stats.prix_median} €`);
  console.log(`Data moyenne (Go)    : ${stats.data_moyenne_go} (hors illimités)`);
  console.log(
    `Offres illimitées    : ${stats.nombre_offres_illimitees} (${stats.pourcentage_illimite} %)`
  );
  console.log(
    `Network              : 4G=${stats.repartition_network["4G"]}, 5G=${stats.repartition_network["5G"]}`
  );
  console.log(`Top-up disponible    : ${stats.pourcentage_top_up_disponible} %`);
  console.log(`Zones distinctes     : ${stats.nombre_zones_distinctes}`);
  console.log("\nRépartition fournisseurs :");
  for (const [nom, count] of Object.entries(stats.repartition_fournisseurs).sort(
    (a, b) => b[1] - a[1]
  )) {
    console.log(`  - ${nom}: ${count}`);
  }
  console.log("\nTop 5 fournisseurs les moins chers (prix moyen) :");
  stats.top_5_fournisseurs_moins_chers.forEach((item, i) => {
    console.log(`  ${i + 1}. ${item.fournisseur}: ${item.prix_moyen} €`);
  });
  console.log(`\nFichiers écrits →`);
  console.log(`  - ${STATS_FILE}`);
  console.log(`  - ${PRODUITS_FILE}`);
  console.log("============================================\n");
}

function main() {
  const { produits, csvFiles } = loadProduits();
  const stats = computeStats(produits);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), "utf8");
  fs.writeFileSync(PRODUITS_FILE, JSON.stringify(produits, null, 2), "utf8");

  const legacyFile = path.join(PUBLIC_DIR, "data.json");
  if (fs.existsSync(legacyFile)) {
    fs.unlinkSync(legacyFile);
  }

  printSummary(stats, csvFiles);
}

main();
