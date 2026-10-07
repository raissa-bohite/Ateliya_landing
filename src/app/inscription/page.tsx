import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InscriptionForm } from "@/components/sections/inscription-form";
import { StitchDivider } from "@/components/ui/stitch-divider";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Créez votre compte Ateliya et commencez à gérer votre atelier de couture : clients, mesures, commandes et paiements.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/inscription/" },
};

const AVANTAGES = [
  "Gestion des clients et des mesures",
  "Suivi des commandes en temps réel",
  "Paiements et facturation simplifiés",
  "Application mobile incluse",
];

export default function InscriptionPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-background px-5 pb-16 pt-32 sm:pt-40">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
            <div className="lg:pt-6">
              <StitchDivider withScissors align="left" className="mb-5" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Inscription Ateliya
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
                Gérez votre atelier comme un pro.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-text-secondary sm:text-lg">
                Créez votre compte en quelques instants et retrouvez tout votre
                atelier dans une seule application.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {AVANTAGES.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-text"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <InscriptionForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
