import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
  CreditCard,
  Zap,
  Shield,
  X,
  RefreshCw,
  Building2,
} from "lucide-react";

import {
  formaterMontant,
  verifierAdminParEmail,
  initierPaiementAbonnement,
  verifierStatutPaiement,
  type VerifyAdminResponse,
  type ModuleBackend,
  type PaysOption,
} from "../../lib/services/abonnementService";

type Etape = "email" | "paiement" | "confirmation";
type MethodePaiement = "wave" | "orange_money" | "mtn" | "moov";
type Periodicite = "mensuel" | "trimestriel" | "annuel";

const ETAPES: { key: Etape; label: string }[] = [
  { key: "email", label: "Identifiant" },
  { key: "paiement", label: "Paiement" },
  { key: "confirmation", label: "Confirmation" },
];

// Chaque forfait de l'API encode déjà sa période via `duree` (en mois).
// On n'applique donc aucun recalcul : on paie le montant tel quel.
// Le champ `periodicite` de l'API est un enum fixe {mensuel, trimestriel, annuel} ;
// on le dérive de la durée réelle du forfait.
const PERIODES: { mois: number; label: string; api: Periodicite }[] = [
  { mois: 1, label: "Mensuel", api: "mensuel" },
  { mois: 3, label: "Trimestriel", api: "trimestriel" },
  { mois: 12, label: "Annuel", api: "annuel" },
];

function periodePourDuree(duree: string): {
  label: string;
  api: Periodicite;
} {
  const mois = parseInt(duree, 10);
  if (Number.isNaN(mois)) return { label: duree, api: "mensuel" };

  const exact = PERIODES.find((p) => p.mois === mois);
  if (exact) return { label: exact.label, api: exact.api };

  // Durée non standard : on garde un label fidèle (« N mois ») et on choisit
  // le palier canonique le plus proche pour ne jamais envoyer une périodicité
  // franchement incohérente avec le montant plein facturé.
  const proche = PERIODES.reduce((a, b) =>
    Math.abs(b.mois - mois) < Math.abs(a.mois - mois) ? b : a,
  );
  return { label: `${mois} mois`, api: proche.api };
}

const METHODES_PAIEMENT: {
  id: MethodePaiement;
  label: string;
  description: string;
  logo: string;
}[] = [
  {
    id: "wave",
    label: "Wave",
    description: "Paiement mobile rapide",
    logo: "/wave_logo.webp",
  },
  {
    id: "orange_money",
    label: "Orange Money",
    description: "Orange Money",
    logo: "/Orange_logo.png",
  },
  {
    id: "mtn",
    label: "MTN MoMo",
    description: "MTN Mobile Money",
    logo: "/MTN_Logo.png",
  },
  {
    id: "moov",
    label: "Moov Money",
    description: "Moov Money / Flooz",
    logo: "/moov_logo.png",
  },
];

function sanitizeRedirectUrl(raw: unknown): string | null {
  if (typeof raw !== "string" || !raw) return null;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

interface Props {
  plan: ModuleBackend;
  pays: PaysOption;
  onClose: () => void;
}

export default function AbonnementModal({ plan, pays, onClose }: Props) {
  const [etape, setEtape] = useState<Etape>("email");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState<VerifyAdminResponse | null>(null);
  const [methode, setMethode] = useState<MethodePaiement | null>(null);
  const [nomPayeur, setNomPayeur] = useState("");
  const [telephonePayeur, setTelephonePayeur] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Le forfait de l'API porte déjà son prix et sa période : pas de recalcul.
  const montant = parseInt(plan.montant);
  const periode = periodePourDuree(plan.duree);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [onClose]);

  const index = ETAPES.findIndex((e) => e.key === etape);
  const pct = (index / (ETAPES.length - 1)) * 100;

  const next = () => {
    const i = ETAPES.findIndex((e) => e.key === etape);
    if (i < ETAPES.length - 1) setEtape(ETAPES[i + 1].key);
  };
  const back = () => {
    const i = ETAPES.findIndex((e) => e.key === etape);
    if (i > 0) setEtape(ETAPES[i - 1].key);
  };

  // ── Handlers ──
  const handleVerifyEmail = async () => {
    if (!email) return setError("Veuillez saisir un email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Format d'email invalide.");
    setLoading(true);
    setError("");
    const result = await verifierAdminParEmail(email);
    setLoading(false);
    if (!result.success)
      return setError(result.message ?? "Aucun compte trouvé avec cet email.");
    if (result.adminId == null)
      return setError(
        "Compte trouvé mais identifiant manquant. Contactez le support.",
      );
    setAdmin(result);
    next();
  };

  const handlePay = async () => {
    if (!methode) return setError("Veuillez choisir une méthode de paiement.");
    const adminId = admin?.adminId;
    if (adminId == null)
      return setError("Session invalide. Revérifiez votre email.");
    const telephone = telephonePayeur.trim();
    if (!telephone) return setError("Le numéro de téléphone est requis.");
    // Chiffres uniquement (avec + optionnel), 8 à 15 chiffres (norme E.164).
    if (!/^\+?\d{8,15}$/.test(telephone.replace(/[\s.-]/g, "")))
      return setError("Numéro de téléphone invalide.");
    setLoading(true);
    setError("");
    try {
      const session = await initierPaiementAbonnement({
        adminEmail: email,
        adminId,
        moduleId: plan.id,
        methodePaiement: methode,
        periodicite: periode.api,
        montant,
        nomPayeur,
        telephonePayeur: telephone,
      });
      setSessionId(session.sessionId);
      setRedirectUrl(sanitizeRedirectUrl(session.redirectUrl));
      next();
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Erreur lors du paiement. Réessayez.",
      );
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const data = await verifierStatutPaiement(sessionId);
      setPaymentStatus(
        data.status === "success"
          ? "success"
          : data.status === "failed"
            ? "failed"
            : "pending",
      );
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary-dark/55 backdrop-blur-sm animate-[fadeIn_.2s_ease-out_both]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[1.75rem] bg-card shadow-[0_28px_90px_-30px_rgba(7,31,20,0.55)] border border-border animate-[scaleIn_.25s_cubic-bezier(.34,1.2,.64,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[3px] rounded-full bg-primary" />

        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-text-secondary transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          <X size={16} />
        </button>

        <div className="p-6 md:p-8">
          {/* Plan résumé */}
          <div className="mb-6 pb-5 border-b border-border">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary mb-1">
              Forfait choisi
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-semibold tracking-tight text-text">
                  {plan.code}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  {pays.libelle} · {plan.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-serif font-semibold tabular-nums text-primary">
                  {formaterMontant(montant)}
                </div>
                <div className="text-[11px] text-text-secondary">
                  {periode.label}
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-3">
              {ETAPES.map((e, i) => {
                const done = i < index;
                const active = i === index;
                return (
                  <div
                    key={e.key}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                        done
                          ? "bg-primary-light border-2 border-primary text-primary"
                          : active
                            ? "bg-primary border-2 border-primary text-white shadow-sm"
                            : "bg-background border-2 border-border text-muted"
                      }`}
                    >
                      {done ? (
                        <Check size={11} strokeWidth={3} />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide text-center ${
                        active
                          ? "text-primary"
                          : done
                            ? "text-primary/60"
                            : "text-muted"
                      }`}
                    >
                      {e.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-1 rounded-full bg-primary-light overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* ── Étape EMAIL ── */}
          {etape === "email" && (
            <div className="flex flex-col gap-5 animate-[slideUp_.35s_ease-out_both]">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Mail className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-text">
                  Identifiez votre compte
                </h2>
                <p className="max-w-md text-sm leading-6 text-text-secondary">
                  Saisissez l&apos;email de l&apos;administrateur de votre
                  espace Ateliya.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="admin-email"
                  className="text-xs font-semibold text-text-secondary"
                >
                  Email de l&apos;administrateur
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-4 w-4 text-muted pointer-events-none" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyEmail()}
                    placeholder="admin@votreatelier.com"
                    className={`w-full rounded-xl border bg-background py-3 pl-11 pr-4 text-sm text-text placeholder:text-muted transition-colors focus:outline-none focus:ring-2 ${
                      error
                        ? "border-danger focus:border-danger focus:ring-danger/15"
                        : "border-border focus:border-primary focus:ring-primary/15"
                    }`}
                  />
                </div>
                {error && (
                  <p
                    role="alert"
                    className="flex items-center gap-1 text-xs font-medium text-danger"
                  >
                    <X size={12} /> {error}
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyEmail}
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Shield size={15} /> Vérifier et continuer
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Étape PAIEMENT ── */}
          {etape === "paiement" && (
            <div className="flex flex-col gap-5 animate-[slideUp_.35s_ease-out_both]">
              {admin && (
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {(
                      admin.prenom?.[0] ??
                      admin.email?.[0] ??
                      "A"
                    ).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-text">
                      Bonjour, {admin.prenom ?? admin.nom ?? "Administrateur"}{" "}
                      👋
                    </p>
                    {admin.societe && (
                      <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-text-secondary">
                        <Building2 size={11} />
                        {admin.societe}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-text">
                  Informations de paiement
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Indiquez vos coordonnées et choisissez votre moyen de
                  paiement.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="payer-name"
                    className="text-xs font-semibold text-text-secondary"
                  >
                    Votre nom (optionnel)
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 w-4 h-4 text-muted pointer-events-none" />
                    <input
                      id="payer-name"
                      type="text"
                      value={nomPayeur}
                      onChange={(e) => setNomPayeur(e.target.value)}
                      placeholder="Nom complet"
                      className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-text placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="payer-phone"
                    className="text-xs font-semibold text-text-secondary"
                  >
                    Téléphone *
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 w-4 h-4 text-muted pointer-events-none" />
                    <input
                      id="payer-phone"
                      type="tel"
                      required
                      value={telephonePayeur}
                      onChange={(e) => setTelephonePayeur(e.target.value)}
                      placeholder={`${pays.indicatif} 07 XX XX XX XX`}
                      className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-text placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold text-text-secondary">
                  Méthode de paiement
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {METHODES_PAIEMENT.map((m) => {
                    const selected = methode === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMethode(m.id);
                          setError("");
                        }}
                        aria-pressed={selected}
                        className={`relative flex items-center gap-3 rounded-xl border bg-card p-3.5 text-left transition-all hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
                          selected
                            ? "border-primary bg-primary-light/60 shadow-sm"
                            : "border-border"
                        }`}
                      >
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/70 bg-white">
                          <img
                            src={m.logo}
                            alt={m.label}
                            className="h-8 w-8 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-semibold ${selected ? "text-primary" : "text-text"}`}
                          >
                            {m.label}
                          </div>
                          <div className="truncate text-xs leading-tight text-text-secondary">
                            {m.description}
                          </div>
                        </div>
                        {selected && (
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                            <Check
                              size={11}
                              strokeWidth={3}
                              className="text-white"
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-center gap-1 text-xs font-medium text-danger"
                >
                  <X size={12} /> {error}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-primary-light hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  <ArrowLeft size={15} /> Retour
                </button>
                <button
                  onClick={handlePay}
                  disabled={loading || !methode}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} /> Payer {formaterMontant(montant)}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Étape CONFIRMATION ── */}
          {etape === "confirmation" && (
            <div className="flex flex-col items-center text-center gap-5 animate-[slideUp_.35s_ease-out_both]">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  paymentStatus === "success"
                    ? "bg-primary-light text-primary"
                    : paymentStatus === "failed"
                      ? "bg-danger/10 text-danger"
                      : "bg-gold-bg text-gold"
                }`}
              >
                {paymentStatus === "success" ? (
                  <CheckCircle2 className="w-9 h-9" strokeWidth={1.75} />
                ) : paymentStatus === "failed" ? (
                  <X className="w-9 h-9" strokeWidth={1.75} />
                ) : (
                  <Loader2
                    className="w-9 h-9 animate-spin"
                    strokeWidth={1.75}
                  />
                )}
              </div>

              {paymentStatus === "pending" && (
                <>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-text">
                    Paiement en attente
                  </h2>
                  <p className="max-w-md text-sm leading-6 text-text-secondary">
                    Complétez le paiement via{" "}
                    <strong className="font-semibold text-primary">
                      {METHODES_PAIEMENT.find((m) => m.id === methode)?.label}
                    </strong>
                    .
                  </p>

                  {redirectUrl && (
                    <div className="h-[380px] w-full overflow-hidden rounded-2xl border border-border bg-card">
                      <iframe
                        src={redirectUrl}
                        className="w-full h-full border-0"
                        title="Portail de paiement"
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="flex w-full flex-col gap-2 rounded-xl border border-border bg-background p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Référence</span>
                      <code className="max-w-[60%] truncate font-mono text-xs text-text">
                        {sessionId?.slice(0, 24)}…
                      </code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Montant</span>
                      <strong className="font-semibold text-text">
                        {formaterMontant(montant)}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {redirectUrl && (
                      <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        Ouvrir dans un nouvel onglet
                      </a>
                    )}
                    <button
                      onClick={checkStatus}
                      disabled={loading}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw size={14} />
                      )}
                      Vérifier le statut
                    </button>
                  </div>
                </>
              )}

              {paymentStatus === "success" && (
                <>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-primary">
                    Abonnement activé !
                  </h2>
                  <p className="max-w-md text-sm leading-6 text-text-secondary">
                    Félicitations ! Votre abonnement{" "}
                    <strong className="font-semibold text-text">
                      {plan.code}
                    </strong>{" "}
                    est maintenant actif.
                  </p>
                  <a
                    href="https://malliya.ateliya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
                  >
                    <Zap size={15} /> Accéder à mon espace
                  </a>
                </>
              )}

              {paymentStatus === "failed" && (
                <>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight text-danger">
                    Paiement échoué
                  </h2>
                  <p className="max-w-md text-sm leading-6 text-text-secondary">
                    Le paiement n&apos;a pas pu être traité. Veuillez réessayer
                    ou choisir une autre méthode.
                  </p>
                  <button
                    onClick={() => {
                      setPaymentStatus("pending");
                      setEtape("paiement");
                    }}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
                  >
                    <RefreshCw size={15} /> Réessayer
                  </button>
                </>
              )}

              <div className="w-full border-t border-border pt-3 text-xs text-text-secondary">
                Besoin d&apos;aide ? Contactez{" "}
                <a
                  href="mailto:support@ateliya.com"
                  className="font-semibold text-primary hover:underline"
                >
                  support@ateliya.com
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
