import { useEffect, useRef, useState } from "react";
import { Check, Star, Package, Rocket, Gem, ArrowRight, X } from "lucide-react";

import {
  getPaysDisponibles,
  getModulesDisponibles,
  type ModuleBackend,
  type PaysOption,
} from "../../lib/services/abonnementService";

import AbonnementModal from "./AbonnementModal";
import { StitchDivider } from "@/components/ui/stitch-divider";

function planIcon(idx: number) {
  const className = "w-6 h-6";
  if (idx === 1) return <Rocket className={className} strokeWidth={1.75} />;
  if (idx >= 2) return <Gem className={className} strokeWidth={1.75} />;
  return <Package className={className} strokeWidth={1.75} />;
}

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
                      ? "border-ateliya-primary bg-ateliya-primary/10 text-ateliya-primary shadow-sm shadow-ateliya-primary/15"
                      : "border-gray-100 bg-white text-gray-600 hover:border-ateliya-primary/40 hover:text-ateliya-primary"
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
              className={`h-full p-5 md:p-6 rounded-2xl bg-white border-2 border-gray-100 ${
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
          <p className="text-center text-sm text-gray-400 py-12">
            Aucune offre disponible pour {paysChoisi.libelle} pour le moment.
          </p>
        )}

      {!loadingModules && modules.length > 0 && (
        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {modules.map((mod, idx) => {
            const popular = idx === 1;
            return (
              <div key={mod.id} className="h-full">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-card p-6 transition-shadow hover:shadow-[0_20px_50px_-36px_rgba(7,31,20,0.45)] md:p-7 ${popular ? "border-primary/55" : "border-border"}`}
                >
                  {popular && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                      <Star size={11} fill="currentColor" /> Recommandé
                    </div>
                  )}

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                    {planIcon(idx)}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-serif text-2xl font-semibold text-text">
                      {mod.code}
                    </h3>
                    <p className="mt-2 min-h-10 text-sm leading-6 text-text-secondary">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-6 border-y border-border py-5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-semibold tabular-nums text-text md:text-5xl">
                        {parseInt(mod.montant).toLocaleString("fr-FR")}
                      </span>
                      <span className="text-sm font-semibold text-text-secondary">
                        FCFA
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">
                      pour {mod.duree} mois
                    </p>
                  </div>

                  {mod.lignes.length > 0 && (
                    <ul className="mt-5 flex-grow space-y-3">
                      {mod.lignes.map((l, li) => (
                        <li
                          key={li}
                          className="flex items-start gap-3 text-sm leading-5 text-text-secondary"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
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

                  <StitchDivider className="mt-7" lineClassName="" />

                  <button
                    onClick={() => setPlanSelectionne(mod)}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
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
