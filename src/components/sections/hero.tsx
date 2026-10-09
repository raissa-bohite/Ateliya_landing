import Image from "next/image";
import { ChevronDown } from "lucide-react";

/* --------------------------------- Badges --------------------------------- */
/* Styles clairs pour ressortir sur le fond vert foncé de la hero.            */

function AppleBadge() {
  return (
    <a
      href="https://apps.apple.com/us/app/ateliya/id6755125319"
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-[54px] items-center gap-2.5 rounded-full bg-ivory px-5 py-2.5 text-primary-dark transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] opacity-70">Télécharger sur</span>
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
      className="flex min-h-[54px] items-center gap-2.5 rounded-full bg-gold px-5 py-2.5 text-primary-dark transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] opacity-70">Disponible sur</span>
        <span className="text-sm font-semibold">Google Play</span>
      </span>
    </a>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-primary-dark">
      {/* ----- Fond : photo de l'atelier -----
          La vidéo viendra plus tard (voir /public/hero-atelier.mp4). */}
      <Image
        src="/hero-atelier-app.webp"
        alt="Couturière présentant l'application Ateliya dans son atelier"
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover object-center motion-reduce:animate-none"
      />
      {/* Voiles dégradés LÉGERS : juste assez pour lire le titre en bas-gauche,
          sans assombrir toute la vidéo (le texte a aussi une ombre portée). */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      {/* Scrim en haut : rend le header (texte blanc) lisible sur l'image claire. */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />

      <div className="relative mx-auto flex min-h-0 w-full max-w-[88rem] flex-1 flex-col px-5 pt-28 pb-10 lg:px-10">
        {/* ------------------------- Bloc titre -------------------------- */}
        {/* Tout à gauche : la couturière + le téléphone occupent la droite. */}
        <div className="mt-auto max-w-4xl">
          <p
            className="animate-fade-up mb-4 text-xs font-semibold tracking-[0.22em] text-white/90 uppercase motion-reduce:animate-none sm:text-sm"
            style={{
              textShadow:
                "0 2px 14px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,0.9)",
              animationDelay: "0.1s",
            }}
          >
            L&apos;application de gestion pour ateliers de couture
          </p>

          <h1
            className="animate-fade-up font-serif text-6xl leading-[0.95] font-bold tracking-tight text-white motion-reduce:animate-none sm:text-7xl lg:text-8xl"
            style={{
              textShadow: "0 2px 24px rgba(0,0,0,0.6)",
              animationDelay: "0.25s",
            }}
          >
            Votre atelier,
            <br />
            <span className="text-white italic">enfin sous contrôle.</span>
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-white/90 motion-reduce:animate-none sm:text-lg"
            style={{
              textShadow: "0 1px 12px rgba(0,0,0,0.6)",
              animationDelay: "0.45s",
            }}
          >
            Fini le carnet et les oublis : clients, mesures, commandes et
            paiements réunis dans une seule app.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-3 motion-reduce:animate-none"
            style={{ animationDelay: "0.6s" }}
          >
            <AppleBadge />
            <GooglePlayBadge />
          </div>
        </div>
      </div>

      {/* Indice de scroll */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <div
          className="flex flex-col items-center gap-1 text-white/85"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.75)" }}
        >
          <span className="text-xs font-medium tracking-wide uppercase">
            Découvrir
          </span>
          <ChevronDown
            size={20}
            className="animate-bounce motion-reduce:animate-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
