"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  creerCompte,
  getPaysActifs,
  type PaysActif,
} from "@/lib/services/inscriptionService";

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_RE = /^\+?[\d\s\-().]{5,20}$/;

const ETAPES = ["Entreprise", "Administrateur", "Confirmation"] as const;

interface Fields {
  denominationEntreprise: string;
  pays: string; // id sous forme de chaîne (valeur du <select>)
  emailEntreprise: string;
  numeroEntreprise: string;
  codeParrain: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMPTY: Fields = {
  denominationEntreprise: "",
  pays: "",
  emailEntreprise: "",
  numeroEntreprise: "",
  codeParrain: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const STRENGTH = [
  { label: "Très faible", color: "#b42318", width: "20%" },
  { label: "Faible", color: "#e8960a", width: "40%" },
  { label: "Moyen", color: "#f5a820", width: "60%" },
  { label: "Fort", color: "#0f7a52", width: "80%" },
  { label: "Très fort", color: "#0c5e3f", width: "100%" },
];

function passwordScore(v: string): number {
  let s = 0;
  if (v.length >= 8) s++;
  if (v.length >= 12) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return Math.min(s, 5);
}

export function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [paysList, setPaysList] = useState<PaysActif[]>([]);
  const [loadingPays, setLoadingPays] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    let active = true;
    getPaysActifs()
      .then((res) => {
        if (!active) return;
        setPaysList(res.data);
      })
      .finally(() => active && setLoadingPays(false));
    return () => {
      active = false;
    };
  }, []);

  const paysChoisi = paysList.find((p) => String(p.id) === fields.pays) ?? null;
  const prefix = paysChoisi?.indicatif ?? "+--";

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setError("");
  };

  function validateStep1(): string | null {
    const denom = fields.denominationEntreprise.trim();
    const emailEnt = fields.emailEntreprise.trim();
    const tel = fields.numeroEntreprise.trim();
    if (!denom) return "Le nom de l'entreprise est obligatoire.";
    if (!emailEnt || !EMAIL_RE.test(emailEnt))
      return "L'email de l'entreprise n'est pas valide.";
    if (!tel || !PHONE_RE.test(tel))
      return "Le numéro de téléphone n'est pas valide.";
    if (!fields.pays || Number.isNaN(Number(fields.pays)))
      return "Veuillez sélectionner un pays.";
    return null;
  }

  function validateStep2(): string | null {
    const email = fields.email.trim();
    if (!email || !EMAIL_RE.test(email))
      return "L'email de connexion n'est pas valide.";
    if (fields.password.length < 8)
      return "Le mot de passe doit contenir au moins 8 caractères.";
    if (fields.password !== fields.confirmPassword)
      return "Les mots de passe ne correspondent pas.";
    return null;
  }

  function goNext() {
    const err =
      step === 0 ? validateStep1() : step === 1 ? validateStep2() : null;
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, ETAPES.length - 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    const result = await creerCompte({
      denominationEntreprise: fields.denominationEntreprise.trim(),
      emailEntreprise: fields.emailEntreprise.trim().toLowerCase(),
      numeroEntreprise: prefix + fields.numeroEntreprise.trim(),
      pays: parseInt(fields.pays, 10),
      email: fields.email.trim().toLowerCase(),
      password: fields.password,
      confirmPassword: fields.confirmPassword,
      codeParrain: fields.codeParrain.trim().toUpperCase() || undefined,
    });

    setSubmitting(false);
    submittingRef.current = false;

    if (result.success) {
      setSuccess(true);
      setFields(EMPTY);
    } else {
      setError(result.message ?? "Une erreur est survenue.");
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md rounded-[1.75rem] border border-border bg-card p-8 text-center shadow-[0_28px_90px_-40px_rgba(7,31,20,0.4)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
          <CheckCircle2 size={34} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h2 className="mt-5 font-serif text-2xl font-semibold text-text">
          Compte créé avec succès !
        </h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Votre compte a bien été créé. Téléchargez l&apos;application Ateliya
          pour vous connecter et commencer à gérer votre atelier.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            Retour à l&apos;accueil
          </Link>
          <a
            href="https://malliya.ateliya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Accéder à l&apos;app <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  const score = passwordScore(fields.password);
  const strength = fields.password ? STRENGTH[Math.max(score - 1, 0)] : null;

  return (
    <div className="mx-auto max-w-lg rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_28px_90px_-40px_rgba(7,31,20,0.4)] sm:p-8">
      {/* Stepper */}
      <ol className="mb-8 flex items-center justify-between">
        {ETAPES.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li
              key={label}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                  done
                    ? "border-primary bg-primary-light text-primary"
                    : active
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background text-muted"
                }`}
              >
                {done ? (
                  <Check size={13} strokeWidth={3} aria-hidden="true" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-center text-[10px] font-semibold uppercase tracking-wide ${active || done ? "text-primary" : "text-muted"}`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {error && (
        <p
          role="alert"
          className="mb-5 flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger"
        >
          <X size={15} aria-hidden="true" /> {error}
        </p>
      )}

      {/* Étape 1 — Entreprise */}
      {step === 0 && (
        <div className="flex flex-col gap-4">
          <Field label="Nom de l'entreprise" required>
            <input
              type="text"
              value={fields.denominationEntreprise}
              onChange={(e) => set("denominationEntreprise", e.target.value)}
              placeholder="Ex : Atelier Boutique Yves"
              maxLength={100}
              autoComplete="organization"
              className={inputClass}
            />
          </Field>

          <Field label="Pays" required>
            <div className="relative">
              <select
                value={fields.pays}
                onChange={(e) => set("pays", e.target.value)}
                disabled={loadingPays}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="" disabled>
                  {loadingPays
                    ? "Chargement des pays…"
                    : "Sélectionnez un pays"}
                </option>
                {paysList.map((p) => (
                  <option key={p.id} value={String(p.id)}>
                    {p.libelle}
                  </option>
                ))}
              </select>
              <ArrowRight
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted"
                aria-hidden="true"
              />
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email entreprise" required>
              <input
                type="email"
                value={fields.emailEntreprise}
                onChange={(e) => set("emailEntreprise", e.target.value)}
                placeholder="contact@atelier.com"
                maxLength={100}
                autoComplete="email"
                className={inputClass}
              />
            </Field>
            <Field label="Téléphone" required>
              <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <span className="flex min-w-[52px] items-center justify-center border-r border-border bg-primary-light px-2 text-xs font-bold text-primary">
                  {prefix}
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={fields.numeroEntreprise}
                  onChange={(e) => set("numeroEntreprise", e.target.value)}
                  placeholder="07 00 00 00 00"
                  maxLength={20}
                  autoComplete="tel-national"
                  className="w-full min-w-0 bg-transparent px-3 py-3 text-sm text-text placeholder:text-muted focus:outline-none"
                />
              </div>
            </Field>
          </div>

          <Field label="Code de parrainage" optional>
            <input
              type="text"
              value={fields.codeParrain}
              onChange={(e) => set("codeParrain", e.target.value)}
              placeholder="Ex : ATL-XXXX"
              maxLength={32}
              autoComplete="off"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {/* Étape 2 — Administrateur */}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <Field label="Email de connexion" required>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="admin@atelier.com"
              maxLength={100}
              autoComplete="username"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mot de passe" required>
              <PasswordInput
                value={fields.password}
                onChange={(v) => set("password", v)}
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
                placeholder="Min. 8 caractères"
                autoComplete="new-password"
              />
            </Field>
            <Field label="Confirmation" required>
              <PasswordInput
                value={fields.confirmPassword}
                onChange={(v) => set("confirmPassword", v)}
                show={showConfirm}
                onToggle={() => setShowConfirm((v) => !v)}
                placeholder="Confirmez"
                autoComplete="new-password"
              />
            </Field>
          </div>

          {fields.password && strength && (
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: strength.width, background: strength.color }}
                />
              </div>
              <span
                className="min-w-[72px] text-right text-xs font-semibold"
                style={{ color: strength.color }}
              >
                {strength.label}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Étape 3 — Confirmation */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-border bg-background">
            <RecapGroup title="Entreprise">
              <RecapRow label="Nom" value={fields.denominationEntreprise} />
              <RecapRow label="Pays" value={paysChoisi?.libelle ?? "—"} />
              <RecapRow label="Email" value={fields.emailEntreprise} />
              <RecapRow
                label="Téléphone"
                value={`${prefix} ${fields.numeroEntreprise}`}
              />
            </RecapGroup>
            <div className="border-t border-border">
              <RecapGroup title="Administrateur">
                <RecapRow label="Email" value={fields.email} />
                <RecapRow label="Mot de passe" value="••••••••" />
              </RecapGroup>
            </div>
          </div>
          <p className="text-center text-xs leading-5 text-text-secondary">
            En créant un compte, vous acceptez nos conditions d&apos;utilisation
            et notre politique de confidentialité.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-7 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-primary-light hover:text-primary disabled:opacity-50"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Précédent
          </button>
        ) : (
          <span />
        )}

        {step < ETAPES.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            Suivant <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                  aria-hidden="true"
                />{" "}
                Création…
              </>
            ) : (
              <>
                <ShieldCheck size={16} aria-hidden="true" /> Créer mon compte
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-text-secondary">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-muted">(optionnel)</span>
        )}
      </span>
      {children}
    </label>
  );
}

function PasswordInput({
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
  autoComplete: string;
}) {
  return (
    <div className="flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        minLength={8}
        maxLength={128}
        autoComplete={autoComplete}
        className="w-full min-w-0 bg-transparent px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none"
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={
          show ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        className="px-3 text-muted transition-colors hover:text-primary"
      >
        {show ? (
          <EyeOff size={16} aria-hidden="true" />
        ) : (
          <Eye size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

function RecapGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="max-w-[60%] break-words text-right font-medium text-text">
        {value || "—"}
      </span>
    </div>
  );
}
