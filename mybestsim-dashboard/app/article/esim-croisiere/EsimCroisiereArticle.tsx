"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";

function HeroImage() {
  const [error, setError] = useState(false);
  return (
    <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-sky-200 via-teal-200 to-sky-300">
      {!error && (
        <Image
          src="/images/hero-croisiere.avif"
          alt="Vue d'un paysage de croisière avec smartphone au premier plan"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

function ItineraryImage() {
  const [error, setError] = useState(false);
  return (
    <div className="relative mx-auto my-6 aspect-[16/9] w-full max-w-xl overflow-hidden rounded-xl bg-gradient-to-br from-teal-200 via-sky-200 to-teal-300">
      {!error && (
        <Image
          src="/images/carte-itineraire.jpg"
          alt="Carte des zones de couverture eSIM Europe et Monde"
          fill
          sizes="(max-width: 640px) 100vw, 576px"
          className="object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

/** Brand SVGs — lucide-react no longer ships trademarked social icons. */
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.174 2.097 15.943 2 14.643 2 11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.94 6.5A2.44 2.44 0 1 1 6.94 1.6a2.44 2.44 0 0 1 0 4.9zM2.5 22V7.75h4.4V22H2.5zm7.1 0h4.4v-7.35c0-1.94.93-3.1 2.67-3.1 1.64 0 2.43 1.15 2.43 3.1V22H23.5v-8.15C23.5 9.1 21.4 7.2 18.6 7.2c-2.1 0-3.4.95-4 1.85V7.75h-4.4c.06 1.25 0 14.25 0 14.25z" />
    </svg>
  );
}

function Callout({
  children,
  variant = "tip",
}: {
  children: ReactNode;
  variant?: "tip" | "cta" | "warn";
}) {
  const styles = {
    tip: "border-sky-200 bg-sky-50 text-sky-950",
    cta: "border-teal-200 bg-teal-50 text-teal-950",
    warn: "border-amber-200 bg-amber-50 text-amber-950",
  }[variant];

  return (
    <blockquote
      className={`my-8 rounded-xl border px-5 py-4 text-[0.95rem] leading-relaxed ${styles}`}
    >
      {children}
    </blockquote>
  );
}

function ArticleTable({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border-b border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-slate-800">
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`border-b border-slate-100 px-4 py-3 text-slate-700 ${className}`}>
      {children}
    </td>
  );
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="pb-5 text-[0.95rem] leading-relaxed text-slate-600">
          {children}
        </div>
      ) : null}
    </div>
  );
}

const EXTERNAL = {
  className:
    "font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-900",
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

const TOC_ITEMS = [
  { id: "le-probleme", label: "Pourquoi internet en croisière est compliqué" },
  { id: "cout-wifi-bateau", label: "Combien coûte le wifi à bord" },
  { id: "fonctionnement-esim", label: "Comment fonctionne une eSIM en croisière" },
  { id: "classique-vs-croisiere", label: "eSIM classique ou spéciale croisière" },
  { id: "choix-itineraire", label: "Quelle eSIM selon votre itinéraire" },
  { id: "quantite-data", label: "Combien de data prévoir" },
  { id: "piege-roaming", label: "Le piège du roaming maritime" },
  { id: "installation", label: "Installer son eSIM avant le départ" },
  { id: "choix-profil", label: "Quel forfait selon votre profil" },
  { id: "faq", label: "Questions fréquentes" },
  { id: "conclusion", label: "En résumé" },
];

export default function EsimCroisiereArticle() {
  return (
    <article className="article-esim-croisiere">
      <header className="mb-6 border-b border-slate-200 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-teal-700">
          Guide eSIM · Croisière
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          Internet en croisière : quelle eSIM choisir ?
        </h1>
        <p className="chapo mt-5 text-lg leading-relaxed text-slate-600">
          Vous partez en croisière et vous redoutez la facture internet. Entre le wifi du bateau,
          le roaming maritime et les escales multi-pays, une mauvaise préparation peut coûter
          cher. Avec la bonne eSIM, la configuration se règle en dix minutes avant le départ.
          Voici comment procéder, avec des prix et des données réels.
        </p>
      </header>

      <HeroImage />

      <div className="my-6 rounded-r-lg border-l-4 border-sky-500 bg-sky-50 px-5 py-4 text-[0.95rem] leading-relaxed text-slate-800">
        <strong>En bref, ce que vous allez découvrir dans cet article :</strong> comment éviter
        le wifi hors de prix et le roaming maritime, choisir entre eSIM classique et spéciale
        croisière, dimensionner sa data selon l&apos;itinéraire, et installer son forfait avant
        le départ.
      </div>

      <nav
        className="my-8 rounded-xl border border-slate-200 bg-slate-100/80 px-5 py-5"
        aria-label="Sommaire"
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-800">
          Sommaire
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-teal-800">
          {TOC_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="underline underline-offset-2 hover:text-teal-950"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <AnimatedSection>
        <section id="le-probleme" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Pourquoi internet en croisière, c&apos;est (toujours) compliqué
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Une croisière est un terrain difficile pour la connexion mobile. Vous changez de pays
          presque tous les jours, vous passez des heures en pleine mer loin de toute antenne, et
          le bateau propose un wifi fonctionnel, mais facturé souvent au prix d&apos;un bon repas
          par gigaoctet.
        </p>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Voici les trois options qui s&apos;offrent à vous. Une seule tient vraiment la route
          pour la majorité des voyageurs.
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>Solution</Th>
              <Th>Prix moyen</Th>
              <Th>Fonctionne en mer</Th>
              <Th>Fonctionne à l&apos;escale</Th>
              <Th>Le verdict</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>
                <strong>WiFi du bateau</strong>
              </Td>
              <Td>12 à 35 € / jour</Td>
              <Td>Oui (via satellite)</Td>
              <Td>Oui</Td>
              <Td>Cher, parfois lent, mais zéro prise de tête</Td>
            </tr>
            <tr>
              <Td>
                <strong>Roaming classique (votre forfait habituel)</strong>
              </Td>
              <Td>Variable, souvent explosif</Td>
              <Td>Oui, à un tarif maritime spécial</Td>
              <Td>Dépend du pays</Td>
              <Td>Le piège numéro 1, on y revient plus bas</Td>
            </tr>
            <tr>
              <Td>
                <strong>eSIM dédiée</strong>
              </Td>
              <Td>7 à 50 € pour tout le séjour</Td>
              <Td>Non (sauf offre spécifique)</Td>
              <Td>Oui, dès l&apos;arrivée dans le pays</Td>
              <Td>Le meilleur rapport prix / tranquillité pour 90% des croisiéristes</Td>
            </tr>
          </tbody>
        </ArticleTable>

        <p className="text-lg leading-loose text-slate-700">
          L&apos;eSIM ne remplace pas le wifi du bateau en pleine mer (sauf exception, détaillée
          plus loin), mais elle évite de payer ce wifi à chaque escale. Or la plupart des
          croisières enchaînent les escales : c&apos;est souvent là que se joue 80 % de
          l&apos;usage réel.
        </p>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="cout-wifi-bateau" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Combien coûte vraiment le wifi à bord ?
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Voici ce que pratiquent les plus grosses compagnies. Les prix varient selon la durée
          du forfait, le débit choisi (certaines proposent même du Starlink désormais) et la
          compagnie elle-même.
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>Compagnie</Th>
              <Th>Prix wifi / jour</Th>
              <Th>Particularité</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>Costa Croisières</Td>
              <Td>12 – 22 €</Td>
              <Td>Souvent le moins cher du marché</Td>
            </tr>
            <tr>
              <Td>MSC Croisières</Td>
              <Td>15 – 25 €</Td>
              <Td>Forfaits à la journée ou au forfait séjour</Td>
            </tr>
            <tr>
              <Td>Celebrity Cruises</Td>
              <Td>20 – 32 €</Td>
              <Td>Débit correct, mais tarif élevé</Td>
            </tr>
            <tr>
              <Td>Norwegian Cruise Line</Td>
              <Td>20 – 35 €</Td>
              <Td>Parmi les plus chers constatés</Td>
            </tr>
            <tr>
              <Td>Royal Caribbean</Td>
              <Td>18 – 30 €</Td>
              <Td>Starlink disponible sur certains navires récents</Td>
            </tr>
          </tbody>
        </ArticleTable>

        <p className="mb-4 text-lg leading-loose text-slate-700">
          Sur une croisière de 7 jours, même au tarif le plus doux (Costa, 12 €/jour), le wifi
          du bateau revient déjà à <strong>84 €</strong>. Avec Norwegian au prix fort, on
          atteint <strong>245 €</strong>. Pour le même budget (voire bien moins), une eSIM
          utilisée à chaque escale couvre largement le besoin, souvent avec plus de data
          qu&apos;il n&apos;en faut.
        </p>

        <Callout variant="tip">
          <strong>À retenir :</strong> le wifi du bateau reste utile pour la traversée en pleine
          mer. En revanche, s&apos;en servir à chaque escale revient cher pour une facilité que
          l&apos;eSIM remplace pour une fraction du prix.
        </Callout>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="fonctionnement-esim" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Comment fonctionne une eSIM pendant une croisière (et où elle s&apos;arrête)
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Point souvent passé sous silence, et pourtant essentiel avant de réserver : une eSIM
          classique se connecte aux réseaux terrestres. Elle ne capte rien en pleine mer, faute
          d&apos;antenne 4G au milieu de l&apos;océan.
        </p>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Concrètement, voici ce qui se passe pendant votre croisière :
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>
            <strong>En pleine mer :</strong> votre eSIM terrestre ne capte rien. C&apos;est le
            wifi du bateau ou rien.
          </li>
          <li>
            <strong>
              À l&apos;approche des côtes (en-dessous de 22 km / 12 milles nautiques environ) :
            </strong>{" "}
            votre téléphone peut parfois accrocher un réseau terrestre, sans garantie, selon la
            puissance du signal local.
          </li>
          <li>
            <strong>À l&apos;escale :</strong> dès que vous êtes dans le pays, votre eSIM
            bascule sur le réseau local et fonctionne normalement, comme pour un voyage
            classique.
          </li>
        </ul>
        <p className="text-lg leading-loose text-slate-700">
          Il existe une exception notable : certains fournisseurs comme <strong>Saily</strong>{" "}
          ou <strong>GigSky</strong> proposent de vrais forfaits &quot;croisière&quot; qui
          fonctionnent sur plus de 200 navires via une connexion satellite dédiée, au-delà de
          la limite des 22 km. C&apos;est pratique, mais clairement positionné comme une offre
          premium — on en reparle dans le comparatif juste après.
        </p>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="classique-vs-croisiere" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          eSIM classique ou eSIM &quot;spéciale croisière&quot; ?
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Le choix dépend de votre profil. Si vous devez rester joignable même au large, l&apos;option
          spéciale croisière a du sens. Si vous pouvez vous passer d&apos;internet pendant les
          traversées, l&apos;eSIM classique suffit largement et coûte beaucoup moins cher.
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>{""}</Th>
              <Th>eSIM classique</Th>
              <Th>eSIM spéciale croisière</Th>
              <Th>Forfait wifi du navire</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>
                <strong>Fonctionne en mer</strong>
              </Td>
              <Td>Non</Td>
              <Td>Oui, via satellite</Td>
              <Td>Oui</Td>
            </tr>
            <tr>
              <Td>
                <strong>Fonctionne à l&apos;escale</strong>
              </Td>
              <Td>Oui</Td>
              <Td>Oui</Td>
              <Td>Oui, mais coûte cher</Td>
            </tr>
            <tr>
              <Td>
                <strong>Prix indicatif (7-10 jours)</strong>
              </Td>
              <Td>7 à 30 €</Td>
              <Td>40 à 80 €</Td>
              <Td>80 à 250 €</Td>
            </tr>
            <tr>
              <Td>
                <strong>Pour qui ?</strong>
              </Td>
              <Td>La grande majorité des voyageurs</Td>
              <Td>Ceux qui ne peuvent pas décrocher</Td>
              <Td>Dépannage ponctuel uniquement</Td>
            </tr>
          </tbody>
        </ArticleTable>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="choix-itineraire" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Quelle eSIM selon votre itinéraire
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Une croisière traverse rarement un seul pays. La règle utile :{" "}
          <strong>
            au-delà de 2 pays visités, mieux vaut un forfait régional qu&apos;un forfait pays par
            pays
          </strong>
          , sous peine de jongler avec plusieurs eSIM sur le même téléphone.
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>Itinéraire type</Th>
              <Th>Pays traversés</Th>
              <Th>Type de forfait recommandé</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>Méditerranée occidentale (7 jours)</Td>
              <Td>France, Espagne, Italie, parfois Malte</Td>
              <Td>Forfait Europe</Td>
            </tr>
            <tr>
              <Td>Caraïbes (7-10 jours)</Td>
              <Td>Multiples îles, juridictions différentes</Td>
              <Td>Forfait Monde (voir explication ci-dessous)</Td>
            </tr>
            <tr>
              <Td>Europe du Nord / Fjords</Td>
              <Td>Norvège, Danemark, Allemagne...</Td>
              <Td>Forfait Europe</Td>
            </tr>
            <tr>
              <Td>Asie du Sud-Est</Td>
              <Td>Thaïlande, Singapour, Malaisie...</Td>
              <Td>Forfait régional Asie ou Monde</Td>
            </tr>
            <tr>
              <Td>Tour du monde / long cours</Td>
              <Td>Plusieurs continents</Td>
              <Td>Forfait Monde</Td>
            </tr>
          </tbody>
        </ArticleTable>

        <p className="mb-4 text-lg leading-loose text-slate-700">
          Précision importante : dans notre catalogue actuel, il n&apos;existe pas de zone
          &quot;Caraïbes&quot; dédiée chez les fournisseurs. C&apos;est le cas chez quasiment
          tout le monde sur le marché — la zone Caraïbes regroupe trop de pays et d&apos;opérateurs
          locaux différents pour être packagée simplement. En pratique, un forfait Monde
          couvrira sans problème chaque île visitée.
        </p>

        <p className="mb-4 text-lg leading-loose text-slate-700">
          Pour vous donner une idée concrète des prix, voici ce qu&apos;on trouve réellement dans
          notre catalogue au moment où on écrit ces lignes :
        </p>

        <ul className="mb-4 list-disc space-y-3 pl-5 text-slate-700">
          <li>
            <strong>Zone Europe :</strong> 206 offres disponibles, de <strong>7,52 €</strong> à
            154,63 €, avec une moyenne autour de <strong>42,74 €</strong> pour environ 16 Go de
            data. Les moins chères du moment : Jetpac (7,52 €), Airalo (7,53 €) et Holafly (7,77 €).
          </li>
          <li>
            <strong>Zone Monde :</strong> 186 offres, de <strong>7,91 €</strong> à 152,96 €, moyenne
            à <strong>44,41 €</strong> pour environ 17 Go. En tête côté prix : Airalo (7,91 €),
            aloSIM (8,32 €) et Yesim (8,72 €).
          </li>
        </ul>

        <ItineraryImage />

        <Callout variant="cta">
          <a
            href="https://mybestsim.com/fr/"
            {...EXTERNAL}
          >
            Comparer les forfaits eSIM disponibles pour votre destination →
          </a>
        </Callout>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="quantite-data" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Combien de data prévoir pour une croisière ?
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          La réponse dépend de votre usage. Voici des repères qui correspondent à la majorité
          des croisiéristes, sur une référence de 7 jours. Pour un séjour plus court, divisez
          approximativement ; pour 10 à 14 jours, augmentez d&apos;environ 50 à 80 %.
        </p>

        <div className="my-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-teal-700">5 Go</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Usage léger
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Mails, maps et réseaux sociaux ponctuels aux escales.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-teal-700">10–12 Go</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Usage modéré
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Réseaux sociaux réguliers, photos et appels occasionnels.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold tracking-tight text-teal-700">20–25 Go</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Usage intensif
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Streaming, visioconférence et travail à distance aux escales.
            </p>
          </div>
        </div>

        <p className="mb-4 text-lg leading-loose text-slate-700">
          Les escales étant souvent espacées, la connexion s&apos;utilise par à-coups, pas en
          continu comme à la maison. La plupart des voyageurs surestiment leurs besoins. Un
          forfait un peu juste reste préférable à une enveloppe trop généreuse (et trop chère) —
          d&apos;autant que beaucoup d&apos;offres permettent de recharger facilement.
        </p>

        <Callout variant="cta">
          Pas sûr du volume adapté à votre croisière ?{" "}
          <a
            href="https://mybestsim.com/fr/calculateur-de-donnee-voyage/"
            {...EXTERNAL}
          >
            Calculer mes besoins →
          </a>
        </Callout>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="piege-roaming" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Le piège du roaming maritime (celui qui coûte vraiment cher)
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Le vrai danger, et celui qui génère le plus de mauvaises surprises sur les factures :
          laisser son forfait habituel actif en mer, en pensant qu&apos;il ne captuera rien
          d&apos;important. Sur certains bateaux, le téléphone accroche un réseau satellite
          maritime (MCV, AeroMobile...) sans alerte claire. Ces réseaux facturent au prix fort.
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>Type de consommation</Th>
              <Th>Tarif roaming maritime observé</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>Data (par Mo)</Td>
              <Td>3 € à 36 € / Mo</Td>
            </tr>
            <tr>
              <Td>Appel vocal (par minute)</Td>
              <Td>6 € à 12 € / min</Td>
            </tr>
          </tbody>
        </ArticleTable>

        <p className="mb-4 text-lg leading-loose text-slate-700">
          À 10 €/Mo (un tarif très courant), une seule photo envoyée sur WhatsApp peut coûter
          20 à 30 €. Une story Instagram avec une vidéo de 15 secondes peut facilement dépasser
          50 €. Des factures de plusieurs centaines d&apos;euros pour une semaine de croisière
          existent, simplement parce que les données mobiles n&apos;avaient pas été coupées.
        </p>

        <p className="mb-2 font-semibold text-slate-900">
          Checklist recommandée :
        </p>

        <ArticleTable>
          <thead>
            <tr>
              <Th>Moment</Th>
              <Th>Réglage à faire sur votre téléphone</Th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-slate-50">
            <tr>
              <Td>Avant l&apos;embarquement (48h)</Td>
              <Td>
                Désactiver l&apos;itinérance de données du forfait principal, installer
                l&apos;eSIM à l&apos;avance
              </Td>
            </tr>
            <tr>
              <Td>Pendant la navigation en mer</Td>
              <Td>
                Mode avion activé (ou données mobiles coupées), wifi du bateau seulement si
                besoin
              </Td>
            </tr>
            <tr>
              <Td>À l&apos;arrivée à l&apos;escale</Td>
              <Td>
                Désactiver le mode avion, activer l&apos;eSIM / sélectionner le réseau local
                manuellement si besoin
              </Td>
            </tr>
            <tr>
              <Td>Au retour à bord</Td>
              <Td>Repasser en mode avion dès que le bateau reprend la mer</Td>
            </tr>
          </tbody>
        </ArticleTable>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="installation" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Installer son eSIM avant le départ, étape par étape
        </h2>
        <p className="mb-4 text-lg leading-loose text-slate-700">
          Comptez environ 10 minutes, sans compétence technique particulière.
        </p>
        <ol className="list-decimal space-y-3 pl-5 text-slate-700">
          <li>
            <strong>
              <a
                href="https://mybestsim.com/fr/telephones-compatibles-esim/"
                {...EXTERNAL}
              >
                Vérifiez la compatibilité de votre téléphone
              </a>
              .
            </strong>{" "}
            La majorité des smartphones depuis 2019-2020 sont compatibles eSIM (iPhone XS et
            après, Samsung Galaxy S20 et après, Google Pixel 3 et après...).
          </li>
          <li>
            <strong>Achetez votre eSIM en ligne</strong>, idéalement 48h avant le départ —
            certaines activations prennent un peu de temps, autant ne pas s&apos;y prendre la
            veille au soir.
          </li>
          <li>
            <strong>Scannez le QR code</strong> reçu par email ou dans votre espace client,
            directement depuis les réglages de votre téléphone.
          </li>
          <li>
            <strong>Laissez l&apos;eSIM installée mais désactivée</strong> jusqu&apos;à votre
            arrivée dans la zone de couverture — pas besoin de l&apos;activer avant le départ.
          </li>
          <li>
            <strong>Activez-la à la première escale</strong>, ou dès l&apos;atterrissage si
            votre croisière commence après un vol.
          </li>
        </ol>

        <Callout variant="tip">
          Besoin d&apos;un guide pas à pas avec captures d&apos;écran ?{" "}
          <a
            href="https://mybestsim.com/fr/ebook-installation-esim/"
            {...EXTERNAL}
          >
            Téléchargez notre ebook gratuit d&apos;installation eSIM →
          </a>
        </Callout>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="choix-profil" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          Quel forfait selon votre profil de voyageur
        </h2>

        <div className="my-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              🧳 Le déconnecté assumé
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Juste de quoi consulter ses mails à l&apos;escale, rien de plus.
            </p>
            <p className="mt-3 text-sm font-medium text-teal-800">
              Petit forfait 3-5 Go, zone selon itinéraire
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              📱 Le voyageur classique
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Réseaux sociaux, photos, maps, messages réguliers.
            </p>
            <p className="mt-3 text-sm font-medium text-teal-800">
              Forfait 10-15 Go, zone Europe ou Monde selon le trajet
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              💻 Le télétravailleur en croisière
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Visio, mails pros, connexion fiable même en mer.
            </p>
            <p className="mt-3 text-sm font-medium text-teal-800">
              Forfait eSIM classique + option wifi satellite spécial croisière en complément
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-slate-900">👨‍👩‍👧 La famille</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Plusieurs appareils, usages variés.
            </p>
            <p className="mt-3 text-sm font-medium text-teal-800">
              Un forfait par appareil adulte, data mutualisée recommandée si disponible
            </p>
          </div>
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="faq" className="mb-14">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
          Les questions qu&apos;on nous pose le plus
        </h2>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5">
          <FaqItem question="Une eSIM fonctionne-t-elle en pleine mer ?">
            <p>
              Non, pas une eSIM classique. Elle fonctionne uniquement sur les réseaux
              terrestres, donc à l&apos;escale ou à proximité des côtes. Pour une couverture en
              pleine mer, il faut une offre spécifique type Saily ou GigSky, basée sur une
              connexion satellite.
            </p>
          </FaqItem>

          <FaqItem question="Dois-je acheter une eSIM par pays visité ?">
            <p>
              Pas forcément, et on le déconseille si votre croisière traverse plus de 2 pays :
              un forfait régional (Europe, Asie, Monde) évite de jongler entre plusieurs eSIM et
              sera souvent plus avantageux.
            </p>
          </FaqItem>

          <FaqItem question="Que se passe-t-il si mon téléphone capte un réseau satellite maritime par erreur ?">
            <p>
              C&apos;est exactement le scénario à éviter. Ces réseaux facturent au prix fort
              (jusqu&apos;à 36 €/Mo). La seule parade fiable est de couper les données mobiles en pleine mer, par exemple avec le mode avion.
            </p>
          </FaqItem>

          <FaqItem question="Puis-je utiliser ma eSIM dès l'embarquement ?">
            <p>
              Oui si le port d&apos;embarquement est couvert par votre forfait. On recommande
              de l&apos;installer 48h avant pour éviter tout souci de dernière minute, mais pas
              besoin de l&apos;activer avant d&apos;en avoir réellement besoin.
            </p>
          </FaqItem>

          <FaqItem question="Le wifi du bateau est-il vraiment nécessaire ?">
            <p>
              Pour les traversées en haute mer sans forfait satellite, oui, c&apos;est votre
              seule option si vous voulez rester connecté. Pour les escales en revanche,
              l&apos;eSIM est largement suffisante et bien moins chère.
            </p>
          </FaqItem>

          <FaqItem question="Comment savoir si mon téléphone est compatible eSIM ?">
            <p>
              Dans les réglages, cherchez &quot;Ajouter un forfait eSIM&quot; ou équivalent. La
              plupart des smartphones sortis après 2019-2020 sont compatibles. En cas de doute,
              le site du fabricant liste les modèles compatibles.
            </p>
          </FaqItem>

          <FaqItem question="Que faire si je visite plus de 2 pays pendant ma croisière ?">
            <p>
              Privilégiez un forfait régional ou Monde plutôt que plusieurs forfaits pays par
              pays. C&apos;est plus simple à gérer et généralement plus économique sur la durée
              du séjour.
            </p>
          </FaqItem>

          <FaqItem question="Une eSIM pour les Caraïbes, ça existe ?">
            <p>
              Pas en tant que zone dédiée chez la plupart des fournisseurs, le nôtre y compris.
              On recommande dans ce cas un forfait Monde, qui couvre l&apos;ensemble des îles
              sans limitation géographique.
            </p>
          </FaqItem>
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="conclusion" className="mb-14">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">
          En résumé : la méthode qui marche
        </h2>
        <ol className="mb-4 list-decimal space-y-2 pl-5 text-slate-700">
          <li>Identifiez les pays traversés par votre itinéraire.</li>
          <li>
            Choisissez un forfait régional (Europe/Monde) si vous visitez plus de 2 pays.
          </li>
          <li>
            Installez votre eSIM 48h avant le départ, activez-la uniquement aux escales.
          </li>
          <li>
            Coupez systématiquement vos données mobiles en pleine mer pour éviter le piège du roaming maritime.
          </li>
        </ol>
        <p className="text-lg leading-loose text-slate-700">
          Cette méthode permet de rester joignable aux escales, sans risque de facture à trois
          chiffres au retour.
        </p>
        </section>
      </AnimatedSection>

      <footer className="signature-bloc mb-10 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-teal-50/40 px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Image
            src="/images/etienne.webp"
            alt="Portrait d'Etienne, auteur de l'article"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div>
              <p className="leading-relaxed text-slate-700">
              <a
                href="https://www.linkedin.com/in/etienne-tillier-pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 underline underline-offset-2 hover:text-teal-900"
              >
                <strong>Etienne</strong>
              </a>{" "}
              — Passionné de voyage et de tech, j&apos;aide les
              voyageurs à rester connectés sans se ruiner, que ce soit en pleine jungle
              thaïlandaise ou au milieu de l&apos;Atlantique. J&apos;ai testé personnellement une bonne partie des solutions présentées dans cet article avant de vous les recommander.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/mybestsim/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-white hover:text-teal-700"
                aria-label="Instagram"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Mybestsim/61568955372340/?sk=about"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-white hover:text-teal-700"
                aria-label="Facebook"
              >
                <IconFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@MyBestSim"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-white hover:text-teal-700"
                aria-label="YouTube"
              >
                <IconYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/etienne-tillier-pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-white hover:text-teal-700"
                aria-label="LinkedIn"
              >
                <IconLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section id="destinations-similaires" className="mb-8">
        <h3 className="mb-3 text-xl font-semibold text-slate-900">Destinations similaires</h3>
        <ul className="list-disc space-y-2 pl-5 text-teal-700">
          <li>
            <a
              href="https://mybestsim.com/fr/meilleure-carte-esim-thailande/"
              {...EXTERNAL}
            >
              eSIM Thaïlande : le guide complet 2026
            </a>
          </li>
          <li>
            <a
              href="https://mybestsim.com/fr/blog/"
              {...EXTERNAL}
            >
              Voir tous nos guides eSIM →
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
