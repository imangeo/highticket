import { useRef, useEffect, useState } from "react";
import { SITE_CONFIG } from "../config/site.config";
import { CONTENT } from "../config/content";
import Button from "../components/ui/Button";
import SmartVideoPlayer from "../components/ui/SmartVideoPlayer";
import FaqItem from "../components/ui/FaqItem";
import TypeWriter from "../components/ui/TypeWriter";
import {
  XCircle,
  CheckCircle2,
  ArrowRight,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          const maxScrollLeft =
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          if (scrollRef.current.scrollLeft >= maxScrollLeft - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
          }
        }
      }, 2500);
    };

    startAutoScroll();

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("mouseenter", () =>
        clearInterval(scrollInterval.current),
      );
      container.addEventListener("mouseleave", startAutoScroll);
      container.addEventListener("touchstart", () =>
        clearInterval(scrollInterval.current),
      );
      container.addEventListener("touchend", startAutoScroll);
    }

    return () => clearInterval(scrollInterval.current);
  }, []);

  const handleFaqToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const benefits = [
    {
      t: "Aucun produit à créer",
      d: "Tu n'as rien à fabriquer. Tu travailles avec des entrepreneurs qui ont déjà une offre.",
      bg: "bg-sun",
    },
    {
      t: "100% Sans visage",
      d: "Ton visage reste privé. Tout se passe par écrit dans les messages privés.",
      bg: "bg-sky",
    },
    {
      t: "Sans audience",
      d: "Pas de compte à faire grossir, pas de danse, pas de mise en scène.",
      bg: "bg-[#62C58F]",
    },
    {
      t: "Stages rémunérés",
      d: "Génère entre 100$ et 200$ par semaine grâce aux stages d'expérimentation.",
      bg: "bg-blush",
    },
    {
      t: "Offres quotidiennes",
      d: "Chaque jour, je t’envoie des offres d’entrepreneurs qui cherchent des setters.",
      bg: "bg-peach",
    },
    {
      t: "Accompagnement",
      d: "Suivi pas à pas jusqu'à la signature de ton tout premier contrat.",
      bg: "bg-lilac",
    },
  ];

  const baseStats = [
    { value: "27j", label: "Pour ta 1ère commission" },
    { value: "100$", label: "Stage par semaine min." },
    { value: "30min", label: "Appel sans engagement" },
    { value: "27j", label: "Pour ta 1ère commission" },
    { value: "100$", label: "Stage par semaine min." },
    { value: "30min", label: "Appel sans engagement" },
  ];

  return (
    <main className="w-full bg-transparent">
      {/* ========== 1. HERO (Transparence 40% -> Animation 100% visible) ========== */}
      <section className="bg-sky/40 backdrop-blur-sm border-b-3 border-ink px-4 pt-16 pb-16 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Titre Vert Forêt LemFi + Ombre Noire Dure (Contraste maximal) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black uppercase leading-[0.95] tracking-tight mb-10 min-h-[2.2em] flex items-center justify-center text-[#1D5B3E] drop-shadow-[2px_2px_0_#ffffff]">
            <TypeWriter
              text="Avant de fermer cette page, donne-moi quelques minutes."
              speed={38}
              className="inline text-[#1D5B3E]"
            />
          </h1>

          {/* CARTE DE TEXTE (Blanc opaque pour lisibilité parfaite) */}
          <div className="card-hard p-6 sm:p-8 text-left bg-white max-w-2xl mx-auto mb-10 space-y-6">
            <p className="text-base sm:text-lg font-medium text-ink/90 leading-relaxed">
              Juste quelques minutes.
            </p>
            <p className="text-base sm:text-lg font-medium text-ink/90 leading-relaxed">
              Peut-être que tu as déjà payé une formation qui{" "}
              <span className="text-mark-blush">n'a rien changé</span>.
              Peut-être que tu as cessé de croire à toutes ces « opportunités »
              qui défilent sur ton écran. Et peut-être que, au fond, une petite
              voix te répète que ce n'est pas fait pour quelqu'un comme toi.
            </p>

            <div className="w-full text-center py-3 bg-sun border-3 border-ink rounded-xl shadow-hard-sm">
              <p className="font-black text-xl sm:text-2xl text-ink uppercase tracking-tight">
                Cette voix se trompe.
              </p>
            </div>

            <p className="text-base sm:text-lg font-medium text-ink/90 leading-relaxed">
              Ce que tu vas découvrir ici, c'est une façon de gagner ton premier
              argent en ligne avec ton téléphone et tes messages.{" "}
              <span className="inline bg-[#62C58F] border-2 border-ink px-1.5 py-0.5 rounded-md font-black text-ink">
                Sans produit
              </span>{" "}
              à fabriquer. <span className="text-mark">Sans public</span> à
              convaincre.{" "}
              <span className="text-mark-blush">
                Sans jamais montrer ton visage
              </span>
              .
            </p>

            <p className="font-black text-sm sm:text-base uppercase tracking-wider text-ink bg-cream border-l-4 border-ink pl-4 py-3 rounded-r-xl">
              Si ton premier vrai paiement n'est pas encore arrivé, reste
              jusqu'au bout. Cette vidéo a été faite pour toi.
            </p>
          </div>

          {/* VIDÉO DU HERO */}
          <div className="max-w-3xl mx-auto mb-10">
            <SmartVideoPlayer
              src={CONTENT.videos.hero.src}
              type={CONTENT.videos.hero.type}
              title={CONTENT.videos.hero.title}
            />
          </div>

          {/* CTA EMPILÉ */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <Button
              to="/appel-strategique"
              fullWidth
              className="w-full sm:w-auto sm:min-w-[280px] !py-5"
            >
              Je réserve mon appel
            </Button>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink bg-white px-4 py-2 rounded-full border-3 border-ink shadow-hard-sm">
              Places limitées · Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* ========== 2. STATS MARQUEE (Transparence 50%) ========== */}
      <section className="border-b-3 border-ink bg-white/50 backdrop-blur-sm overflow-hidden flex">
        <div className="flex w-max animate-marquee">
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s1-${idx}`}
                className="w-[300px] sm:w-[400px] py-8 text-center border-r-3 border-ink shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/70 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s2-${idx}`}
                className="w-[300px] sm:w-[400px] py-8 text-center border-r-3 border-ink shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-ink/70 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. L'ENGAGEMENT (Jaune 45% -> Grille 100% visible) ========== */}
      <section className="bg-sun/45 backdrop-blur-sm border-b-3 border-ink px-4 py-16">
        <div className="max-w-4xl mx-auto mt-4">
          <div className="text-center mb-10">
            <div className="label-hard mb-4 shadow-hard-sm">
              Mon engagement envers toi
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight bg-white inline-block px-4 py-2 border-3 border-ink rounded-xl shadow-hard-sm">
              Ta première commission en 27 jours, sinon c'est à moi de réparer
            </h2>
          </div>

          <div className="card-hard p-6 sm:p-10 mb-8 bg-white space-y-5">
            <p className="font-medium text-ink/90 leading-relaxed text-base sm:text-lg">
              Il y a une peur que je connais par cœur : celle de confier de
              l'argent qu'on a mis du temps à réunir.
            </p>
            <p className="font-medium text-ink/90 leading-relaxed text-base sm:text-lg">
              Chez nous, cet argent ne tombe pas du ciel. Parfois c'est celui
              d'une mère qui s'est privée. D'un grand frère qui a poussé pour
              toi. De plusieurs mois de petits boulots, de trajets à pied pour
              économiser le transport.
            </p>
            <p className="font-bold text-red-600 leading-relaxed text-base sm:text-lg">
              Et l'idée de le perdre pour rien te serre la gorge.
            </p>
            <p className="font-medium text-ink/90 leading-relaxed text-base sm:text-lg">
              Je sais aussi que c'est peut-être déjà arrivé. Un paiement envoyé,
              un lien de groupe reçu, quelques jours d'enthousiasme, puis le
              silence. Des messages qui restent sans réponse. Le sentiment
              d'avoir été utilisé.
            </p>
            <p className="font-black text-ink leading-relaxed text-base sm:text-lg">
              Je ne veux pas que ce soit ton histoire avec moi. Alors voici ce
              que je m'engage à faire.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8">
              <div className="bg-cream border-3 border-ink p-6 rounded-xl">
                <h3 className="font-black uppercase text-xl mb-4">Ta part :</h3>
                <ul className="space-y-3 font-medium text-sm">
                  <li className="flex gap-3">
                    <ArrowRight
                      className="shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={2.5}
                    />
                    Tu rejoins la HIGH–TICKET SETTING SCHOOL
                  </li>
                  <li className="flex gap-3">
                    <ArrowRight
                      className="shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={2.5}
                    />
                    Tu suis les étapes pendant 27 jours
                  </li>
                  <li className="flex gap-3">
                    <ArrowRight
                      className="shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={2.5}
                    />
                    Tu viens aux appels en direct, tu poses tes questions, tu
                    passes à l'action
                  </li>
                </ul>
              </div>

              {/* CONTRASTE CORRIGÉ : Vert LemFi + Texte NOIR */}
              <div className="bg-[#62C58F] border-3 border-ink p-6 rounded-xl shadow-hard-sm">
                <h3 className="font-black uppercase text-xl mb-4 text-ink">
                  MA PART :
                </h3>
                <p className="font-medium text-sm leading-relaxed text-ink">
                  Si, après ces 27 jours, tu n'as pas touché ta première
                  commission
                </p>
                <p className="mt-4 font-black text-sm leading-relaxed text-ink underline underline-offset-4 decoration-2">
                  Tu es remboursé en totalité. Pas la moitié. Pas un avoir pour
                  un autre programme. Chaque franc que tu as investi te revient.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-lg">
                Pourquoi je prends ce risque ?
              </p>
              <p className="font-medium text-ink/90 leading-relaxed">
                Parce que je sais ce que c'est d'être l'étudiant fauché qui
                essaie tout : le trading, les ebooks, le freelancing, et qui se
                demande si un jour quelque chose va enfin fonctionner. Je sais
                ce que ça fait quand on compte sur toi et que tu n'as encore
                rien à montrer.
              </p>
              <p className="font-medium text-ink/90 leading-relaxed">
                Je ne veux pas m'enrichir avec l'argent de quelqu'un que je n'ai
                pas su aider. Mon business, je veux le construire sur des vies
                qui changent, pas sur des regrets.
              </p>
            </div>

            <div className="bg-sky/30 border-3 border-ink p-6 rounded-xl text-center my-8">
              <p className="font-medium text-ink/90 mb-2">
                La question qui compte n'est donc plus « Et si j'y perds mon
                argent ? » C'est :
              </p>
              <p className="font-black text-xl sm:text-2xl text-red-600">
                « Combien me coûte une année de plus exactement comme celle-ci ?
                »
              </p>
            </div>

            <p className="font-medium text-ink/90 leading-relaxed">
              Six mois de plus à répondre « bientôt » quand ta famille te
              demande où tu en es. Six mois de plus à voir d'autres avancer
              pendant que tu restes sur le bord de la route.
            </p>

            <div className="text-center pt-6">
              <p className="font-black uppercase text-lg mb-6">
                C'est maintenant que ça se joue.
              </p>
              <Button to="/appel-strategique" className="sm:px-12 !py-5">
                Je réserve mon appel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. IMMOBILE (Rose 45%) ========== */}
      <section className="bg-blush/45 backdrop-blur-sm border-b-3 border-ink px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white border-3 border-ink rounded-full flex items-center justify-center shadow-hard-sm">
              <XCircle size={32} strokeWidth={2.5} className="text-ink" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-8">
            Si tu restes immobile
          </h2>

          <div className="space-y-6 text-base sm:text-lg font-medium text-ink/90 text-left bg-white p-6 sm:p-10 rounded-2xl border-3 border-ink shadow-hard">
            <p>
              Ce soir, tu vas peut-être te dire : « Je regarderai ça plus tard.
              » Tu vas fermer cette vidéo, ouvrir TikTok, laisser filer une
              heure, puis une autre. Demain, ce sera déjà flou. Dans une
              semaine, il n'en restera rien.
            </p>
            <p className="text-xl font-black text-ink">
              Attendre ressemble à de la sagesse. Souvent, c'est juste de la
              peur qui a trouvé un joli prétexte.
            </p>
            <p>
              Pense à ta mère qui te demande, avec douceur, où tu en es. À cet
              ami parti tenter sa chance ailleurs. Aux CV envoyés qui n'ont
              jamais eu de réponse.
            </p>
          </div>

          <div className="mt-10">
            <Button to="/appel-strategique" className="px-12 !py-5">
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 5. ACTION (Vert 45%) ========== */}
      <section className="bg-[#62C58F]/45 backdrop-blur-sm border-b-3 border-ink px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white border-3 border-ink rounded-full flex items-center justify-center shadow-hard-sm">
              <MessageSquareText
                size={32}
                strokeWidth={2.5}
                className="text-ink"
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-2 text-center text-ink">
            Si tu passes à l'action
          </h2>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-10 text-center text-ink/80">
            Le DM Setting, c'est quoi ?
          </h3>

          <div className="card-hard bg-white p-6 sm:p-10 space-y-6">
            <p className="font-medium text-ink/90 leading-relaxed text-base sm:text-lg">
              Chaque jour, des entrepreneurs reçoivent des messages sur
              Instagram, TikTok ou WhatsApp. Beaucoup n'ont pas le temps d'y
              répondre.{" "}
              <strong className="font-black text-ink">
                Le setter, c'est toi.
              </strong>{" "}
              Tu discutes avec eux et tu les accompagnes jusqu'à l'achat.
            </p>

            <ul className="space-y-3 font-medium text-base sm:text-lg text-ink/90 bg-cream p-6 rounded-xl border-3 border-ink">
              <li className="flex gap-3 items-start">
                <CheckCircle2
                  className="shrink-0 mt-1 text-[#1D5B3E]"
                  size={20}
                  strokeWidth={3}
                />
                <span>
                  <strong className="text-ink">
                    Tu n'as rien à fabriquer.
                  </strong>{" "}
                  Tu travailles avec des entrepreneurs qui ont déjà une offre.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2
                  className="shrink-0 mt-1 text-[#1D5B3E]"
                  size={20}
                  strokeWidth={3}
                />
                <span>
                  <strong className="text-ink">Ton visage reste privé.</strong>{" "}
                  Tout se passe par écrit.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========== 6. OFFRES DU JOUR (Bleu 45%) ========== */}
      <section className="bg-sky/45 backdrop-blur-sm border-b-3 border-ink px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6 bg-white inline-block px-6 py-3 border-3 border-ink rounded-xl shadow-hard-sm">
            Je t'envoie des offres chaque jour
          </h2>
          <div className="max-w-3xl mx-auto">
            <SmartVideoPlayer
              src={CONTENT.videos.dailyOffer.src}
              type={CONTENT.videos.dailyOffer.type}
              title={CONTENT.videos.dailyOffer.title}
            />
          </div>
        </div>
      </section>

      {/* ========== 7. CE QUE TU REÇOIS (Lilas 45%) ========== */}
      <section className="bg-lilac/45 backdrop-blur-sm border-b-3 border-ink py-16 overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight bg-white inline-block px-4 py-2 border-3 border-ink rounded-xl shadow-hard-sm">
              Ce que tu reçois
            </h2>
          </div>
          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 py-6 px-4 sm:px-8 snap-x snap-mandatory scrollbar-hide w-full"
            >
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="card-hard bg-white min-w-[280px] sm:min-w-[320px] max-w-[320px] p-6 snap-center flex-shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 ${b.bg} text-ink border-3 border-ink rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-hard-sm`}
                    >
                      {i + 1}
                    </div>
                    <h3 className="font-black uppercase text-xl tracking-tight leading-tight mb-3">
                      {b.t}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-ink/80 leading-relaxed">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 relative z-50">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 bg-white border-3 border-ink rounded-full flex items-center justify-center shadow-hard hover:bg-cream transition-all"
            >
              <ChevronLeft strokeWidth={3} size={28} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 bg-white border-3 border-ink rounded-full flex items-center justify-center shadow-hard hover:bg-cream transition-all"
            >
              <ChevronRight strokeWidth={3} size={28} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== 8. TÉMOIGNAGES (GRILLE RESPONSIVE) ========== */}
      <section className="bg-cream/60 backdrop-blur-sm border-b-3 border-ink px-4 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
              Témoignages
            </h2>
            <p className="text-lg font-black text-ink bg-sun inline-block px-5 py-2 border-3 border-ink rounded-full shadow-hard-sm">
              Ils ont commencé exactement là où tu es
            </p>
          </div>

          {/* GRILLE RESPONSIVE POUR LES 5 VIDÉOS (v1, v5, v2, v3, v4) 
              - Mobile : 1 vidéo par ligne (100% largeur, très lisible)
              - Tablette : 2 ou 3 vidéos par ligne
              - Grand Écran : 5 vidéos côte à côte bien aérées
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {CONTENT.proofs
              .filter(
                (p) => p.type === "video-file" || p.type === "video-youtube",
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card-hard overflow-hidden bg-white shadow-hard-sm w-full mx-auto"
                >
                  <SmartVideoPlayer
                    src={item.src}
                    type={item.type === "video-youtube" ? "youtube" : "file"}
                    title={item.title}
                  />
                </div>
              ))}
          </div>

          {/* GRILLE PHOTOS (MASONRY PINTEREST) */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
            {CONTENT.proofs
              .filter((p) => p.type === "image")
              .map((item) => (
                <div
                  key={item.id}
                  className="card-hard break-inside-avoid overflow-hidden bg-white shadow-hard-sm mb-5"
                >
                  <img
                    src={item.src}
                    alt="Témoignage"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
          </div>

          <div className="text-center mt-16">
            <Button to="/appel-strategique" className="px-12 !py-5">
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 9. DEUX CHEMINS ========== */}
      <section className="border-b-3 border-ink bg-white/45 backdrop-blur-sm">
        <div className="px-4 pt-16 pb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Deux chemins devant toi
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-blush/85 border-b-3 md:border-b-0 md:border-r-3 border-ink p-8 sm:p-12">
            <h3 className="font-black uppercase text-2xl mb-4 text-red-600">
              Le premier : tout laisser comme avant
            </h3>
            <p className="font-medium text-ink/90 text-base leading-relaxed bg-white p-6 rounded-xl border-3 border-ink shadow-hard-sm">
              Tu fermes cette page. Tu te promets d'y repenser, et tu continues
              de vivre comme hier. Un an passe. Tu es toujours au même endroit.
            </p>
          </div>

          <div className="bg-[#62C58F]/85 p-8 sm:p-12">
            <h3 className="font-black uppercase text-2xl mb-4 text-[#1D5B3E]">
              Le second : faire ce petit pas
            </h3>
            <p className="font-medium text-ink/90 text-base leading-relaxed bg-white p-6 rounded-xl border-3 border-ink shadow-hard-sm">
              Tu réserves un appel de 30 minutes. Tu poses tes questions. Dans
              quelques semaines, une notification t'annonce ton premier
              paiement.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 10. FAQ ========== */}
      <section className="bg-white/45 backdrop-blur-sm border-b-3 border-ink px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight bg-cream inline-block px-4 py-2 border-3 border-ink rounded-xl shadow-hard-sm">
              Les questions que tu te poses
            </h2>
          </div>
          <div className="card-hard p-4 sm:p-8 bg-white">
            {SITE_CONFIG.faq.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openFaqId === i}
                onToggle={() => handleFaqToggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 11. CTA FINAL ========== */}
      <section className="bg-peach/85 backdrop-blur-sm border-b-3 border-ink px-4 py-20 text-center">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
          Dans un an, tu seras soit quelqu'un qui a essayé...
        </h2>
        <Button to="/appel-strategique" className="px-12 mb-10 !py-5">
          Je réserve mon appel
        </Button>
      </section>
    </main>
  );
}
