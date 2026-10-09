import { ClipboardList, Ruler, UserRound, WalletCards } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StitchDivider } from "@/components/ui/stitch-divider";

type Tone = "green" | "gold" | "light" | "dark";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  tone: Tone;
};

const FEATURES: Feature[] = [
  {
    icon: UserRound,
    title: "Gestion des clients",
    description:
      "Coordonnées, préférences et historique réunis dans une fiche claire, accessible en un instant.",
    tone: "green",
  },
  {
    icon: ClipboardList,
    title: "Suivi des commandes",
    description:
      "Visualisez d'un coup d'œil les commandes à traiter et celles déjà terminées.",
    tone: "gold",
  },
  {
    icon: Ruler,
    title: "Prise de mesures",
    description:
      "Conservez les mesures de chaque client pour les retrouver sans jamais les redemander.",
    tone: "light",
  },
  {
    icon: WalletCards,
    title: "Paiements intégrés",
    description:
      "Suivez les acomptes, les soldes et toutes les transactions de l'atelier.",
    tone: "dark",
  },
];

const TONE: Record<Tone, { card: string; badge: string; body: string }> = {
  green: {
    card: "bg-primary text-white",
    badge: "bg-gold text-primary-dark",
    body: "text-white/80",
  },
  gold: {
    card: "bg-gold text-primary-dark",
    badge: "bg-primary-dark text-white",
    body: "text-primary-dark/80",
  },
  light: {
    card: "bg-primary-light text-primary-dark",
    badge: "bg-primary text-white",
    body: "text-primary-dark/70",
  },
  dark: {
    card: "bg-primary-dark text-white",
    badge: "bg-gold text-primary-dark",
    body: "text-white/75",
  },
};

function FeatureCard({ item }: { item: Feature }) {
  const Icon = item.icon;
  const t = TONE[item.tone];
  return (
    <article
      className={`flex flex-col rounded-3xl p-6 shadow-[0_20px_50px_-40px_rgba(7,31,20,0.5)] transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none sm:p-7 ${t.card}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${t.badge}`}
      >
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-serif text-xl font-bold sm:text-2xl">
        {item.title}
      </h3>
      <p className={`mt-2.5 text-sm leading-6 ${t.body}`}>{item.description}</p>
    </article>
  );
}

export function Features() {
  return (
    <section id="fonctionnalites" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <StitchDivider withScissors className="mb-7" />
          <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
            Pourquoi choisir Ateliya
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
            Tout ce qu'il faut pour
            <span className="text-primary"> votre atelier.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Vos clients, vos commandes et vos paiements enfin réunis dans une
            seule application.
          </p>
        </header>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
