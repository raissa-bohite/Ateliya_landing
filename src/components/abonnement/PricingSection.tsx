import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  Star,
  Package,
  Rocket,
  Gem,
  ArrowRight,
  X,
} from "lucide-react";

import {
  formaterMontant,
  getPaysDisponibles,
  getModulesDisponibles,
  type ModuleBackend,
  type PaysOption,
} from "../../lib/services/abonnementService";

import AbonnementModal from "./AbonnementModal";

const PLAN_ICONS = [
  <Package className="w-6 h-6" strokeWidth={1.75} />,
  <Rocket className="w-6 h-6" strokeWidth={1.75} />,
  <Gem className="w-6 h-6" strokeWidth={1.75} />,
];

const PLAN_NUMBERS = ["01", "02", "03"];

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
  const paysPourModal =
    paysChoisi ?? planSelectionne?.pays ?? initialPaysChoisi ?? pays[0] ?? null;

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
                  type="button"
                  key={p.id}
                  onClick={() => setPaysChoisi(p)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out ${
                    selected
                      ? "border-ateliya-primary/35 bg-ateliya-primary/[0.08] text-ateliya-primary shadow-[0_6px_16px_rgba(18,63,59,0.035)]"
                      : "border-ateliya-border/[0.55] bg-white/[0.96] text-gray-600 hover:border-ateliya-primary/40 hover:text-ateliya-primary"
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
              className={`h-full p-5 md:p-6 rounded-2xl bg-white/[0.96] border border-ateliya-border/[0.55] ${
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
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {modules.map((mod, idx) => {
            const popular = idx === 1;
            return (
              <div
                key={mod.id}
                className={`group/plan h-full ${popular ? "md:-mt-4" : ""}`}
              >
                <div className="h-full relative">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-br ${
                      idx === 0
                        ? "from-ateliya-primary/[0.08] to-teal-400/[0.05]"
                        : idx === 1
                          ? "from-ateliya-secondary/[0.08] to-amber-400/[0.05]"
                          : "from-africa-gold/[0.08] to-ateliya-primary/[0.05]"
                    } rounded-2xl blur-lg opacity-0 group-hover/plan:opacity-50 transition-[transform,opacity,background-color,border-color,box-shadow] duration-500 ease-out -z-10`}
                  />

                  <div
                    className={`h-full p-5 md:p-6 rounded-2xl bg-white/[0.96] border transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ease-out hover:shadow-[0_14px_34px_rgba(18,63,59,0.07)] hover:-translate-y-px relative overflow-hidden ${
                      popular
                        ? "border-ateliya-primary/30"
                        : "border-ateliya-border/[0.55] group-hover/plan:border-ateliya-primary/30"
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ateliya-primary to-transparent opacity-0 group-hover/plan:opacity-100 transition-opacity duration-500" />

                    {popular && (
                      <div className="absolute -top-px left-0 right-0 flex justify-center">
                        <div className="px-5 py-1.5 rounded-b-xl bg-ateliya-primary text-white text-[11px] font-black tracking-wide uppercase shadow-[0_6px_16px_rgba(47,175,164,0.12)] flex items-center gap-1">
                          <Star size={10} fill="currentColor" /> Le plus
                          populaire
                        </div>
                      </div>
                    )}

                    <div
                      className={`relative z-10 flex flex-col h-full ${popular ? "pt-5" : ""}`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`relative flex items-center justify-center w-12 h-12 rounded-2xl group-hover/plan:-translate-y-px transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ease-out shadow-[0_6px_16px_rgba(18,63,59,0.035)] ${
                            idx === 0
                              ? "bg-ateliya-primary/10 text-ateliya-primary"
                              : idx === 1
                                ? "bg-gradient-to-br from-ateliya-secondary/[0.16] to-ateliya-secondary/[0.08] text-ateliya-secondary"
                                : "bg-gradient-to-br from-ateliya-primary/[0.12] to-ateliya-primary/[0.08] text-ateliya-primary"
                          }`}
                        >
                          {PLAN_ICONS[idx] ?? PLAN_ICONS[0]}
                        </div>
                        <div className="text-5xl md:text-6xl font-black text-ateliya-primary/10 leading-none select-none">
                          {PLAN_NUMBERS[idx] ?? "0" + (idx + 1)}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-1 mb-4">
                        <h3 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-gray-900 leading-tight">
                          {mod.code}
                        </h3>
                        <div
                          className={`w-12 h-1 bg-gradient-to-r ${
                            idx === 0
                              ? "from-ateliya-primary to-teal-400"
                              : idx === 1
                                ? "from-ateliya-secondary to-amber-400"
                                : "from-ateliya-secondary to-ateliya-primary"
                          } rounded-full group-hover/plan:w-20 transition-[transform,opacity,background-color,border-color,box-shadow] duration-300 ease-out`}
                        />
                        <p className="text-sm text-gray-500 pt-0.5">
                          {mod.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tabular-nums">
                            {parseInt(mod.montant).toLocaleString("fr-FR")}
                          </span>
                          <span className="text-base text-gray-400 font-bold">
                            FCFA
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-0.5">
                          pour {mod.duree} jours
                        </p>
                      </div>

                      {/* Features */}
                      {mod.lignes.length > 0 && (
                        <div className="space-y-2.5 flex-grow">
                          {mod.lignes.map((l, li) => (
                            <div key={li} className="flex items-start gap-2.5">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-ateliya-primary/10 flex items-center justify-center mt-0.5">
                                <Check
                                  size={11}
                                  className="text-ateliya-primary"
                                  strokeWidth={3}
                                />
                              </div>
                              <span className="text-sm text-gray-600 leading-snug">
                                {l.libelle}
                                {l.quantite ? ` (${l.quantite})` : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-5 mt-5 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setPlanSelectionne(mod)}
                          className={`group/btn w-full py-3 rounded-xl font-bold text-sm transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out active:scale-[0.97] inline-flex items-center justify-center gap-2 ${
                            popular
                              ? "bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)]"
                              : "bg-gray-50 text-gray-800 border border-gray-200 hover:bg-ateliya-primary/5 hover:border-ateliya-primary/30 hover:text-ateliya-primary"
                          }`}
                        >
                          <span>Choisir ce forfait</span>
                          <ArrowRight
                            size={14}
                            className="group-hover/btn:translate-x-0.5 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modale de checkout ── */}
      {planSelectionne && paysPourModal && (
        <AbonnementModal
          plan={planSelectionne}
          pays={paysPourModal}
          onClose={() => setPlanSelectionne(null)}
        />
      )}
    </div>
  );
}

