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
      d: "Génère entre 100$ et 200$ par semaine grâce aux stages d'expérimentation, même sans contrat.",
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

  // MARQUEE MIS À JOUR
  const baseStats = [
    { value: "27j", label: "Pour ta 1ère commission" },
    {
      value: "100$ - 200$",
      label:
        "Génère entre 100$ et 200$ par semaine grâce aux stages d'expérimentation, même sans contrat.",
    },
    { value: "30min", label: "Appel sans engagement" },
    { value: "27j", label: "Pour ta 1ère commission" },
    {
      value: "100$ - 200$",
      label:
        "Génère entre 100$ et 200$ par semaine grâce aux stages d'expérimentation, même sans contrat.",
    },
    { value: "30min", label: "Appel sans engagement" },
  ];

  return (
    <main className="w-full bg-transparent text-white">
      {/* ========== 1. HERO (Transparence totale pour laisser voir la grille) ========== */}
      <section className="bg-transparent px-4 pt-16 pb-16 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Titre Blanc Pur imposant */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black uppercase leading-[0.95] tracking-tight mb-8 text-white drop-shadow-md">
            <TypeWriter
              text="Avant de fermer cette page, donne-moi quelques minutes."
              speed={38}
              className="inline text-white"
            />
          </h1>

          <p className="text-lg sm:text-xl font-medium text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Juste quelques minutes.
          </p>

          {/* CARTE DE TEXTE BLANCHE OPAQUE POUR LISIBILITÉ PARFAITE */}
          <div className="card-hard p-6 sm:p-10 text-left bg-white text-black max-w-2xl mx-auto mb-10 space-y-6">
            <p className="text-base sm:text-lg font-medium text-black/90 leading-relaxed">
              Peut-être que tu as déjà payé une formation qui{" "}
              <span className="text-mark-blush">n'a rien changé</span>.
              Peut-être que tu as cessé de croire à toutes ces « opportunités »
              qui défilent sur ton écran. Et peut-être que, au fond, une petite
              voix te répète que ce n'est pas fait pour quelqu'un comme toi.
            </p>

            <div className="w-full text-center py-3 bg-[#ffd731] border-2 border-black rounded-xl">
              <p className="font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
                Cette voix se trompe.
              </p>
            </div>

            <p className="text-base sm:text-lg font-medium text-black/90 leading-relaxed">
              Ce que tu vas découvrir ici, c'est une façon de gagner ton premier
              argent en ligne avec ton téléphone et tes messages.{" "}
              <span className="text-mark-mint">Sans produit</span> à fabriquer.{" "}
              <span className="text-mark">Sans public</span> à convaincre.{" "}
              <span className="text-mark-blush">
                Sans jamais montrer ton visage
              </span>
              .
            </p>

            <p className="font-black text-sm sm:text-base uppercase tracking-wider text-black bg-[#f6f1e7] border-l-4 border-black pl-4 py-3 rounded-r-xl">
              Si ton premier vrai paiement n'est pas encore arrivé, reste
              jusqu'au bout. Cette vidéo a été faite pour toi.
            </p>
          </div>

          {/* VIDÉO EN DESSOUS */}
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
              className="w-full sm:w-auto sm:min-w-[280px] !py-5 bg-white text-black hover:bg-[#62C58F]"
            >
              Je réserve mon appel
            </Button>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              Places limitées · Sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* ========== 2. STATS MARQUEE (Barre Sombre) ========== */}
      <section className="border-y-2 border-white/20 bg-black/60 backdrop-blur-md overflow-hidden flex">
        <div className="flex w-max animate-marquee">
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s1-${idx}`}
                className="w-[320px] sm:w-[480px] py-6 px-4 text-center border-r border-white/20 shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#62C58F]">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-1 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s2-${idx}`}
                className="w-[320px] sm:w-[480px] py-6 px-4 text-center border-r border-white/20 shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-[#62C58F]">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80 mt-1 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. L'ENGAGEMENT ========== */}
      <section className="bg-transparent px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="label-hard mb-4 bg-white text-black">
              Mon engagement envers toi
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white">
              Ta première commission en 27 jours, sinon c'est à moi de réparer
            </h2>
          </div>

          <div className="card-hard p-6 sm:p-10 mb-8 bg-white text-black space-y-5">
            <p className="font-medium text-black/90 leading-relaxed text-base sm:text-lg">
              Il y a une peur que je connais par cœur : celle de confier de
              l'argent qu'on a mis du temps à réunir.
            </p>
            <p className="font-medium text-black/90 leading-relaxed text-base sm:text-lg">
              Chez nous, cet argent ne tombe pas du ciel. Parfois c'est celui
              d'une mère qui s'est privée. D'un grand frère qui a poussé pour
              toi. De plusieurs mois de petits boulots, de trajets à pied pour
              économiser le transport.
            </p>
            <p className="font-bold text-red-600 leading-relaxed text-base sm:text-lg">
              Et l'idée de le perdre pour rien te serre la gorge.
            </p>
            <p className="font-medium text-black/90 leading-relaxed text-base sm:text-lg">
              Je sais aussi que c'est peut-être déjà arrivé. Un paiement envoyé,
              un lien de groupe reçu, quelques jours d'enthousiasme, puis le
              silence. Des messages qui restent sans réponse. Le sentiment
              d'avoir été utilisé.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8">
              <div className="bg-[#f6f1e7] border-2 border-black p-6 rounded-xl">
                <h3 className="font-black uppercase text-xl mb-4 text-black">
                  Ta part :
                </h3>
                <ul className="space-y-3 font-medium text-sm text-black">
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

              <div className="bg-[#62C58F] border-2 border-black p-6 rounded-xl">
                <h3 className="font-black uppercase text-xl mb-4 text-black">
                  MA PART :
                </h3>
                <p className="font-medium text-sm leading-relaxed text-black">
                  Si, après ces 27 jours, tu n'as pas touché ta première
                  commission :
                </p>
                <p className="mt-4 font-black text-sm leading-relaxed text-black underline underline-offset-4">
                  Tu es remboursé en totalité. Pas la moitié. Pas un avoir pour
                  un autre programme. Chaque franc que tu as investi te revient.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-black uppercase text-lg text-black">
                Pourquoi je prends ce risque ?
              </p>
              <p className="font-medium text-black/90 leading-relaxed">
                Parce que je sais ce que c'est d'être l'étudiant fauché qui
                essaie tout : le trading, les ebooks, le freelancing, et qui se
                demande si un jour quelque chose va enfin fonctionner.
              </p>
              <p className="font-medium text-black/90 leading-relaxed">
                Je ne veux pas m'enrichir avec l'argent de quelqu'un que je n'ai
                pas su aider. Mon business, je veux le construire sur des vies
                qui changent, pas sur des regrets.
              </p>
            </div>

            <div className="bg-[#dceeff] border-2 border-black p-6 rounded-xl text-center my-8">
              <p className="font-medium text-black/90 mb-2">
                La question qui compte n'est donc plus « Et si j'y perds mon
                argent ? » C'est :
              </p>
              <p className="font-black text-xl sm:text-2xl text-red-600">
                « Combien me coûte une année de plus exactement comme celle-ci ?
                »
              </p>
            </div>

            <div className="text-center pt-4">
              <Button
                to="/appel-strategique"
                className="sm:px-12 !py-5 bg-black text-white"
              >
                Je réserve mon appel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. IMMOBILE ========== */}
      <section className="bg-transparent px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white text-black border-2 border-white rounded-full flex items-center justify-center shadow-lg">
              <XCircle size={32} strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-8 text-white">
            Si tu restes immobile
          </h2>

          <div className="card-hard p-6 sm:p-10 text-left bg-white text-black space-y-6">
            <p className="text-base sm:text-lg font-medium leading-relaxed">
              Ce soir, tu vas peut-être te dire : « Je regarderai ça plus tard.
              » Tu vas fermer cette vidéo, ouvrir TikTok, laisser filer une
              heure, puis une autre. Demain, ce sera déjà flou. Dans une
              semaine, il n'en restera rien.
            </p>

            <p className="text-xl font-black text-black bg-[#ffb38a] p-3 rounded-xl border border-black">
              Attendre ressemble à de la sagesse. Souvent, c'est juste de la
              peur qui a trouvé un joli prétexte.
            </p>

            <p className="text-base sm:text-lg font-medium leading-relaxed">
              Pense à ta mère qui te demande, avec douceur, où tu en es. À cet
              ami parti tenter sa chance ailleurs. Aux CV envoyés qui n'ont
              jamais eu de réponse.
            </p>
          </div>

          <div className="mt-10">
            <Button
              to="/appel-strategique"
              className="px-12 !py-5 bg-white text-black hover:bg-[#62C58F]"
            >
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 5. ACTION (DM SETTING) ========== */}
      <section className="bg-transparent px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#62C58F] text-black border-2 border-white rounded-full flex items-center justify-center shadow-lg">
              <MessageSquareText size={32} strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-2 text-center text-white">
            Si tu passes à l'action
          </h2>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-10 text-center text-[#62C58F]">
            Le DM Setting, c'est quoi ?
          </h3>

          <div className="card-hard bg-white text-black p-6 sm:p-10 space-y-6">
            <p className="font-medium text-black/90 leading-relaxed text-base sm:text-lg">
              Chaque jour, des entrepreneurs reçoivent des messages sur
              Instagram, TikTok ou WhatsApp. Beaucoup n'ont pas le temps d'y
              répondre.{" "}
              <strong className="font-black text-black bg-[#62C58F] px-2 py-0.5 rounded">
                Le setter, c'est toi.
              </strong>{" "}
              Tu discutes avec eux et tu les accompagnes jusqu'à l'achat.
            </p>

            <ul className="space-y-3 font-medium text-base sm:text-lg text-black bg-[#f6f1e7] p-6 rounded-xl border-2 border-black">
              <li className="flex gap-3 items-start">
                <CheckCircle2
                  className="shrink-0 mt-1 text-[#1D5B3E]"
                  size={20}
                  strokeWidth={3}
                />
                <span>
                  <strong className="text-black">
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
                  <strong className="text-black">
                    Ton visage reste privé.
                  </strong>{" "}
                  Tout se passe par écrit.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========== 6. OFFRES DU JOUR ========== */}
      <section className="bg-transparent px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6 bg-white text-black inline-block px-6 py-3 border-2 border-black rounded-xl">
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

      {/* ========== 7. CE QUE TU REÇOIS (SLIDER) ========== */}
      <section className="bg-transparent py-16 overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight bg-white text-black inline-block px-6 py-2 border-2 border-black rounded-xl">
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
                  className="card-hard bg-white text-black min-w-[280px] sm:min-w-[320px] max-w-[320px] p-6 snap-center flex-shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 ${b.bg} text-black border-2 border-black rounded-full flex items-center justify-center font-black text-xl mb-6`}
                    >
                      {i + 1}
                    </div>
                    <h3 className="font-black uppercase text-xl tracking-tight leading-tight mb-3">
                      {b.t}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-black/80 leading-relaxed">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 relative z-50">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 bg-white text-black border-2 border-black rounded-full flex items-center justify-center shadow-md hover:bg-[#62C58F] transition-all"
            >
              <ChevronLeft strokeWidth={3} size={28} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 bg-white text-black border-2 border-black rounded-full flex items-center justify-center shadow-md hover:bg-[#62C58F] transition-all"
            >
              <ChevronRight strokeWidth={3} size={28} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== 8. TÉMOIGNAGES (GRILLE HORIZONTALE v1, v5, v2, v3, v4 + PHOTOS) ========== */}
      <section className="bg-transparent px-4 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4 text-white">
              Témoignages
            </h2>
            <p className="text-lg font-black text-black bg-[#ffd731] inline-block px-5 py-2 border-2 border-black rounded-full">
              Ils ont commencé exactement là où tu es
            </p>
          </div>

          {/* RANGÉE DE VIDÉOS HORIZONTALES */}
          <div className="flex gap-4 overflow-x-auto pb-6 px-1 snap-x snap-mandatory scrollbar-hide mb-12">
            {CONTENT.proofs
              .filter(
                (p) => p.type === "video-file" || p.type === "video-youtube",
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card-hard overflow-hidden bg-white snap-start shrink-0 w-[min(85vw,300px)] sm:w-[280px]"
                >
                  <SmartVideoPlayer
                    src={item.src}
                    type={item.type === "video-youtube" ? "youtube" : "file"}
                    title={item.title}
                  />
                </div>
              ))}
          </div>

          {/* GRILLE PHOTOS MASONRY */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
            {CONTENT.proofs
              .filter((p) => p.type === "image")
              .map((item) => (
                <div
                  key={item.id}
                  className="card-hard break-inside-avoid overflow-hidden bg-white mb-5"
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
            <Button
              to="/appel-strategique"
              className="px-12 !py-5 bg-white text-black hover:bg-[#62C58F]"
            >
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 9. DEUX CHEMINS ========== */}
      <section className="bg-transparent border-t border-white/20">
        <div className="px-4 pt-16 pb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Deux chemins devant toi
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-[#ff7800]/90 border-2 border-black p-8 sm:p-12 rounded-2xl text-black">
            <h3 className="font-black uppercase text-2xl mb-4">
              Le premier : tout laisser comme avant
            </h3>
            <p className="font-medium text-base leading-relaxed bg-white p-6 rounded-xl border-2 border-black">
              Tu fermes cette page. Tu te promets d'y repenser, et tu continues
              de vivre comme hier. Un an passe. Tu es toujours au même endroit.
            </p>
          </div>

          <div className="bg-[#62C58F]/90 border-2 border-black p-8 sm:p-12 rounded-2xl text-black">
            <h3 className="font-black uppercase text-2xl mb-4">
              Le second : faire ce petit pas
            </h3>
            <p className="font-medium text-base leading-relaxed bg-white p-6 rounded-xl border-2 border-black">
              Tu réserves un appel de 30 minutes. Tu poses tes questions. Dans
              quelques semaines, une notification t'annonce ton premier
              paiement.
            </p>
          </div>
        </div>
      </section>

      {/* ========== 10. FAQ ========== */}
      <section className="bg-transparent px-4 py-16 border-t border-white/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight bg-white text-black inline-block px-6 py-3 border-2 border-black rounded-xl">
              Les questions que tu te poses
            </h2>
          </div>
          <div className="card-hard p-4 sm:p-8 bg-white text-black">
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
      <section className="bg-transparent px-4 py-20 text-center border-t border-white/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-snug text-white">
            Dans 4 Mois à 5 Mois, tu seras soit quelqu'un qui a essayé, soit quelqu'un qui
            se demande ce qui serait arrivé.
          </h2>
          <div>
            <Button
              to="/appel-strategique"
              className="px-12 !py-5 text-lg bg-white text-black hover:bg-[#62C58F]"
            >
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
