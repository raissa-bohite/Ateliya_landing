import Image from "next/image";
import { Check } from "lucide-react";
import { StitchDivider } from "@/components/ui/stitch-divider";

const CARDS = [
  {
    number: "01",
    eyebrow: "VOS CLIENTS",
    title: "Chaque client, bien accompagné.",
    description:
      "Retrouvez ses coordonnées, ses préférences et ses mesures dans une fiche complète.",
    front: "/screens/gestion.webp",
    alt: "Fiches clients et gestion de l’atelier dans Ateliya",
    tone: "sage",
  },
  {
    number: "02",
    eyebrow: "VOS COMMANDES",
    title: "Chaque création, bien suivie.",
    description:
      "Gardez les détails du modèle, les échéances et l’avancement à portée de main.",
    front: "/screens/accueil.webp",
    alt: "Tableau de bord et suivi des commandes dans Ateliya",
    tone: "gold",
  },
  {
    number: "03",
    eyebrow: "VOTRE ACTIVITÉ",
    title: "Votre atelier, en un coup d’œil.",
    description:
      "Suivez les transactions, les paiements et les statistiques de votre activité.",
    front: "/screens/rapport.webp",
    alt: "Rapports et statistiques de l’atelier dans Ateliya",
    tone: "sage",
  },
] as const;

function AppPreview({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <div className="relative mx-auto h-[258px] w-full max-w-[330px]">
      <div
        className={`absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full ${card.tone === "gold" ? "bg-gold/75" : "bg-primary/10"}`}
      />
      <div className="absolute bottom-0 left-1/2 z-20 h-[250px] w-[55%] -translate-x-1/2 overflow-hidden rounded-t-[1.5rem] border-[5px] border-b-0 border-primary-dark bg-white shadow-2xl motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none group-hover:-translate-y-2">
        <Image
          src={card.front}
          alt={card.alt}
          width={1206}
          height={2622}
          sizes="150px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

export function Workflow() {
  return (
    <section
      id="parcours"
      className="overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <StitchDivider withScissors className="mb-7" />
          <p className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Votre atelier, simplement
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
            Tout suit le fil de votre métier.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Du premier rendez-vous au suivi de l’activité, vos outils restent
            réunis dans Ateliya.
          </p>
        </header>

        <div className="mt-16 grid items-start gap-x-6 gap-y-14 md:grid-cols-3 lg:gap-x-8">
          {CARDS.map((card) => (
            <article key={card.number} className="group relative pt-10">
              <div className="relative rounded-[1.75rem] border border-border/80 bg-card px-5 pb-7 pt-0 shadow-[0_20px_50px_-40px_rgba(7,31,20,0.5)] motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-38px_rgba(7,31,20,0.35)] sm:px-6">
                <div className="-mt-10">
                  <AppPreview card={card} />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-serif text-3xl text-gold">
                    {card.number}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-[10px] font-bold tracking-[0.16em] text-primary">
                    {card.eyebrow}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-text">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {card.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-primary">
                  <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span>Dans une seule application</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
