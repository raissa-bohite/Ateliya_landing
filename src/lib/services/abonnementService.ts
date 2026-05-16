import { BASE_URL } from "../environment";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export interface PaysOption {
  id: number;
  libelle: string;
  code: string;
  indicatif: string;
}

export interface ModuleBackend {
  id: number;
  code: string;
  description: string;
  montant: string;
  duree: string;
  numero: number | null;
  lignes: { libelle: string; quantite: string | null; description: string }[];
  pays: PaysOption | null;
}

export interface VerifyAdminResponse {
  success: boolean;
  adminId?: number;
  nom?: string;
  prenom?: string;
  societe?: string;
  email?: string;
  message?: string;
}

export interface InitiatePaymentPayload {
  adminEmail: string;
  adminId: number;
  moduleId: number;
  methodePaiement: "wave" | "orange_money" | "mtn" | "moov";
  periodicite: "mensuel" | "trimestriel" | "annuel";
  montant: number;
  nomPayeur?: string;
  telephonePayeur?: string;
}

export interface PaymentSession {
  sessionId: string;
  redirectUrl?: string;
  checkUrl: string;
  expiresAt: string;
  montant: number;
  devise: string;
}

export interface PaymentStatus {
  sessionId: string;
  status: "pending" | "success" | "failed" | "expired";
  message: string;
  abonnementActifJusquau?: string;
}

export function formaterMontant(montant: number, devise = "XOF"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: devise,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant);
}

// ─────────────────────────────────────────
// API CALLS — Requêtes publiques (pas de token)
// ─────────────────────────────────────────

export async function verifierAdminParEmail(
  email: string,
): Promise<VerifyAdminResponse> {
  try {
    const response = await fetch(`${BASE_URL}/abonnement/verify-admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message ?? "Aucun compte trouvé avec cet email.",
      };
    }

    return {
      success: true,
      adminId: data.adminId,
      nom: data.nom,
      prenom: data.prenom,
      societe: data.societe,
      email: data.email,
    };
  } catch {
    return {
      success: false,
      message: "Erreur de connexion. Veuillez réessayer.",
    };
  }
}

export async function initierPaiementAbonnement(
  payload: InitiatePaymentPayload,
): Promise<PaymentSession> {
  const response = await fetch(`${BASE_URL}/abonnement/initiate-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "Échec de l'initiation du paiement.");
  }

  return data as PaymentSession;
}

export async function getPaysDisponibles(): Promise<{
  success: boolean;
  data: PaysOption[];
}> {
  try {
    const res = await fetch(`${BASE_URL}/abonnement/pays-disponibles`);
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
}

export async function getModulesDisponibles(
  paysId: number,
): Promise<{ success: boolean; data: ModuleBackend[] }> {
  try {
    const res = await fetch(
      `${BASE_URL}/abonnement/modules-disponibles?paysId=${paysId}`,
    );
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
}

export async function verifierStatutPaiement(
  sessionId: string,
): Promise<PaymentStatus> {
  try {
    const res = await fetch(
      `${BASE_URL}/abonnement/payment-status/${sessionId}`,
    );
    return (await res.json()) as PaymentStatus;
  } catch {
    return {
      sessionId,
      status: "pending",
      message: "Vérification en cours...",
    };
  }
}
