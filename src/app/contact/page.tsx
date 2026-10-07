import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StitchDivider } from "@/components/ui/stitch-divider";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l’équipe Ateliya par WhatsApp, téléphone ou e-mail pour une question sur l’application.",
  alternates: { canonical: "/contact/" },
};

const CONTACT_CHANNELS = [
  {
    title: "WhatsApp",
    value: "+225 05 01 24 29 29",
    description: "Écrivez-nous directement",
    href: "https://wa.me/2250501242929?text=Bonjour%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Ateliya.",
    icon: MessageCircle,
    primary: true,
  },
  {
    title: "Téléphone",
    value: "+225 05 01 24 29 29",
    description: "Appelez l’équipe Ateliya",
    href: "tel:+2250501242929",
    icon: Phone,
    primary: false,
  },
  {
    title: "E-mail",
    value: "support@ateliya.com",
    description: "Pour les demandes détaillées",
    href: "mailto:support@ateliya.com",
    icon: Mail,
    primary: false,
  },
];

const FAQ = [
  {
    question: "Comment obtenir de l’aide rapidement ?",
    answer:
      "Écrivez-nous sur WhatsApp ou appelez-nous au +225 05 01 24 29 29 pendant les horaires de disponibilité.",
  },
  {
    question: "Puis-je demander une présentation de l’application ?",
    answer:
      "Oui. Contactez-nous et l’équipe Ateliya pourra vous renseigner sur l’application et ses fonctionnalités.",
  },
  {
    question: "Où se trouve Ateliya ?",
    answer:
      "Ateliya fonctionne en ligne. L’assistance et les renseignements sont disponibles par téléphone, WhatsApp et e-mail.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-background px-5 pb-10 pt-32 text-center sm:pb-14 sm:pt-40">
          <div className="mx-auto max-w-3xl">
            <StitchDivider withScissors className="mb-7" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Contact Ateliya
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight text-text sm:text-6xl">
              Parlons de votre atelier.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Une question sur l’application ou ses fonctionnalités ? Choisissez
              le moyen de contact qui vous convient.
            </p>
          </div>
        </section>

        <section className="bg-card px-5 py-10 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-5">
            {CONTACT_CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={
                    channel.href.startsWith("https:") ? "_blank" : undefined
                  }
                  rel={
                    channel.href.startsWith("https:")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group flex min-h-[190px] flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 sm:p-7 ${channel.primary ? "bg-primary text-white" : "border border-border bg-background text-text"}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${channel.primary ? "bg-white/15 text-white" : "bg-primary-light text-primary"}`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      size={19}
                      className={
                        channel.primary
                          ? "text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          : "text-primary/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`mt-5 text-xs font-bold uppercase tracking-[0.16em] ${channel.primary ? "text-white/65" : "text-primary"}`}
                  >
                    {channel.title}
                  </span>
                  <span className="mt-1 font-serif text-xl font-semibold">
                    {channel.value}
                  </span>
                  <span
                    className={`mt-1 text-sm ${channel.primary ? "text-white/75" : "text-text-secondary"}`}
                  >
                    {channel.description}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mx-auto mt-6 flex max-w-6xl items-start gap-3 rounded-xl border border-border/80 px-5 py-4 text-sm text-text-secondary">
            <Clock3
              size={18}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p>
              Disponibilité : du lundi au samedi, de 8 h à 20 h GMT. En dehors
              de ces horaires, vous pouvez laisser un message sur WhatsApp.
            </p>
          </div>
        </section>

        <section className="bg-background px-5 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <header className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Questions fréquentes
              </p>
              <h2 className="mt-3 font-serif text-3xl text-text sm:text-4xl">
                Avant de nous écrire
              </h2>
            </header>
            <div className="divide-y divide-border border-y border-border">
              {FAQ.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
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
