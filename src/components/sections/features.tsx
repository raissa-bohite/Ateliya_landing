import Image from "next/image";
import { ClipboardList, Ruler, UserRound, WalletCards } from "lucide-react";
import { StitchDivider } from "@/components/ui/stitch-divider";

const FEATURES = [
  {
    icon: UserRound,
    title: "Gestion des clients",
    description:
      "Coordonnées, préférences et historique réunis dans une fiche.",
  },
  {
    icon: ClipboardList,
    title: "Suivi des commandes",
    description: "Visualisez les commandes à traiter et celles déjà terminées.",
  },
  {
    icon: Ruler,
    title: "Prise de mesures",
    description:
      "Conservez les mesures de chaque client pour les retrouver facilement.",
  },
  {
    icon: WalletCards,
    title: "Paiements intégrés",
    description:
      "Suivez les acomptes, les soldes et les transactions de l’atelier.",
  },
];

function Feature({ item }: { item: (typeof FEATURES)[number] }) {
  const Icon = item.icon;
  return (
    <article className="flex gap-4 border-t border-border/80 py-5 sm:py-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold text-text">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-text-secondary">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function Features() {
  return (
    <section id="fonctionnalites" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <StitchDivider withScissors className="mb-7" />
          <p className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Pourquoi choisir Ateliya
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
            Tout ce qu’il faut pour
            <span className="text-primary"> votre atelier.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary sm:text-lg">
            Vos clients, vos commandes et vos paiements enfin réunis dans une
            seule application.
          </p>
        </header>

        <div className="mx-auto mt-14 grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_minmax(250px,0.95fr)_1fr] md:gap-8">
          <div>
            {FEATURES.slice(0, 2).map((item) => (
              <Feature key={item.title} item={item} />
            ))}
          </div>

          <div className="relative mx-auto flex w-full max-w-[330px] justify-center py-3 md:py-0">
            <div className="absolute left-1/2 top-1/2 aspect-square w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bg" />
            <Image
              src="/screens/accueil.webp"
              alt="Tableau de bord de l’application Ateliya"
              width={1206}
              height={2622}
              sizes="(min-width: 768px) 220px, 180px"
              className="relative z-10 w-[82%] rounded-[2rem] border-[5px] border-primary-dark bg-ivory shadow-xl"
            />
          </div>

          <div>
            {FEATURES.slice(2).map((item) => (
              <Feature key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
