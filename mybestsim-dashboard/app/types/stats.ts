export type Stats = {
  total_produits: number;
  produits_plus_100_euros: number;
  prix_min: number;
  prix_max: number;
  prix_moyen: number;
  prix_median: number;
  data_moyenne_go: number;
  repartition_fournisseurs: Record<string, number>;
  nombre_offres_illimitees: number;
  pourcentage_illimite: number;
  repartition_network: {
    "4G": number;
    "5G": number;
  };
  pourcentage_top_up_disponible: number;
  top_5_fournisseurs_moins_chers: Array<{
    fournisseur: string;
    prix_moyen: number;
  }>;
  nombre_zones_distinctes: number;
};
