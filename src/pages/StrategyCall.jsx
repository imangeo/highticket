import { useState, useEffect } from "react";
import { SITE_CONFIG } from "../config/site.config";
import { sendLeadToGoogle } from "../services/googleApi";
import CountryPicker, { ALL_COUNTRIES } from "../components/ui/CountryPicker";
import {
  sanitizeName,
  sanitizeAge,
  isValidName,
  isValidEmail,
  validatePhoneForCountry,
  formatPhoneAsYouType,
  enforceCountryMaxPhoneDigits,
} from "../utils/sanitize";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { fireConfetti } from "../utils/confetti";
import WizardSteps from "../components/ui/WizardSteps";

export default function StrategyCall() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [country, setCountry] = useState(
    ALL_COUNTRIES.find((c) => c.code === "FR") || ALL_COUNTRIES[0],
  );

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const t = setTimeout(() => fireConfetti(), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phone) {
      const capped = enforceCountryMaxPhoneDigits(
        phone,
        country.code,
        country.dial,
      );
      setPhone(capped);
      setDisplayPhone(formatPhoneAsYouType(capped, country.code, country.dial));
    }
  }, [country.code, country.dial, phone]);

  const handleIndexChange = (nextIndex, direction) => {
    setErrorMessage("");
    if (direction === 1) {
      if (index === 0) {
        if (!isValidName(name)) {
          setErrorMessage("Entre un prénom/nom valide.");
          return;
        }
        if (!age || Number(age) < 16) {
          setErrorMessage("Tu dois avoir au moins 16 ans.");
          return;
        }
      }
      if (index === 1) {
        if (!isValidEmail(email)) {
          setErrorMessage("Entre une adresse email valide.");
          return;
        }
      }
    }
    setIndex(nextIndex);
  };

  const handleComplete = async () => {
    setErrorMessage("");

    const check = validatePhoneForCountry(phone, country.code, country.dial);
    if (!check.valid) {
      setErrorMessage(check.message || "Numéro WhatsApp invalide.");
      return;
    }

    setStatus("loading");

    const result = await sendLeadToGoogle({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: String(age),
      whatsapp: check.e164,
    });

    if (result.success) {
      setStatus("success");
      setDone(true);
    } else {
      setStatus("error");
      setErrorMessage(result.message || "Erreur d'envoi. Réessaie.");
    }
  };

  const stepsData = [
    {
      id: "identity",
      label: "Identité",
      content: (
        <div className="space-y-4 pt-1">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-ink/70">
              Prénom & Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(sanitizeName(e.target.value))}
              placeholder="Ex: Jean Dupont"
              className="w-full bg-cream/30 border-3 border-ink rounded-xl px-4 py-3 font-bold text-ink outline-none focus:shadow-hard-sm"
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-ink/70">
              Âge <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(sanitizeAge(e.target.value))}
              placeholder="Ex: 22"
              className="w-full bg-cream/30 border-3 border-ink rounded-xl px-4 py-3 font-bold text-ink outline-none focus:shadow-hard-sm"
            />
          </div>
        </div>
      ),
    },
    {
      id: "email",
      label: "Contact",
      content: (
        <div className="space-y-4 pt-1 h-full flex flex-col justify-center">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-ink/70">
              Adresse email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className="w-full bg-cream/30 border-3 border-ink rounded-xl px-4 py-3 font-bold text-ink outline-none focus:shadow-hard-sm"
            />
            <p className="text-[11px] font-bold text-ink/40 mt-1">
              Pour te recontacter et t’envoyer les infos.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      content: (
        <div className="space-y-4 pt-1">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-ink/70">
              Pays <span className="text-red-500">*</span>
            </label>
            <CountryPicker selected={country} onSelect={setCountry} />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-black uppercase tracking-widest text-ink/70">
              Numéro WhatsApp <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 py-3 bg-ink text-white font-black rounded-xl border-3 border-ink text-sm shrink-0">
                {country.dial}
              </div>
              <input
                type="tel"
                value={displayPhone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="numeric"
                className="flex-1 bg-cream/30 border-3 border-ink rounded-xl px-4 py-3 font-bold text-ink outline-none focus:shadow-hard-sm"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full min-h-[80vh] bg-sky/40 backdrop-blur-md border-b-3 border-ink px-4 py-16 relative">
      <div className="max-w-md mx-auto text-center">
        <div className="label-hard mb-4 shadow-hard-sm">Étape finale</div>

        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-8">
          {status === "success" ? "C'est enregistré !" : "Prêt à commencer"}
        </h1>

        {errorMessage && (
          <div className="bg-blush border-3 border-ink rounded-xl p-3 mb-6 flex items-center gap-2 text-sm font-bold animate-[toastIn_0.3s_ease-out]">
            <AlertTriangle size={18} className="shrink-0" />
            <span className="text-left">{errorMessage}</span>
          </div>
        )}

        {/* ===== ÉCRAN SUCCÈS SANS TOAST NI RECAP ----- */}
        {status === "success" ? (
          <div className="card-hard bg-white p-8 sm:p-10 text-center space-y-6 animate-[toastIn_0.35s_ease-out]">
            <div className="w-16 h-16 mx-auto rounded-full border-3 border-ink bg-mint flex items-center justify-center shadow-hard-sm">
              <CheckCircle2 size={36} strokeWidth={2.5} className="text-ink" />
            </div>

            <div className="space-y-3">
              <p className="font-bold text-base sm:text-lg text-ink/90 leading-relaxed">
                Merci{" "}
                <span className="font-black text-ink">
                  {name.split(" ")[0] || ""}
                </span>
                , j'ai bien reçu tes informations.
              </p>

              <p className="font-black text-lg sm:text-xl text-ink uppercase tracking-tight bg-sun/50 border-3 border-ink p-4 rounded-2xl shadow-hard-sm leading-snug">
                Je vous contacte dès que possible.
              </p>
            </div>

            {/* Banderole Info WhatsApp avec l'icône 'i' */}
            <div className="bg-cream border-3 border-ink rounded-2xl p-4 flex items-center justify-center gap-3 shadow-hard-sm">
              <div className="w-8 h-8 rounded-full bg-ink text-white font-black text-sm flex items-center justify-center shrink-0 border-2 border-ink">
                i
              </div>
              <span className="font-black uppercase tracking-wider text-sm sm:text-base text-ink">
                Surveille ton WhatsApp
              </span>
            </div>
          </div>
        ) : (
          /* ===== FORMULAIRE STEPPER ===== */
          <WizardSteps
            steps={stepsData}
            index={index}
            onIndexChange={handleIndexChange}
            onComplete={handleComplete}
            complete={done}
            isLoading={status === "loading"}
            height={320}
            nextLabel="Suivant"
            backLabel="Retour"
            finishLabel="Envoyer"
            completeLabel="Enregistré !"
            completeHint="Je vous contacte dès que possible."
          />
        )}

        {status !== "success" && (
          <p className="mt-8 text-[11px] font-bold uppercase tracking-widest text-ink/40">
            Places limitées · Sans engagement
          </p>
        )}
      </div>
    </main>
  );
}
