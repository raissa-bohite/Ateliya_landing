import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, TrendingUp, WalletCards } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StitchDivider } from "@/components/ui/stitch-divider";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvrez les outils Ateliya pour gérer les clients, les mesures, les commandes et les paiements de votre atelier de couture.",
  alternates: { canonical: "/fonctionnalites/" },
};

function AppScreen({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[1.7rem] border-[5px] border-primary-dark bg-white shadow-[0_25px_55px_-28px_rgba(7,31,20,0.45)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1206}
        height={2622}
        sizes="(min-width: 768px) 260px, 48vw"
        className="h-auto w-full"
      />
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="overflow-hidden bg-background px-5 pb-16 pt-32 sm:pb-20 sm:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <div className="relative z-10">
              <StitchDivider withScissors align="left" className="mb-5" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Une application pour votre atelier
              </p>
              <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] tracking-tight text-text sm:text-6xl">
                Tout votre atelier, à sa juste place.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                Clients, mesures, commandes et paiements réunis dans Ateliya,
                pour suivre votre travail depuis votre mobile.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tarifs"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  Voir les tarifs <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  Parler à l’équipe
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-text-secondary">
                {["Clients", "Commandes", "Paiements"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check
                      size={14}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex h-[410px] w-full max-w-[500px] items-end justify-center sm:h-[500px]">
              <div className="absolute bottom-[-7rem] left-1/2 aspect-square w-[94%] -translate-x-1/2 rounded-full bg-gold/45" />
              <div className="absolute bottom-[-4rem] left-1/2 aspect-square w-[78%] -translate-x-1/2 rounded-full border border-primary/20" />
              <AppScreen
                src="/screens/gestion.webp"
                alt="Gestion des clients et commandes sur Ateliya"
                className="absolute bottom-0 left-[13%] z-10 w-[39%] -rotate-[9deg]"
              />
              <AppScreen
                src="/screens/accueil.webp"
                alt="Écran d’accueil de l’application Ateliya"
                className="relative z-20 w-[45%] rotate-[2deg]"
              />
            </div>
          </div>
        </section>

        <section className="bg-card px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <header className="mb-12 max-w-2xl sm:mb-16">
              <StitchDivider align="left" className="mb-5" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Votre atelier, en un seul espace
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
                Chaque détail trouve sa place.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
                Une vue d’ensemble pour avancer sereinement, et les bons outils
                à portée de main quand vous en avez besoin.
              </p>
            </header>

            <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
              <article
                id="clients"
                className="relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[2rem] bg-primary-light/60 p-7 sm:p-10 lg:col-span-7 lg:row-span-2"
              >
                <div className="relative z-20 max-w-[62%] sm:max-w-[19rem]">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    01 · Clients & mesures
                  </span>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-text sm:text-4xl">
                    Chaque client, connu par cœur.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
                    Coordonnées, préférences, commandes et mesures réunies dans
                    une fiche facile à retrouver.
                  </p>
                </div>
                <div className="absolute -bottom-20 -right-8 h-64 w-64 rounded-full bg-gold/35 sm:-bottom-24 sm:right-2 sm:h-80 sm:w-80" />
                <AppScreen
                  src="/screens/accueil.webp"
                  alt="Tableau de bord Ateliya avec un aperçu des clients et de l’activité de l’atelier"
                  className="absolute bottom-0 right-[8%] z-10 w-[34%] max-w-[220px] rotate-[3deg] sm:right-[10%]"
                />
                <div className="absolute bottom-10 left-7 z-20 hidden rounded-full border border-primary/15 bg-card/90 px-4 py-2 text-xs font-semibold text-primary shadow-sm sm:block sm:left-10">
                  Mesures toujours accessibles
                </div>
              </article>

              <article
                id="commandes"
                className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-7 text-white sm:p-9 lg:col-span-5"
              >
                <div className="relative z-10 max-w-[65%]">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                    02 · Commandes
                  </span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">
                    Le fil de chaque création, bien suivi.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                    Gardez les détails, les échéances et l’avancement à portée
                    de main.
                  </p>
                </div>
                <div className="absolute -bottom-20 -right-16 h-52 w-52 rounded-full border border-white/15" />
                <AppScreen
                  src="/screens/accueil.webp"
                  alt="Suivi des commandes sur l’écran d’accueil Ateliya"
                  className="absolute bottom-0 right-[7%] z-10 w-[29%] max-w-[130px] rotate-[3deg]"
                />
                <span className="relative z-20 mt-5 text-xs font-medium text-white/80">
                  En cours <span className="mx-2 text-gold">•</span> Terminées
                </span>
              </article>

              <article
                id="paiements"
                className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[2rem] border border-border/80 bg-background p-7 sm:p-9 lg:col-span-5"
              >
                <div className="relative z-10 max-w-[65%]">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    03 · Paiements
                  </span>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-text">
                    Des règlements sans zone floue.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Suivez les acomptes, les soldes et les transactions de
                    l’atelier.
                  </p>
                </div>
                <AppScreen
                  src="/screens/gestion.webp"
                  alt="Écran des transactions et paiements de l’atelier"
                  className="absolute bottom-0 right-[8%] z-10 w-[29%] max-w-[130px] rotate-[3deg]"
                />
                <span className="relative z-20 mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary-light px-3 py-2 text-xs font-semibold text-primary">
                  <WalletCards size={14} aria-hidden="true" /> Transactions
                  suivies
                </span>
              </article>

              <article
                id="activite"
                className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[2rem] bg-gold-bg p-7 sm:p-9 lg:col-span-7"
              >
                <div className="relative z-10 max-w-[19rem]">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    04 · Vue d’ensemble
                  </span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-text">
                    Votre activité, d’un seul regard.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    Retrouvez les indicateurs utiles et prenez le pouls de votre
                    atelier.
                  </p>
                </div>
                <AppScreen
                  src="/screens/rapport.webp"
                  alt="Rapports et statistiques de l’activité dans Ateliya"
                  className="absolute bottom-0 right-[7%] z-10 w-[31%] max-w-[145px] rotate-[3deg]"
                />
                <TrendingUp
                  className="absolute bottom-8 left-8 h-14 w-14 text-gold/70"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
