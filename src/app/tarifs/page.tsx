import type { Metadata } from "next";
import { Check, CircleHelp, CreditCard, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PricingPlans } from "@/components/sections/pricing-plans";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Consultez les forfaits Ateliya pour votre atelier de couture et choisissez selon vos besoins.",
  alternates: { canonical: "/tarifs/" },
};

const FAQ = [
  {
    question: "Les tarifs sont-ils les mêmes dans tous les pays ?",
    answer:
      "Les forfaits affichés dépendent du pays sélectionné. Choisissez votre pays au-dessus des offres pour consulter les tarifs correspondants.",
  },
  {
    question: "Quels moyens de paiement sont disponibles ?",
    answer:
      "Les moyens proposés comprennent Orange Money, MTN Mobile Money, Moov Money et Wave. Les options disponibles peuvent varier selon le pays.",
  },
  {
    question: "Puis-je changer de forfait ?",
    answer:
      "Les forfaits disponibles sont présentés dans l’application. Pour vous aider à choisir, contactez l’équipe Ateliya.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-background px-5 pb-10 pt-32 text-center sm:pb-14 sm:pt-40">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Tarifs Ateliya
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-6xl">
              Une formule adaptée à votre atelier.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Comparez les offres disponibles pour votre pays et choisissez les
              outils qui correspondent à votre activité.
            </p>
          </div>
        </section>

        <section className="bg-card px-5 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <PricingPlans pays={[]} modules={[]} />
          </div>
        </section>

        <section className="border-y border-border/70 bg-background px-5 py-8 sm:py-10">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              { icon: Check, text: "Forfaits selon votre pays" },
              { icon: CreditCard, text: "Paiement mobile disponible" },
              { icon: ShieldCheck, text: "Paiement sécurisé" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center justify-center gap-3 text-sm font-medium text-text-secondary"
              >
                <Icon size={18} className="text-primary" aria-hidden="true" />
                {text}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <CircleHelp
                size={24}
                className="mx-auto text-primary"
                aria-hidden="true"
              />
              <h2 className="mt-3 font-serif text-3xl text-text sm:text-4xl">
                Questions sur les tarifs ?
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {FAQ.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-text marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                    {item.question}
                    <span
                      className="text-xl font-normal text-primary transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-3 pr-8 text-sm leading-6 text-text-secondary">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
