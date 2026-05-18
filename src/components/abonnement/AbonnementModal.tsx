import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
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
  Calendar,
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

type Etape = "email" | "periodicite" | "paiement" | "confirmation";
type MethodePaiement = "wave" | "orange_money" | "mtn" | "moov";
type Periodicite = "mensuel" | "trimestriel" | "annuel";

const ETAPES: { key: Etape; label: string }[] = [
  { key: "email", label: "Identifiant" },
  { key: "periodicite", label: "Durée" },
  { key: "paiement", label: "Paiement" },
  { key: "confirmation", label: "Confirmation" },
];

const METHODES_PAIEMENT: {
  id: MethodePaiement;
  label: string;
  description: string;
  logo: string;
  color: string;
}[] = [
  { id: "wave", label: "Wave", description: "Paiement mobile rapide", logo: "/wave_logo.webp", color: "#1AABF5" },
  { id: "orange_money", label: "Orange Money", description: "Orange Money", logo: "/Orange_logo.png", color: "#FF7A00" },
  { id: "mtn", label: "MTN MoMo", description: "MTN Mobile Money", logo: "/MTN_Logo.png", color: "#FFC726" },
  { id: "moov", label: "Moov Money", description: "Moov Money / Flooz", logo: "/moov_logo.png", color: "#0055BB" },
];

function computePrice(base: number, key: Periodicite): number {
  if (key === "trimestriel") return Math.round(base * 3 * 0.9);
  if (key === "annuel") return Math.round(base * 12 * 0.8);
  return base;
}

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
  const [periodicite, setPeriodicite] = useState<Periodicite>("mensuel");
  const [methode, setMethode] = useState<MethodePaiement | null>(null);
  const [nomPayeur, setNomPayeur] = useState("");
  const [telephonePayeur, setTelephonePayeur] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const montantBase = parseInt(plan.montant);
  const montant = computePrice(montantBase, periodicite);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Format d'email invalide.");
    setLoading(true);
    setError("");
    const result = await verifierAdminParEmail(email);
    setLoading(false);
    if (!result.success) return setError(result.message ?? "Aucun compte trouvé avec cet email.");
    setAdmin(result);
    next();
  };

  const handlePay = async () => {
    if (!methode) return setError("Veuillez choisir une méthode de paiement.");
    if (!telephonePayeur) return setError("Le numéro de téléphone est requis.");
    setLoading(true);
    setError("");
    try {
      const session = await initierPaiementAbonnement({
        adminEmail: email,
        adminId: admin!.adminId!,
        moduleId: plan.id,
        methodePaiement: methode,
        periodicite,
        montant,
        nomPayeur,
        telephonePayeur,
      });
      setSessionId(session.sessionId);
      setRedirectUrl(sanitizeRedirectUrl(session.redirectUrl));
      next();
    } catch (e: any) {
      setError(e.message ?? "Erreur lors du paiement. Réessayez.");
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
        data.status === "success" ? "success" : data.status === "failed" ? "failed" : "pending"
      );
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-[fadeIn_.2s_ease-out_both]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-gray-100 animate-[scaleIn_.25s_cubic-bezier(.34,1.2,.64,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-ateliya-primary to-transparent" />

        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-gray-700 hover:border-gray-200 flex items-center justify-center transition-all"
        >
          <X size={16} />
        </button>

        <div className="p-6 md:p-8">
          {/* Plan résumé */}
          <div className="mb-6 pb-5 border-b border-gray-100">
            <div className="text-[10px] font-black uppercase tracking-wider text-ateliya-primary mb-1">
              Forfait choisi
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-extrabold tracking-tighter text-gray-900">
                  {plan.code}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {pays.libelle} · {plan.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold tabular-nums text-ateliya-primary">
                  {formaterMontant(montant)}
                </div>
                <div className="text-[11px] text-gray-400 capitalize">{periodicite}</div>
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
                  <div key={e.key} className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                        done
                          ? "bg-ateliya-primary/15 border-2 border-ateliya-primary text-ateliya-primary"
                          : active
                          ? "bg-ateliya-primary border-2 border-ateliya-primary text-white shadow-sm shadow-ateliya-primary/30"
                          : "bg-gray-50 border-2 border-gray-200 text-gray-300"
                      }`}
                    >
                      {done ? <Check size={11} strokeWidth={3} /> : <span>{i + 1}</span>}
                    </div>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider text-center ${
                        active
                          ? "text-ateliya-primary"
                          : done
                          ? "text-ateliya-primary/60"
                          : "text-gray-300"
                      }`}
                    >
                      {e.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ateliya-primary to-ateliya-secondary transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* ── Étape EMAIL ── */}
          {etape === "email" && (
            <div className="flex flex-col gap-5 animate-[slideUp_.35s_ease-out_both]">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ateliya-primary/20 to-ateliya-primary/5 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-ateliya-primary" strokeWidth={1.75} />
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-gray-900">
                  Identifiez votre compte
                </h2>
                <p className="text-sm text-gray-500 max-w-md">
                  Saisissez l'email de l'administrateur de votre espace Ateliya.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Email de l'administrateur
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-4 h-4 text-gray-300 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyEmail()}
                    placeholder="admin@votreatelier.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-gray-900 placeholder:text-gray-300 border-2 transition-all focus:outline-none focus:border-ateliya-primary ${
                      error ? "border-red-300" : "border-gray-100"
                    }`}
                  />
                </div>
                {error && (
                  <p className="flex items-center gap-1 text-xs font-medium text-red-500">
                    <X size={12} /> {error}
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyEmail}
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
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

          {/* ── Étape PÉRIODICITÉ ── */}
          {etape === "periodicite" && (
            <div className="flex flex-col gap-5 animate-[slideUp_.35s_ease-out_both]">
              {admin && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-ateliya-primary/5 border border-ateliya-primary/15">
                  <div className="w-9 h-9 rounded-full bg-ateliya-primary flex items-center justify-center text-white font-black text-sm">
                    {(admin.prenom?.[0] ?? admin.email?.[0] ?? "A").toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 truncate">
                      Bonjour, {admin.prenom ?? admin.nom ?? "Administrateur"} 👋
                    </p>
                    {admin.societe && (
                      <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 truncate">
                        <Building2 size={11} />
                        {admin.societe}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-africa-gold/20 to-africa-gold/5 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-africa-gold" strokeWidth={1.75} />
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-gray-900">
                  Choisissez la durée
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(
                  [
                    { key: "mensuel" as const, label: "Mensuel" },
                    { key: "trimestriel" as const, label: "Trimestriel", economie: "-10%" },
                    { key: "annuel" as const, label: "Annuel", economie: "-20%" },
                  ]
                ).map(({ key, label, economie }) => {
                  const m = computePrice(montantBase, key);
                  const selected = periodicite === key;
                  const monthly =
                    key === "trimestriel"
                      ? Math.round(m / 3)
                      : key === "annuel"
                      ? Math.round(m / 12)
                      : m;
                  return (
                    <button
                      key={key}
                      onClick={() => setPeriodicite(key)}
                      className={`relative p-4 rounded-2xl border-2 bg-white text-left transition-all hover:-translate-y-px ${
                        selected
                          ? "border-ateliya-primary shadow-sm shadow-ateliya-primary/15 bg-ateliya-primary/5"
                          : "border-gray-100 hover:border-ateliya-primary/40"
                      }`}
                    >
                      {economie && (
                        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-africa-gold to-ateliya-secondary text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                          {economie}
                        </div>
                      )}
                      <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">
                        {label}
                      </div>
                      <div className="text-xl font-extrabold text-gray-900 tabular-nums">
                        {formaterMontant(m)}
                      </div>
                      {key !== "mensuel" && (
                        <div className="text-[11px] text-gray-400 mt-1">
                          soit {formaterMontant(monthly)}/mois
                        </div>
                      )}
                      {selected && (
                        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-ateliya-primary flex items-center justify-center">
                          <Check size={11} strokeWidth={3} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-ateliya-primary hover:bg-ateliya-primary/5 transition-colors"
                >
                  <ArrowLeft size={15} /> Retour
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all"
                >
                  Continuer <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* ── Étape PAIEMENT ── */}
          {etape === "paiement" && (
            <div className="flex flex-col gap-5 animate-[slideUp_.35s_ease-out_both]">
              <h2 className="text-lg font-serif font-extrabold tracking-tighter text-gray-900">
                Informations de paiement
              </h2>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Votre nom (optionnel)
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 w-4 h-4 text-gray-300 pointer-events-none" />
                    <input
                      type="text"
                      value={nomPayeur}
                      onChange={(e) => setNomPayeur(e.target.value)}
                      placeholder="Nom complet"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-gray-900 placeholder:text-gray-300 border-2 border-gray-100 transition-all focus:outline-none focus:border-ateliya-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Téléphone *
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 w-4 h-4 text-gray-300 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={telephonePayeur}
                      onChange={(e) => setTelephonePayeur(e.target.value)}
                      placeholder={`${pays.indicatif} 07 XX XX XX XX`}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-sm text-gray-900 placeholder:text-gray-300 border-2 border-gray-100 transition-all focus:outline-none focus:border-ateliya-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">
                  Méthode de paiement
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {METHODES_PAIEMENT.map((m) => {
                    const selected = methode === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMethode(m.id);
                          setError("");
                        }}
                        className={`relative p-3 rounded-xl border-2 bg-white text-left transition-all hover:-translate-y-px flex items-center gap-3 ${
                          selected ? "shadow-md" : "border-gray-100 hover:border-gray-200"
                        }`}
                        style={
                          selected
                            ? { borderColor: m.color, background: `${m.color}0D` }
                            : undefined
                        }
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img
                            src={m.logo}
                            alt={m.label}
                            className="w-8 h-8 object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-bold text-sm"
                            style={{ color: selected ? m.color : "#111827" }}
                          >
                            {m.label}
                          </div>
                          <div className="text-[11px] text-gray-400 leading-tight truncate">
                            {m.description}
                          </div>
                        </div>
                        {selected && (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: m.color }}
                          >
                            <Check size={11} strokeWidth={3} className="text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className="flex items-center gap-1 text-xs font-medium text-red-500">
                  <X size={12} /> {error}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:text-ateliya-primary hover:bg-ateliya-primary/5 transition-colors"
                >
                  <ArrowLeft size={15} /> Retour
                </button>
                <button
                  onClick={handlePay}
                  disabled={loading || !methode}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                  paymentStatus === "success"
                    ? "bg-ateliya-primary/10 text-ateliya-primary"
                    : paymentStatus === "failed"
                    ? "bg-red-50 text-red-500"
                    : "bg-africa-gold/10 text-africa-gold"
                }`}
              >
                {paymentStatus === "success" ? (
                  <CheckCircle2 className="w-9 h-9" strokeWidth={1.75} />
                ) : paymentStatus === "failed" ? (
                  <X className="w-9 h-9" strokeWidth={1.75} />
                ) : (
                  <Loader2 className="w-9 h-9 animate-spin" strokeWidth={1.75} />
                )}
              </div>

              {paymentStatus === "pending" && (
                <>
                  <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-gray-900">
                    Paiement en attente
                  </h2>
                  <p className="text-sm text-gray-500 max-w-md">
                    Complétez le paiement via{" "}
                    <strong className="text-ateliya-primary">
                      {METHODES_PAIEMENT.find((m) => m.id === methode)?.label}
                    </strong>
                    .
                  </p>

                  {redirectUrl && (
                    <div className="w-full h-[380px] rounded-2xl overflow-hidden bg-white border-2 border-gray-100">
                      <iframe
                        src={redirectUrl}
                        className="w-full h-full border-0"
                        title="Portail de paiement"
                        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="w-full flex flex-col gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Référence</span>
                      <code className="text-xs text-gray-700 font-mono truncate max-w-[60%]">
                        {sessionId?.slice(0, 24)}…
                      </code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Montant</span>
                      <strong className="text-gray-900">{formaterMontant(montant)}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {redirectUrl && (
                      <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-white border-2 border-gray-100 hover:border-ateliya-primary/40 hover:text-ateliya-primary transition-colors"
                      >
                        Ouvrir dans un nouvel onglet
                      </a>
                    )}
                    <button
                      onClick={checkStatus}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all disabled:opacity-60"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw size={14} />}
                      Vérifier le statut
                    </button>
                  </div>
                </>
              )}

              {paymentStatus === "success" && (
                <>
                  <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-ateliya-primary">
                    Abonnement activé !
                  </h2>
                  <p className="text-sm text-gray-500 max-w-md">
                    Félicitations ! Votre abonnement{" "}
                    <strong className="text-gray-900">{plan.code}</strong> est maintenant actif.
                  </p>
                  <a
                    href="/connexion"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all"
                  >
                    <Zap size={15} /> Accéder à mon espace
                  </a>
                </>
              )}

              {paymentStatus === "failed" && (
                <>
                  <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-tighter text-red-500">
                    Paiement échoué
                  </h2>
                  <p className="text-sm text-gray-500 max-w-md">
                    Le paiement n'a pas pu être traité. Veuillez réessayer ou choisir une autre
                    méthode.
                  </p>
                  <button
                    onClick={() => {
                      setPaymentStatus("pending");
                      setEtape("paiement");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-ateliya-primary text-white shadow-[0_8px_18px_rgba(47,175,164,0.14)] hover:bg-[#279f95] hover:shadow-[0_8px_18px_rgba(47,175,164,0.12)] active:scale-[0.98] transition-all"
                  >
                    <RefreshCw size={15} /> Réessayer
                  </button>
                </>
              )}

              <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 w-full">
                Besoin d'aide ? Contactez{" "}
                <a
                  href="mailto:support@ateliya.com"
                  className="text-ateliya-primary font-bold hover:underline"
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

