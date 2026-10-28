# MyBestSim — Test technique (Dashboard eSIM + Article SEO)

Projet réalisé dans le cadre du test de recrutement MyBestSim
(stage Développeur IA & Automatisation).

Il regroupe les deux livrables demandés sur un seul déploiement Next.js :

| Livrable | URL |
|---|---|
| Dashboard d'analyse des données fournisseurs | `/` |
| Article SEO "Internet en croisière : quelle eSIM choisir ?" | `/article/esim-croisiere` |

🔗 **Démo en ligne** : []

---

## Sommaire

1. [Ce que fait le projet](#ce-que-fait-le-projet)
2. [Structure du repo](#structure-du-repo)
3. [Installation et lancement](#installation-et-lancement)
4. [Le pipeline de données](#le-pipeline-de-données)
5. [Stack technique](#stack-technique)
6. [Décisions prises et arbitrages](#décisions-prises-et-arbitrages)

---

## Ce que fait le projet

### Partie 1 — Dashboard

Lecture automatisée de **18 fichiers CSV** fournisseurs eSIM
(5056 produits au total), normalisation des données, puis génération
d'un rapport visuel interactif.

Statistiques affichées :

- Nombre total de cartes eSIM : **5056**
- Produits à plus de 100 € : **56**
- Fourchette de prix : **5,36 € – 154,63 €**
- Prix moyen : **29,30 €** / prix médian : **20,70 €**
- Moyenne de données par carte : **14,49 Go** (hors offres illimitées)
- Répartition par fournisseur (18 fournisseurs, graphique en barres)

Statistiques bonus :

- Part des offres illimitées : **653 offres (12,92 %)**
- Répartition réseau 4G / 5G (graphique donut)
- Part des forfaits rechargeables (top-up) : **54,15 %**
- Nombre de zones géographiques couvertes : **54**
- Top 5 des fournisseurs les moins chers (prix moyen)

### Partie 2 — Article SEO

Article de blog complet (~3100 mots) optimisé pour le mot-clé
`esim croisière`, rédigé après analyse de la concurrence
(Simology, PuraSIM, 01net) et des articles existants de MyBestSim.

Il intègre des **données réelles extraites du catalogue** traité
par le dashboard (prix et volumes par zone Europe / Monde), ainsi
que du maillage interne vers les outils MyBestSim existants
(calculateur de données, page compatibilité, ebook d'installation).

---

## Structure du repo

```
MyBestSim/
├── data/                          # 18 CSV fournisseurs (sources brutes)
└── mybestsim-dashboard/           # Projet Next.js
    ├── app/
    │   ├── page.tsx               # Dashboard
    │   ├── components/            # StatCard, ProviderChart, NetworkChart...
    │   └── article/
    │       └── esim-croisiere/    # Article SEO
    ├── public/
    │   ├── stats.json             # Stats agrégées (généré)
    │   ├── produits.json          # 5056 produits normalisés (généré)
    │   └── images/                # Visuels de l'article
    └── scripts/
        ├── process-data.js        # Pipeline CSV → JSON
        └── stats-croisiere.js     # Stats par zone (pour l'article)
```

---

## Installation et lancement

```bash
git clone https://github.com/nrollandd/MyBestSim.git
cd MyBestSim/mybestsim-dashboard
npm install
npm run dev
```

Le site est accessible sur `http://localhost:3000`.

### Regénérer les données

Si les CSV sources changent :

```bash
npm run process-data
```

Le script relit l'intégralité de `../data/`, normalise les lignes,
recalcule toutes les statistiques et réécrit `public/stats.json`
et `public/produits.json`.

---

## Le pipeline de données

`scripts/process-data.js` est l'automatisation au cœur du projet.
Il effectue les opérations suivantes :

1. **Lecture** de tous les `.csv` présents dans `data/`
2. **Parsing** via papaparse
3. **Normalisation** de chaque ligne vers un schéma unifié :

```js
{
  sku, fournisseur, nom_produit, prix, devise,
  data_go,        // number | null (null si illimité)
  illimite,       // boolean
  duree_jours, pays_zone, code_zone, network, top_up
}
```

4. **Agrégation** des statistiques (totaux, moyennes, médianes,
   répartitions)
5. **Écriture** de deux fichiers distincts :
   - `stats.json` (~1,2 Ko) — consommé par le dashboard
   - `produits.json` (~1,6 Mo) — catalogue complet, utilisé pour
     les analyses par zone

Les colonnes sources sont identiques sur les 18 fichiers :
`sku, provider, product_name, country_code, country_name, data_gb,
data_display, validity_days, price, currency, network, top_up`.

---

## Stack technique

| Outil | Usage |
|---|---|
| Next.js (App Router) | Framework, routing, rendu statique |
| TypeScript | Typage des données et composants |
| Tailwind CSS | Styles |
| Recharts | Graphiques (barres, donut) |
| Framer Motion | Animations à l'apparition au scroll |
| lucide-react | Icônes |
| papaparse | Parsing des CSV |
| Vercel | Hébergement et déploiement continu |

---

## Décisions prises et arbitrages

Plusieurs points de l'énoncé étaient ouverts à interprétation. Voici
les choix retenus et leur justification.

**Offres illimitées exclues du calcul de la moyenne de données.**
653 produits (12,92 % du catalogue) n'ont pas de valeur numérique en
`data_gb`. Les compter comme 0 Go aurait artificiellement fait chuter
la moyenne, les ignorer totalement aurait masqué une part importante
de l'offre. Ils sont donc exclus du calcul de moyenne mais comptés
dans le total, avec un champ booléen `illimite` et une statistique
dédiée.

**Deux fichiers JSON plutôt qu'un seul.**
Un fichier unique de 1,7 Mo était inutilement lourd pour un dashboard
qui n'affiche que des agrégats. La séparation `stats.json` /
`produits.json` permet au dashboard de ne charger que le strict
nécessaire.

**Script de traitement en JavaScript, pas en TypeScript.**
Le reste du projet est en TypeScript, mais le script de traitement
est un utilitaire ponctuel exécuté en CLI. Le passer en TS aurait
imposé une dépendance supplémentaire (ts-node) sans bénéfice réel.

**Pas d'upload de CSV en direct sur le site.**
Fonctionnalité envisagée puis écartée : elle supposait un format de
fichier parfaitement stable et ajoutait une surface de bug importante
pour un gain limité dans le cadre de ce test. L'automatisation
demandée est assurée par le script CLI, relançable à tout moment.

**Dashboard et article sur un seul déploiement.**
Plutôt que deux livrables hébergés séparément, les deux pages
cohabitent dans la même application, avec navigation croisée. Un
seul projet à maintenir, une expérience plus cohérente, et une
démonstration que les données du dashboard alimentent directement
le contenu de l'article.

**Zone "Caraïbes" absente du catalogue.**
Vérification faite via `scripts/stats-croisiere.js` : aucune zone
Caraïbes distincte n'existe dans les données fournies. L'article
traite ce point en transparence et oriente vers un forfait Monde
pour ce type d'itinéraire, plutôt que d'inventer une offre
inexistante.

**Cannibalisation SEO identifiée.**
MyBestSim publie déjà deux articles sur l'eSIM en croisière. L'article
produit ici est conçu comme une version plus complète destinée à les
remplacer, et non comme un troisième contenu concurrent sur le même
mot-clé.