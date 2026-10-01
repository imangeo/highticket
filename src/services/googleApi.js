import { SITE_CONFIG } from "../config/site.config";

export async function sendLeadToGoogle(payload) {
  const url = SITE_CONFIG.googleScriptUrl?.trim();

  if (!url) {
    return {
      success: false,
      message: "URL Google Script manquante.",
    };
  }

  // Clés JSON transmises au Google Script
  const body = {
    name: payload.name || "",
    email: payload.email || "",
    age: payload.age || "",
    whatsapp: payload.whatsapp || payload.phone || "",
  };

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      message: "Impossible d'envoyer. Vérifie ta connexion.",
    };
  }
}