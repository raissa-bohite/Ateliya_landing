import { BASE_URL, BASE_URL_INSCRIPTION } from "@/lib/environment";

export interface PaysActif {
  id: number;
  libelle: string;
  code: string;
  indicatif: string;
}

export interface CreationCompteInput {
  denominationEntreprise: string;
  emailEntreprise: string;
  numeroEntreprise: string; // avec indicatif, ex "+22507..."
  pays: number;
  email: string;
  password: string;
  confirmPassword: string;
  codeParrain?: string;
}

export interface CreationCompteResult {
  success: boolean;
  message?: string;
}

// Liste des pays actifs (pour le sélecteur d'inscription).
export async function getPaysActifs(): Promise<{
  success: boolean;
  data: PaysActif[];
}> {
  try {
    const res = await fetch(`${BASE_URL}/pays/actif`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    // On ne garde que les champs utilisés, en bornant les longueurs (défense en profondeur).
    const pays: PaysActif[] = data.map(
      (p: Record<string, unknown>): PaysActif => ({
        id: Number(p.id),
        libelle: String(p.libelle ?? "").slice(0, 60),
        code: String(p.code ?? "").slice(0, 3),
        indicatif: String(p.indicatif ?? "").slice(0, 6),
      }),
    );
    return { success: true, data: pays };
  } catch {
    return { success: false, data: [] };
  }
}

// Création du compte entreprise + administrateur.
export async function creerCompte(
  input: CreationCompteInput,
): Promise<CreationCompteResult> {
  const payload: Record<string, unknown> = {
    email: input.email,
    password: input.password,
    confirmPassword: input.confirmPassword,
    denominationEntreprise: input.denominationEntreprise,
    emailEntreprise: input.emailEntreprise,
    device: "web",
    numeroEntreprise: input.numeroEntreprise,
    pays: input.pays,
  };
  if (input.codeParrain) payload.codeParrain = input.codeParrain;

  try {
    const res = await fetch(`${BASE_URL_INSCRIPTION}/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let json: Record<string, unknown> = {};
    try {
      json = await res.json();
    } catch {
      /* réponse non-JSON */
    }

    if (res.ok && json.code === 200) {
      return { success: true };
    }

    // On n'affiche que des messages de type string (jamais d'objet brut).
    const message =
      (typeof json.message === "string" && json.message) ||
      (Array.isArray(json.errors) &&
        typeof json.errors[0] === "string" &&
        json.errors[0]) ||
      `Erreur ${res.status}. Veuillez réessayer.`;
    return { success: false, message };
  } catch {
    return {
      success: false,
      message: "Impossible de contacter le serveur. Vérifiez votre connexion.",
    };
  }
}
