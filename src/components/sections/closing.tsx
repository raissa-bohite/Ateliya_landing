import Image from "next/image";
import { ArrowRight, MessageCircle, Quote, Star } from "lucide-react";
import { StitchDivider } from "@/components/ui/stitch-divider";

const PAYMENT_METHODS = [
  { name: "Orange Money", src: "/Orange_logo.png", width: 120 },
  { name: "MTN Mobile Money", src: "/MTN_Logo.png", width: 104 },
  { name: "Wave", src: "/wave_logo.webp", width: 110 },
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

export function ClosingSections() {
  return (
    <>
      <section className="border-y border-border/70 bg-card py-12 sm:py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 sm:flex-row sm:justify-between lg:px-8">
          <div className="text-center sm:text-left">
            <p className="font-serif text-xl font-semibold text-text">
              Des moyens de paiement adaptés à votre quotidien
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Retrouvez les options disponibles dans l’application Ateliya.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-7">
            {PAYMENT_METHODS.map((method) => (
              <Image
                key={method.name}
                src={method.src}
                alt={method.name}
                width={method.width}
                height={48}
                className="max-h-9 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="temoignages" className="bg-background py-20 sm:py-28">
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

          <div className="grid md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <figure
                key={testimonial.author}
                className={`relative flex flex-col px-2 py-7 sm:px-7 md:py-2 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} ${index === 0 ? "md:pr-9" : ""} ${index === 2 ? "md:pl-9" : ""}`}
              >
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label="5 étoiles sur 5"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      size={14}
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
                  className="mt-6 text-primary/30"
                  aria-hidden="true"
                />
                <blockquote className="mt-3 flex-1 font-serif text-xl leading-relaxed text-text sm:text-[1.35rem]">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-7">
                  <p className="font-semibold text-text">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="overflow-hidden bg-primary-dark text-white"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-12 sm:px-8 sm:pt-16 md:grid-cols-[1fr_0.6fr] lg:px-12">
          <div className="relative z-10 py-4 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              Ateliya, dans votre poche
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Votre atelier mérite une gestion plus simple.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">
              Retrouvez vos clients, commandes, mesures et paiements depuis
              l’application Ateliya.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://apps.apple.com/us/app/ateliya/id6755125319"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light"
              >
                App Store <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.ateliya.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Google Play <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="relative mx-auto flex h-[430px] w-full max-w-[330px] items-end justify-center overflow-hidden pt-8 sm:h-[500px] md:mt-5">
            <div className="absolute bottom-[-11rem] aspect-square w-[130%] rounded-full bg-gold/90" />
            <Image
              src="/screens/accueil.webp"
              alt="Aperçu de l’application Ateliya"
              width={1206}
              height={2622}
              sizes="(min-width: 768px) 250px, 220px"
              className="relative z-10 h-full max-h-[430px] w-auto max-w-[78%] rounded-t-[2rem] border-[5px] border-b-0 border-primary-dark bg-white object-contain object-top shadow-2xl sm:max-h-[500px]"
            />
          </div>
        </div>
      </section>

      <footer className="bg-primary-dark px-5 pb-7 pt-5 text-sm text-white/65">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ateliya. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="mailto:support@ateliya.com" className="hover:text-white">
              Nous contacter
            </a>
            <a
              href="https://wa.me/2250501242929?text=Bonjour%2C%20je%20voudrais%20en%20savoir%20plus%20sur%20Ateliya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <MessageCircle size={15} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
