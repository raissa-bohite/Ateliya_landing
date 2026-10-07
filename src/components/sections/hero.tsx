import Image from "next/image";
import { ChevronDown, Star } from "lucide-react";

const PHONES = [
  {
    src: "/screens/gestion.webp",
    alt: "Suivi des commandes dans l'application Ateliya",
    wrapClassName:
      "relative z-10 mt-20 w-[148px] -rotate-[10deg] sm:mt-28 sm:w-[220px]",
  },
  {
    src: "/screens/accueil.webp",
    alt: "Tableau de bord de l'atelier dans l'application Ateliya",
    wrapClassName: "relative z-20 mt-0 w-[196px] sm:w-[292px]",
  },
  {
    src: "/screens/rapport.webp",
    alt: "Rapports et paiements dans l'application Ateliya",
    wrapClassName:
      "relative z-10 mt-20 w-[148px] rotate-[10deg] sm:mt-28 sm:w-[220px]",
  },
] as const;

const TICKER_ITEMS = [
  "Gestion des clients",
  "Prise de mesures",
  "Suivi des commandes",
  "Paiements intégrés",
  "Rapports en temps réel",
];

function AppleBadge() {
  return (
    <a
      href="https://apps.apple.com/us/app/ateliya/id6755125319"
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[58px] items-center gap-2.5 rounded-full bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-dark"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] opacity-80">Télécharger sur</span>
        <span className="text-sm font-semibold">App Store</span>
      </span>
    </a>
  );
}

function GooglePlayBadge() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.ateliya.app"
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[58px] items-center gap-2.5 rounded-full bg-primary px-5 py-2.5 text-white transition-colors hover:bg-primary-dark"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] opacity-80">Disponible sur</span>
        <span className="text-sm font-semibold">Google Play</span>
      </span>
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative flex h-[100svh] flex-col overflow-hidden pt-24 pb-0 sm:pt-28">
      {/* Fond lumineux */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0c5e3f 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-5 text-center lg:px-8">
        <h1 className="mx-auto max-w-[22ch] font-serif text-5xl leading-[0.98] font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
          Votre atelier de couture,
          <span className="text-primary italic"> enfin sous contrôle.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-xl sm:leading-relaxed">
          Gérez votre atelier simplement, depuis votre mobile. Clients, mesures,
          commandes et paiements : tout est réuni dans Ateliya.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <AppleBadge />
          <GooglePlayBadge />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="text-base font-medium text-text-secondary">
            Noté 4.8 · des centaines d&apos;ateliers équipés
          </p>
        </div>
      </div>

      {/* Cartes téléphones — conteneur clippé : cercle + téléphones coupés sur la même ligne */}
      <div className="relative mx-auto mt-10 flex min-h-0 w-full max-w-6xl flex-1 items-start justify-center gap-0.5 overflow-hidden sm:mt-12 sm:gap-1">
        <div className="absolute top-12 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold-light/60 sm:top-16 sm:h-[58rem] sm:w-[58rem]" />

        {PHONES.map((phone) => (
          <div key={phone.src} className={phone.wrapClassName}>
            <div className="aspect-[1206/2622] rounded-[1.75rem] bg-primary-dark p-1.5 shadow-[0_25px_60px_-20px_rgba(7,31,20,0.45)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.3rem] bg-ivory">
                <div className="absolute top-1.5 left-1/2 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-primary-dark" />
                <Image
                  src={phone.src}
                  alt={phone.alt}
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#fonctionnalites"
        className="absolute bottom-[4.25rem] right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/95 px-4 py-2.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:right-8 sm:text-sm"
      >
        Défiler pour découvrir
        <ChevronDown
          size={16}
          className="animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        />
      </a>

      {/* Bandeau défilant — vient juste sous la ligne de coupe des téléphones et du cercle */}
      <div className="relative z-30 overflow-hidden border-y border-border/70 bg-background/95 py-2.5">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
            (item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 text-sm font-semibold tracking-wide text-primary"
              >
                {item}
                <span className="text-gold">•</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
