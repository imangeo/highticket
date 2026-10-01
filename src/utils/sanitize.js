import { parsePhoneNumberFromString, AsYouType, getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";

// Anti-XSS
export function sanitizeText(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>"'`;\\]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

// Validation Nom
export function sanitizeName(input) {
  if (typeof input !== "string") return "";
  return input
    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, 60);
}

export function isValidName(name) {
  const cleaned = sanitizeName(name);
  return cleaned.length >= 2 && /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ\s'-]+$/.test(cleaned);
}

// Chiffres uniquement
export function sanitizePhone(input) {
  if (typeof input !== "string") return "";
  return input.replace(/\D/g, "");
}

/**
 * Calcule dynamiquement le nombre maximum de chiffres autorisés pour N'IMPORTE QUEL pays du monde
 */
export function getMaxDigitsForCountry(countryCode) {
  try {
    const example = getExampleNumber(countryCode, examples);
    if (example && example.nationalNumber) {
      const baseLength = example.nationalNumber.length;
      // Certains pays à longueur variable (Allemagne, UK, Italie) autorisent +1 chiffre
      const variableLengthCountries = ["DE", "GB", "IT", "AT", "IL"];
      return variableLengthCountries.includes(countryCode) ? baseLength + 1 : baseLength;
    }
  } catch {
    // Sécurité
  }
  return 10;
}

/**
 * Bloque physiquement la frappe au nombre exact de chiffres du pays sélectionné
 */
export function enforceCountryMaxPhoneDigits(inputDigits, countryCode = "FR", dialCode = "+33") {
  let digits = sanitizePhone(inputDigits);
  if (!digits) return "";

  // Retire l'indicatif s'il est collé par réflexe dans le champ local
  const dialDigits = sanitizePhone(dialCode);
  if (dialDigits && digits.startsWith(dialDigits) && digits.length > dialDigits.length + 3) {
    digits = digits.slice(dialDigits.length);
  }

  // Détermination dynamique de la taille max pour ce pays
  const maxAllowed = getMaxDigitsForCountry(countryCode);

  // Blocage strict à la taille exacte
  if (digits.length > maxAllowed) {
    digits = digits.slice(0, maxAllowed);
  }

  // Double sécurité avec le parser libphonenumber
  let parsed = parsePhoneNumberFromString(digits, countryCode);
  while (digits.length > 0 && parsed && parsed.possibility === "TOO_LONG") {
    digits = digits.slice(0, -1);
    parsed = parsePhoneNumberFromString(digits, countryCode);
  }

  return digits;
}

/**
 * Formate en temps réel
 */
export function formatPhoneAsYouType(inputDigits, countryCode = "FR", dialCode = "+33") {
  const cleanDigits = enforceCountryMaxPhoneDigits(inputDigits, countryCode, dialCode);
  if (!cleanDigits) return "";
  const formatter = new AsYouType(countryCode);
  return formatter.input(cleanDigits);
}

/**
 * Validation stricte du numéro
 */
export function validatePhoneForCountry(inputDigits, countryCode = "FR", dialCode = "+33") {
  const digits = enforceCountryMaxPhoneDigits(inputDigits, countryCode, dialCode);

  if (!digits || digits.length < 5) {
    return {
      valid: false,
      e164: null,
      message: "Numéro de téléphone trop court.",
    };
  }

  try {
    const phoneNumber = parsePhoneNumberFromString(digits, countryCode);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return {
        valid: false,
        e164: null,
        message: "Format de numéro invalide pour ce pays.",
      };
    }

    return {
      valid: true,
      e164: phoneNumber.format("E.164"),
      national: phoneNumber.formatNational(),
      message: null,
    };
  } catch {
    return {
      valid: false,
      e164: null,
      message: "Format de numéro invalide.",
    };
  }
}

// --- Validation Email ---
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// --- Validation Âge ---
export function sanitizeAge(input) {
  if (typeof input !== "string") return "";
  return input.replace(/\D/g, "").slice(0, 2); // Max 2 chiffres (ex: 99)
}