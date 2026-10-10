import { useEffect, useRef, useState } from "react";
import { Check, Star, Package, Rocket, Gem, ArrowRight, X } from "lucide-react";

import {
  getPaysDisponibles,
  getModulesDisponibles,
  type ModuleBackend,
  type PaysOption,
} from "@/lib/services/abonnementService";

import AbonnementModal from "./AbonnementModal";

function planIcon(idx: number) {
  const className = "w-6 h-6";
  if (idx === 1) return <Rocket className={className} strokeWidth={1.75} />;
  if (idx >= 2) return <Gem className={className} strokeWidth={1.75} />;
  return <Package className={className} strokeWidth={1.75} />;
}

// Cartes en couleur pleine, même rythme vert / or / vert foncé que les
// cartes de la home (Features.astro, Showcase.astro) — en boucle si plus
// de 3 forfaits.
const TONES = [
  {
    card: "bg-primary text-white",
    body: "text-white/80",
    badge: "bg-gold text-primary-dark",
    divider: "border-white/20",
    button:
      "bg-gold text-primary-dark hover:bg-gold-light focus-visible:ring-gold/50",
  },
  {
    card: "bg-gold text-primary-dark",
    body: "text-primary-dark/80",
    badge: "bg-primary-dark text-white",
    divider: "border-primary-dark/15",
    button:
      "bg-primary-dark text-white hover:bg-primary focus-visible:ring-primary-dark/50",
  },
  {
    card: "bg-primary-dark text-white",
    body: "text-white/75",
    badge: "bg-gold text-primary-dark",
    divider: "border-white/15",
    button:
      "bg-gold text-primary-dark hover:bg-gold-light focus-visible:ring-gold/50",
  },
] as const;

interface PricingSectionProps {
  initialPays?: PaysOption[];
  initialPaysChoisiId?: number;
  initialModules?: ModuleBackend[];
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = [...countryCode.toUpperCase()].map(
    (c) => 127397 + c.charCodeAt(0),
  );
  return String.fromCodePoint(...codePoints);
}

export default function PricingSection({
  initialPays = [],
  initialPaysChoisiId,
  initialModules = [],
}: PricingSectionProps) {
  const initialPaysChoisi =
    initialPays.find((p) => p.id === initialPaysChoisiId) ??
    initialPays[0] ??
    null;
  const hasInitialPays = initialPays.length > 0;
  const firstModulesLoad = useRef(true);

  const [pays, setPays] = useState<PaysOption[]>(initialPays);
  const [paysChoisi, setPaysChoisi] = useState<PaysOption | null>(
    initialPaysChoisi,
  );
  const [loadingPays, setLoadingPays] = useState(!hasInitialPays);
  const [errorPays, setErrorPays] = useState("");

  const [modules, setModules] = useState<ModuleBackend[]>(initialModules);
  const [loadingModules, setLoadingModules] = useState(false);
  const [errorModules, setErrorModules] = useState("");

  const [planSelectionne, setPlanSelectionne] = useState<ModuleBackend | null>(
    null,
  );

  // Charger les pays au montage + auto-select premier
  useEffect(() => {
    if (hasInitialPays) return;

    getPaysDisponibles()
      .then((d) => {
        if (d.success && d.data.length > 0) {
          setPays(d.data);
          setPaysChoisi(d.data[0]);
        } else {
          setErrorPays("Impossible de charger les pays.");
        }
      })
      .catch(() => setErrorPays("Erreur réseau."))
      .finally(() => setLoadingPays(false));
  }, []);

  // Charger les modules quand le pays change
  useEffect(() => {
    if (!paysChoisi) return;

    if (
      firstModulesLoad.current &&
      hasInitialPays &&
      paysChoisi.id === initialPaysChoisi?.id
    ) {
      firstModulesLoad.current = false;
      return;
    }

    firstModulesLoad.current = false;
    setLoadingModules(true);
    setErrorModules("");
    getModulesDisponibles(paysChoisi.id)
      .then((d) => {
        if (d.success) setModules(d.data);
        else setErrorModules("Impossible de charger les offres.");
      })
      .catch(() => setErrorModules("Erreur réseau."))
      .finally(() => setLoadingModules(false));
  }, [paysChoisi]);

  return (
    <div className="space-y-6">
      {/* ── Sélecteur de pays ── */}
      <div className="flex flex-col items-center gap-3">
        {loadingPays && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-10 w-32 rounded-full bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {errorPays && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <X size={12} /> {errorPays}
          </p>
        )}

        {!loadingPays && !errorPays && pays.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pays.map((p) => {
              const selected = paysChoisi?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPaysChoisi(p)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                    selected
                      ? "border-primary bg-primary-light text-primary shadow-sm"
                      : "border-border bg-card text-text-secondary hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span className="text-base leading-none">
                    {getFlagEmoji(p.code)}
                  </span>
                  <span>{p.libelle}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Grille des forfaits ── */}
      {loadingModules && (
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-full p-5 md:p-6 rounded-2xl bg-card border-2 border-border ${
                i === 1 ? "md:-mt-4" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 animate-pulse" />
                <div className="w-14 h-12 rounded-md bg-gray-50 animate-pulse" />
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-7 w-32 rounded bg-gray-100 animate-pulse" />
                <div className="h-1 w-12 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-full rounded bg-gray-50 animate-pulse mt-2" />
                <div className="h-4 w-3/4 rounded bg-gray-50 animate-pulse" />
              </div>
              <div className="mb-4 space-y-2">
                <div className="h-10 w-40 rounded bg-gray-100 animate-pulse" />
                <div className="h-3 w-24 rounded bg-gray-50 animate-pulse" />
              </div>
              <div className="h-11 w-full rounded-xl bg-gray-100 animate-pulse mb-4" />
              <div className="space-y-2.5">
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 animate-pulse mt-0.5" />
                    <div
                      className={`h-4 rounded bg-gray-50 animate-pulse ${
                        j % 2 === 0 ? "w-5/6" : "w-4/6"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {errorModules && (
        <p className="flex items-center justify-center gap-1 text-sm font-medium text-red-500 py-8">
          <X size={14} /> {errorModules}
        </p>
      )}

      {!loadingModules &&
        !errorModules &&
        modules.length === 0 &&
        paysChoisi && (
          <p className="text-center text-sm text-muted py-12">
            Aucune offre disponible pour {paysChoisi.libelle} pour le moment.
          </p>
        )}

      {!loadingModules && modules.length > 0 && (
        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {modules.map((mod, idx) => {
            const popular = idx === 1;
            // Même rythme de couleurs pleines que les cartes de la home
            // (Features.astro) : vert / or / vert foncé, en boucle.
            const tone = TONES[idx % TONES.length];
            return (
              <div key={mod.id} className="h-full">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6 shadow-[0_20px_50px_-40px_rgba(7,31,20,0.5)] transition-transform duration-300 hover:-translate-y-1.5 md:p-7 ${tone.card}`}
                >
                  {popular && (
                    <div
                      className={`absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${tone.badge}`}
                    >
                      <Star size={11} fill="currentColor" /> Recommandé
                    </div>
                  )}

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${tone.badge}`}
                  >
                    {planIcon(idx)}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-serif text-2xl font-bold">
                      {mod.code}
                    </h3>
                    <p
                      className={`mt-2 min-h-10 text-sm leading-6 ${tone.body}`}
                    >
                      {mod.description}
                    </p>
                  </div>

                  <div className={`mt-6 border-y py-5 ${tone.divider}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-bold tabular-nums md:text-5xl">
                        {parseInt(mod.montant).toLocaleString("fr-FR")}
                      </span>
                      <span className="text-sm font-semibold">FCFA</span>
                    </div>
                    <p className={`mt-1 text-sm ${tone.body}`}>
                      pour {mod.duree} mois
                    </p>
                  </div>

                  {mod.lignes.length > 0 && (
                    <ul className="mt-5 flex-grow space-y-3">
                      {mod.lignes.map((l, li) => (
                        <li
                          key={li}
                          className={`flex items-start gap-3 text-sm leading-5 ${tone.body}`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone.badge}`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          <span>
                            {l.libelle}
                            {l.quantite ? ` (${l.quantite})` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={() => setPlanSelectionne(mod)}
                    className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${tone.button}`}
                  >
                    <span>Choisir ce forfait</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modale de checkout ── */}
      {planSelectionne && paysChoisi && (
        <AbonnementModal
          plan={planSelectionne}
          pays={paysChoisi}
          onClose={() => setPlanSelectionne(null)}
        />
      )}
    </div>
  );
}
