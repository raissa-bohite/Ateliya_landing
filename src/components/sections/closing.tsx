import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Plus, Quote, Star } from "lucide-react";
import { StitchDivider } from "@/components/ui/stitch-divider";

const PAYMENT_METHODS = [
  { name: "Orange Money", src: "/Orange_logo.png", width: 120 },
  { name: "MTN Mobile Money", src: "/MTN_Logo.png", width: 104 },
  { name: "Moov Money", src: "/moov_logo.png", width: 104 },
  { name: "Wave", src: "/wave_logo.webp", width: 110 },
];

const FOOTER_PRODUCT = [
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Témoignages", href: "/#temoignages" },
  { label: "FAQ", href: "/#faq" },
];

const FOOTER_START = [
  { label: "S'inscrire", href: "/inscription" },
  { label: "Contact", href: "/contact" },
];

const TESTIMONIALS = [
  {
    quote:
      "Ateliya a complètement transformé la gestion de mon atelier. Je gagne un temps fou sur les commandes et la facturation. C'est l'outil indispensable !",
    author: "Fatou Diop",
    role: "Couturière & propriétaire d’atelier",
  },
  {
    quote:
      "Depuis que j'utilise Ateliya, je ne gère plus mes clients à la main. Tout est automatisé et organisé. Recommandé !",
    author: "Mariam Sall",
    role: "Directrice d’atelier",
  },
  {
    quote:
      "Le suivi de mes commandes n'a jamais été aussi facile. Ateliya a vraiment augmenté ma productivité.",
    author: "Aïssatou Ba",
    role: "Couturière indépendante",
  },
];

// Contenu à relire/valider avant mise en ligne (sécurité, tarifs, essai).
const FAQ_ITEMS = [
  {
    question: "Comment fonctionne Ateliya ?",
    answer:
      "Ateliya réunit vos clients, leurs mesures, vos commandes et vos paiements dans une seule application mobile. Vous créez votre atelier en quelques minutes et commencez à enregistrer clients et commandes immédiatement.",
  },
  {
    question: "Puis-je essayer gratuitement ?",
    answer:
      "Oui, vous pouvez créer votre compte et tester Ateliya sans carte bancaire. Vous ne passez à une formule payante que lorsque vous êtes prête.",
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer:
      "Les paiements se font via Mobile Money : Orange Money, MTN Mobile Money, Moov et Wave. Aucune carte bancaire n'est nécessaire.",
  },
  {
    question: "Ateliya fonctionne-t-il sur Android et iPhone ?",
    answer:
      "Oui, l'application est disponible gratuitement sur le Play Store (Android) et l'App Store (iPhone).",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Vos données d'atelier (clients, mesures, paiements) sont stockées de façon sécurisée et restent privées : vous seule accédez à votre atelier.",
  },
  {
    question: "Combien coûte l'abonnement ?",
    answer:
      "Les tarifs sont détaillés sur la page Tarifs. Vous choisissez la formule adaptée à la taille de votre atelier.",
  },
];

export function ClosingSections() {
  return (
    <>
      <section id="temoignages" className="bg-primary-light py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <StitchDivider withScissors className="mb-7" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              La parole aux ateliers
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
              Ateliya au quotidien.
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary sm:text-lg">
              Les retours de celles qui font vivre leur atelier chaque jour.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => {
              const initials = testimonial.author
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const avatarTone = [
                "bg-primary text-white",
                "bg-gold text-primary-dark",
                "bg-primary-dark text-white",
              ][index % 3];
              return (
                <figure
                  key={testimonial.author}
                  className="flex flex-col rounded-3xl bg-card p-7 shadow-[0_24px_60px_-40px_rgba(7,31,20,0.45)]"
                >
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label="5 étoiles sur 5"
                  >
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        size={15}
                        fill="currentColor"
                        strokeWidth={0}
                        className="text-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote
                    size={28}
                    strokeWidth={1.4}
                    className="mt-5 text-primary/25"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-3 flex-1 font-serif text-lg leading-relaxed text-text sm:text-xl">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarTone}`}
                      aria-hidden="true"
                    >
                      {initials}
                    </span>
                    <div>
                      <p className="font-semibold text-text">
                        {testimonial.author}
                      </p>
                      <p className="mt-0.5 text-sm text-text-secondary">
                        {testimonial.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ — accordéon natif <details>, aucun JS requis */}
      <section id="faq" className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <header className="lg:pt-2">
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Questions fréquentes
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-text sm:text-5xl">
              Tout ce que vous voulez savoir.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-text-secondary">
              Une autre question ? Écrivez-nous, on vous répond vite.
            </p>
          </header>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border/70 bg-card px-5 open:shadow-[0_20px_50px_-40px_rgba(7,31,20,0.4)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-text [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    size={18}
                    strokeWidth={2.2}
                    className="shrink-0 text-primary transition-transform duration-200 group-[[open]]:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-7 text-text-secondary">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — carte photo pleine largeur façon Paykko. */}
      <section
        id="contact"
        className="bg-primary-dark px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center justify-center overflow-hidden rounded-[2rem] text-center sm:min-h-[600px]">
          <Image
            src="/cta-ateliya.webp"
            alt="Rejoignez la communauté des ateliers Ateliya"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary-dark/55" />

          <div className="relative z-10 flex flex-col items-center px-6 py-16">
            <h2
              className="max-w-3xl font-serif text-5xl leading-[1.02] font-bold text-white sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
            >
              Rejoignez Ateliya maintenant.
            </h2>
            <p
              className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.55)" }}
            >
              Téléchargez l'application et gérez tout votre atelier de couture
              depuis votre mobile.
            </p>

            {/* Pilule : texte + icônes stores + QR */}
            <div className="mt-9 inline-flex items-center gap-4 rounded-full bg-gold py-2.5 pr-2.5 pl-6 text-primary-dark shadow-xl">
              <span className="text-sm font-semibold sm:text-base">
                Télécharger l&apos;app
              </span>
              <a
                href="https://apps.apple.com/us/app/ateliya/id6755125319"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Télécharger sur l'App Store"
                className="transition-transform hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.ateliya.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Disponible sur Google Play"
                className="transition-transform hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
              </a>
              <span className="h-9 w-px bg-primary-dark/25" />
              <div className="rounded-xl bg-white p-1.5">
                <Image
                  src="/qr-download.png"
                  alt="QR code pour télécharger Ateliya"
                  width={44}
                  height={44}
                  className="h-11 w-11"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary-dark text-sm text-white/65">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          {/* Moyens de paiement intégrés */}
          <div className="mb-12 flex flex-col items-center gap-5 border-b border-white/15 pb-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
              Paiements intégrés
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {PAYMENT_METHODS.map((method) => (
                <Image
                  key={method.name}
                  src={method.src}
                  alt={method.name}
                  width={method.width}
                  height={32}
                  className="h-7 w-auto object-contain"
                  style={{ width: "auto" }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            {/* Marque */}
            <div className="max-w-sm">
              <Link href="/" className="flex items-center gap-2.5">
                <Image
                  src="/ateliya.webp"
                  alt="Ateliya"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-serif text-lg font-bold text-white">
                  Ateliya
                </span>
              </Link>
              <p className="mt-4 leading-6">
                La gestion de votre atelier de couture — clients, mesures,
                commandes et paiements — réunie dans une seule application.
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href="https://wa.me/2250501242929?text=Bonjour%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Ateliya."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                </a>
                <a
                  href="mailto:support@ateliya.com"
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Produit */}
            <div>
              <h3 className="font-semibold text-white">Produit</h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_PRODUCT.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commencer */}
            <div>
              <h3 className="font-semibold text-white">Commencer</h3>
              <ul className="mt-4 space-y-3">
                {FOOTER_START.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://apps.apple.com/us/app/ateliya/id6755125319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    App Store
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.ateliya.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    Google Play
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ateliya. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/conditions"
                className="transition-colors hover:text-white"
              >
                Conditions d&apos;utilisation
              </Link>
              <Link
                href="/politique"
                className="transition-colors hover:text-white"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
