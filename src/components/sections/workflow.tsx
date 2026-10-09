"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*  Showcase scroll-pinné façon Paykko : une scène collante qui se métamorphose */
/*  au fil du scroll (couleur, capture, titre, description, indicateur 01·02·03) */
/* -------------------------------------------------------------------------- */

type Theme = "green" | "gold" | "dark";

type Step = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  screen: string;
  alt: string;
  theme: Theme;
};

const STEPS: Step[] = [
  {
    number: "01",
    eyebrow: "Vos clients",
    title: "Chaque client, bien accompagné.",
    description:
      "Coordonnées, préférences et mesures réunies dans une fiche complète. Vous retrouvez tout l'historique d'un client en un instant.",
    screen: "/screens/gestion.webp",
    alt: "Fiches clients et gestion de l'atelier dans Ateliya",
    theme: "green",
  },
  {
    number: "02",
    eyebrow: "Vos commandes",
    title: "Chaque création, bien suivie.",
    description:
      "Modèle, échéances, avancement et acomptes : gardez chaque commande sous contrôle, du premier essayage à la livraison.",
    screen: "/screens/accueil.webp",
    alt: "Tableau de bord et suivi des commandes dans Ateliya",
    theme: "gold",
  },
  {
    number: "03",
    eyebrow: "Votre activité",
    title: "Votre atelier, en un coup d'œil.",
    description:
      "Transactions, paiements et statistiques réunis. Vous suivez la santé de votre atelier en temps réel, où que vous soyez.",
    screen: "/screens/rapport.webp",
    alt: "Rapports et statistiques de l'atelier dans Ateliya",
    theme: "dark",
  },
];

const THEME: Record<
  Theme,
  { section: string; eyebrow: string; title: string; body: string }
> = {
  green: {
    section: "bg-primary text-white",
    eyebrow: "text-gold-light",
    title: "text-white",
    body: "text-white/80",
  },
  gold: {
    section: "bg-gold text-primary-dark",
    eyebrow: "text-primary-dark/70",
    title: "text-primary-dark",
    body: "text-primary-dark/80",
  },
  dark: {
    section: "bg-primary-dark text-white",
    eyebrow: "text-gold-light",
    title: "text-white",
    body: "text-white/80",
  },
};

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-full w-full rounded-[2.2rem] bg-primary-dark p-1.5 shadow-[0_35px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
      <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-ivory">
        <div className="absolute top-1.5 left-1/2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-primary-dark" />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="260px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function Workflow() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const distance = el.offsetHeight - vh; // course de scroll pendant le pin
      const scrolled = Math.min(
        Math.max(-el.getBoundingClientRect().top, 0),
        distance,
      );
      const p = distance > 0 ? scrolled / distance : 0;
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = STEPS[active];
  const t = THEME[current.theme];
  const dimClass =
    current.theme === "gold" ? "text-primary-dark/45" : "text-white/45";
  const onClass = current.theme === "gold" ? "text-primary-dark" : "text-white";

  return (
    <section
      id="parcours"
      ref={trackRef}
      className="relative"
      style={{ height: `${STEPS.length * 100}svh` }}
    >
      <div
        className={`sticky top-0 flex h-[100svh] flex-col overflow-hidden transition-colors duration-700 ${t.section}`}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-5 lg:px-10">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_auto_1fr] lg:gap-10">
            {/* Titre (gauche) — rejoué à chaque changement d'étape */}
            <div
              key={`title-${active}`}
              className="animate-fade-up motion-reduce:animate-none"
            >
              <p
                className={`text-xs font-bold tracking-[0.2em] uppercase ${t.eyebrow}`}
              >
                {current.number} — {current.eyebrow}
              </p>
              <h2
                className={`mt-4 font-serif text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl ${t.title}`}
              >
                {current.title}
              </h2>
            </div>

            {/* Téléphone (centre) — captures empilées, fondu entre elles */}
            <div className="relative mx-auto h-[335px] w-[154px] sm:h-[470px] sm:w-[216px] lg:h-[565px] lg:w-[260px]">
              {STEPS.map((s, i) => (
                <div
                  key={s.number}
                  className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={i !== active}
                >
                  <Phone src={s.screen} alt={s.alt} />
                </div>
              ))}
            </div>

            {/* Description (droite) */}
            <div
              key={`desc-${active}`}
              className="animate-fade-up motion-reduce:animate-none"
            >
              <p className={`text-base leading-7 sm:text-lg ${t.body}`}>
                {current.description}
              </p>
            </div>
          </div>
        </div>

        {/* Indicateur de progression 01 · 02 · 03 */}
        <div className="mx-auto w-full max-w-6xl px-5 pb-8 lg:px-10 lg:pb-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-current/15 pt-6">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.number}
                  className={`flex items-center gap-2.5 text-sm transition-colors ${isActive ? onClass : dimClass}`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      isActive
                        ? current.theme === "gold"
                          ? "bg-primary-dark text-white"
                          : "bg-white text-primary-dark"
                        : "border border-current"
                    }`}
                  >
                    {s.number}
                  </span>
                  <span className={isActive ? "font-semibold" : "font-medium"}>
                    {s.eyebrow}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
