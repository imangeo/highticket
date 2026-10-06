import { useEffect } from "react";
import { CONTENT } from "../config/content";
import SmartVideoPlayer from "../components/ui/SmartVideoPlayer";
import { Send, MessageSquare, ArrowRight, ChevronsDown } from "lucide-react";
import { fireConfetti } from "../utils/confetti";

// Icône WhatsApp personnalisée (SVG natif) pour le visuel
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function StrategyCall() {
  // 1. Confettis et scroll en haut dès l'arrivée sur la page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => fireConfetti(), 400);
    return () => clearTimeout(timer);
  }, []);

  // 2. Ton numéro WhatsApp exact (+243 827 513 60)
  const whatsappNumber = "24382751360";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Setting`;

  return (
    <main className="w-full min-h-[85vh] bg-transparent text-white px-4 py-16 relative">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* --- 1. TITRE DE CÉLÉBRATION --- */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-10 text-white drop-shadow-md">
          Bravo de passer <br className="hidden sm:block" /> à l'action !
        </h1>

        {/* --- 2. VIDÉO EXPLICATIVE (EN HAUT) --- */}
        <div className="card-dark overflow-hidden border border-white/20 shadow-2xl mx-auto mb-16 bg-black/50 p-1 sm:p-3">
          <div className="rounded-xl overflow-hidden">
            <SmartVideoPlayer
              src={CONTENT.videos.strategy?.src || ""}
              type={CONTENT.videos.strategy?.type || "file"}
              title={CONTENT.videos.strategy?.title || "Vidéo explicative"}
              priority={true} // Se charge en priorité
            />
          </div>
        </div>

        {/* --- 3. TITRE TRANSITION --- */}
        <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight leading-tight mb-8 text-white/90">
          Pour réserver ton <br className="sm:hidden" /> appel stratégique
        </h2>

        {/* --- 4. CARTE PRINCIPALE : Instructions WhatsApp --- */}
        <div className="card-dark p-8 sm:p-14 text-center mb-10 shadow-[0_0_40px_rgba(0,107,179,0.15)] bg-black/60 border-white/10">
          {/* Illustration visuelle Message -> WhatsApp */}
          <div className="flex items-center justify-center gap-4 mb-8 text-[#006bb3]">
            <MessageSquare size={32} strokeWidth={2} className="opacity-90" />
            <ArrowRight size={20} strokeWidth={2} className="opacity-60" />
            <WhatsAppIcon size={32} className="opacity-90" />
          </div>

          <p className="text-lg sm:text-xl font-bold text-white/90 leading-relaxed mb-8">
            Envoie-moi le mot-clé sur WhatsApp :
          </p>

          {/* Badge du Mot-Clé (Fond dégradé Premium) */}
          <div className="inline-block bg-gradient-to-r from-[#004e8a] to-[#006bb3] text-white font-black text-3xl sm:text-4xl tracking-widest px-12 py-5 rounded-2xl shadow-lg border border-white/20 mb-8">
            "SETTING"
          </div>

          <p className="text-sm font-medium text-white/50">
            Clique sur le bouton ci-dessous, le message est déjà prêt à être
            envoyé.
          </p>
        </div>

        {/* --- 5. FLÈCHES D'ANIMATION DESCENDANTES --- */}
        <div className="flex flex-col items-center justify-center mb-8 text-[#006bb3] animate-bounce">
          <ChevronsDown size={36} strokeWidth={2.5} />
        </div>

        {/* --- 6. BOUTON D'ACTION DIRECT --- */}
        <div className="flex flex-col items-center justify-center pb-12">
          {/* Utilisation de la balise <a> avec ton style btn-shine */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine w-full sm:w-auto !px-12 !py-4 shadow-[0_10px_30px_rgba(0,107,179,0.3)]"
          >
            <span className="flex items-center gap-3">
              <Send size={20} strokeWidth={2.5} />
              <span className="text-lg">Envoyer mon mot-clé</span>
            </span>

            {/* L'icône de balayage lumineuse de btn-shine */}
            <svg
              className="btn-shine-icon ml-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Affichage du numéro */}
          <p className="mt-8 text-xs font-medium tracking-widest text-white/40 font-mono">
            +{whatsappNumber.slice(0, 3)} {whatsappNumber.slice(3, 6)}{" "}
            {whatsappNumber.slice(6, 8)} {whatsappNumber.slice(8, 11)}
          </p>
        </div>
      </div>
    </main>
  );
}
