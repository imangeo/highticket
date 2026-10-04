import { useState, useEffect } from "react";
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
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { fireConfetti } from "../utils/confetti";
import WizardSteps from "../components/ui/WizardSteps";
import SmartVideoPlayer from "../components/ui/SmartVideoPlayer";
import { CONTENT } from "../config/content";
import Button from "../components/ui/Button";

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

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
          setErrorMessage("Entre un prénom et un nom valides.");
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
      setTimeout(() => fireConfetti(), 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("error");
      setErrorMessage(result.message || "Erreur d'envoi. Réessaie.");
    }
  };

  // Classe unique, plus claire (fond gris très sombre au lieu de noir pur) pour les inputs
  const inputClass =
    "w-full bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-3.5 font-bold text-white placeholder:text-white/30 outline-none focus:border-white/60 transition-colors shadow-inner";

  const stepsData = [
    {
      id: "identity",
      label: "Identité",
      content: (
        <div className="space-y-5 pt-2">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-bold uppercase tracking-widest text-white/70">
              Prénom & Nom <span className="text-[#ff3366]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(sanitizeName(e.target.value))}
              placeholder="Ex: Jean Dupont"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-bold uppercase tracking-widest text-white/70">
              Âge <span className="text-[#ff3366]">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(sanitizeAge(e.target.value))}
              placeholder="Ex: 22"
              className={inputClass}
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
            <label className="text-xs font-bold uppercase tracking-widest text-white/70">
              Adresse email <span className="text-[#ff3366]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              className={inputClass}
            />
            <p className="text-[11px] font-medium text-white/50 mt-1">
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
        <div className="space-y-5 pt-2">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-bold uppercase tracking-widest text-white/70">
              Pays <span className="text-[#ff3366]">*</span>
            </label>
            <CountryPicker selected={country} onSelect={setCountry} />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-xs font-bold uppercase tracking-widest text-white/70">
              Numéro WhatsApp <span className="text-[#ff3366]">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex items-center px-4 py-3.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 text-sm shrink-0">
                {country.dial}
              </div>
              <input
                type="tel"
                value={displayPhone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="numeric"
                placeholder="Numéro local"
                className={`flex-1 ${inputClass}`}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full min-h-[85vh] bg-transparent text-white px-4 py-16 relative">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {status !== "success" ? (
          <div className="max-w-md mx-auto animate-[toastIn_0.35s_ease-out]">
            <div className="inline-block mb-4">
              <div className="label-hard bg-white text-black border-2 border-black shadow-md">
                Étape finale
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-8 text-white drop-shadow-lg">
              Prêt à commencer
            </h1>

            {errorMessage && (
              <div className="bg-red-500/20 border border-red-500/50 text-white rounded-xl p-3 mb-6 flex items-center gap-2 text-sm font-medium text-left shadow-lg">
                <AlertTriangle size={18} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <WizardSteps
              steps={stepsData}
              index={index}
              onIndexChange={handleIndexChange}
              onComplete={handleComplete}
              complete={done}
              isLoading={status === "loading"}
              height={340}
              nextLabel="Suivant"
              backLabel="Retour"
              finishLabel="Envoyer"
              completeLabel="Enregistré !"
              completeHint="Génération de ton accès..."
            />

            <p className="mt-8 text-[11px] font-medium uppercase tracking-widest text-white/50 bg-black/40 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/10">
              Places limitées · Sans engagement
            </p>
          </div>
        ) : (
          <div className="animate-[toastIn_0.5s_ease-out] w-full max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-2 text-white drop-shadow-lg">
              C'est enregistré !
            </h1>

            <p className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#006bb3] mb-8 drop-shadow-md">
              Bravo de passer à l'action !
            </p>

            <div className="card-dark overflow-hidden border border-white/20 shadow-2xl mx-auto mb-10 bg-black/50">
              <SmartVideoPlayer
                src={CONTENT.videos.strategy?.src || ""}
                type={CONTENT.videos.strategy?.type || "file"}
                title={CONTENT.videos.strategy?.title || "Vidéo explicative"}
                priority={true}
              />
            </div>

            <div className="card-dark p-6 sm:p-10 text-center space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                <CheckCircle2
                  size={36}
                  strokeWidth={2.5}
                  className="text-green-400"
                />
              </div>

              <div className="space-y-3">
                <p className="font-medium text-base sm:text-lg text-white/90 leading-relaxed">
                  Merci{" "}
                  <span className="font-bold text-white">
                    {name.split(" ")[0] || ""}
                  </span>
                  , j'ai bien reçu tes informations.
                </p>
                <p className="font-bold text-lg sm:text-xl text-white uppercase tracking-tight bg-white/5 border border-white/10 p-4 rounded-xl leading-snug">
                  Je vous contacte dès que possible.
                </p>
              </div>

              <div className="bg-[#006bb3]/20 border border-[#006bb3]/40 rounded-xl p-4 inline-block mx-auto mt-2">
                <span className="font-bold uppercase tracking-wider text-sm sm:text-base text-blue-100">
                  Surveille ton WhatsApp
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Button to="/">Retourner à l'accueil</Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
