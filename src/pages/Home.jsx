import { useRef, useEffect, useState } from "react";
import { SITE_CONFIG } from "../config/site.config";
import { CONTENT } from "../config/content";
import Button from "../components/ui/Button";
import SmartVideoPlayer from "../components/ui/SmartVideoPlayer";
import FaqItem from "../components/ui/FaqItem";
import TypeWriter from "../components/ui/TypeWriter";
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  ArrowRight,
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

  const handleFaqToggle = (id) => setOpenFaqId(openFaqId === id ? null : id);

  const benefits = [
    {
      t: "Aucun produit à créer",
      d: "Tu n'as rien à fabriquer. Tu travailles avec des entrepreneurs qui ont déjà une offre. Ton talent, c'est la conversation.",
    },
    {
      t: "100% Sans visage",
      d: "Ton visage reste privé. Tout se passe par écrit, dans les messages privés.",
    },
    {
      t: "Sans audience",
      d: "Tu n'as besoin d'aucun abonné. Pas de compte à faire grossir, pas de danse, pas de mise en scène.",
    },
    {
      t: "Stages rémunérés",
      d: "Génère entre 100 et 200 $ par semaine grâce aux stages d'expérimentation, même sans contrat.",
    },
    {
      t: "Offres quotidiennes",
      d: "Chaque jour, je t’envoie des offres d’entrepreneurs à la recherche de setters.",
    },
    {
      t: "Accompagnement",
      d: "Suivi pas à pas jusqu’à la signature de ton premier contrat avec un entrepreneur.",
    },
  ];

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

  // Tri intelligent : on s'assure que r22 et r20 soient montrées au bon endroit parmi les photos
  const sortedProofs = (() => {
    // Sépare vidéos et photos
    const videos = CONTENT.proofs.filter((p) => p.type.includes("video"));
    const photos = CONTENT.proofs.filter((p) => p.type === "image");

    // Sort r22 et r20 pour les mettre en tête des photos
    const topPhotos = photos
      .filter((p) => p.id === "r22" || p.id === "r20")
      .sort((a, b) => (a.id === "r22" ? -1 : 1));
    const otherPhotos = photos.filter((p) => p.id !== "r22" && p.id !== "r20");

    // Retourne le tableau fusionné : D'abord les vidéos, puis r22/r20, puis le reste
    return [...videos, ...topPhotos, ...otherPhotos];
  })();

  return (
    <main className="w-full bg-transparent text-white">
      {/* ========== 1. HERO ========== */}
      <section className="px-4 pt-16 pb-16 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-8 min-h-[3em] sm:min-h-[2em] flex items-center justify-center text-white">
            <TypeWriter
              text="Avant de fermer cette page, donne-moi quelques minutes."
              speed={38}
              className="inline text-white"
            />
          </h1>

          <div className="card-dark p-6 sm:p-10 text-left max-w-3xl mx-auto mb-10 space-y-6">
            <p className="text-base font-medium text-white/80 leading-relaxed">
              Juste quelques minutes.
            </p>
            <p className="text-base font-medium text-white/80 leading-relaxed">
              Peut-être que tu as déjà payé une formation qui{" "}
              <span className="text-red-400 font-bold">n'a rien changé</span>.
              Peut-être que tu as cessé de croire à toutes ces « opportunités »
              qui défilent sur ton écran. Et peut-être que, au fond, une petite
              voix te répète que ce n'est pas fait pour quelqu'un comme toi.
            </p>

            <p className="font-bold text-xl text-green-400">
              Cette voix se trompe.
            </p>

            <p className="text-base font-medium text-white/80 leading-relaxed">
              Ce que tu vas découvrir ici, c'est une façon de gagner ton premier
              argent en ligne avec ton téléphone et tes messages. Sans produit à
              fabriquer. Sans public à convaincre. Sans jamais montrer ton
              visage.
            </p>

            <p className="font-bold text-sm uppercase tracking-wider text-orange-400 border-l-2 border-orange-400 pl-4 py-1">
              Si ton premier vrai paiement n'est pas encore arrivé, reste
              jusqu'au bout. Cette vidéo a été faite pour toi.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <SmartVideoPlayer
              src={CONTENT.videos.hero.src}
              type={CONTENT.videos.hero.type}
              title={CONTENT.videos.hero.title}
              priority={true}
            />
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <Button to="/appel-strategique" fullWidth className="!py-4">
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 2. STATS MARQUEE ========== */}
      <section className="border-y border-white/10 bg-[#050505]/60 backdrop-blur-md overflow-hidden flex">
        <div className="flex w-max animate-marquee">
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s1-${idx}`}
                className="w-[320px] sm:w-[450px] py-8 px-6 text-center border-r border-white/10 shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex">
            {baseStats.map((s, idx) => (
              <div
                key={`s2-${idx}`}
                className="w-[320px] sm:w-[450px] py-8 px-6 text-center border-r border-white/10 shrink-0 flex flex-col justify-center"
              >
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 3. L'ENGAGEMENT ========== */}
      <section className="px-4 py-24 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-3">
              Mon engagement envers toi
            </p>
          </div>

          <div className="card-dark border-orange-500/40 shadow-[0_0_40px_rgba(249,115,22,0.1)] p-8 sm:p-12 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
              <ShieldCheck size={40} className="text-orange-500 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-orange-400 text-left sm:text-center">
                MON ENGAGEMENT : TA PREMIÈRE COMMISSION EN 27 JOURS, SINON C'EST
                À MOI DE RÉPARER
              </h2>
              <ShieldCheck
                size={40}
                className="text-orange-500 shrink-0 hidden sm:block"
              />
            </div>

            <p className="font-medium text-white/80 leading-relaxed">
              Il y a une peur que je connais par cœur : celle de confier de
              l'argent qu'on a mis du temps à réunir.
            </p>
            <p className="font-medium text-white/80 leading-relaxed">
              Chez nous, cet argent ne tombe pas du ciel. Parfois c'est celui
              d'une mère qui s'est privée. D'un grand frère qui a poussé pour
              toi. De plusieurs mois de petits boulots, de trajets à pied pour
              économiser le transport.
            </p>
            <p className="font-medium text-white/80 leading-relaxed text-red-400">
              Et l'idée de le perdre pour rien te serre la gorge.
            </p>
            <p className="font-medium text-white/80 leading-relaxed">
              Je sais aussi que c'est peut-être déjà arrivé. Un paiement envoyé,
              un lien de groupe reçu, quelques jours d'enthousiasme, puis le
              silence. Des messages qui restent sans réponse. Le sentiment
              d'avoir été utilisé.
            </p>
            <p className="font-medium text-white/80 leading-relaxed">
              Je ne veux pas que ce soit ton histoire avec moi. Alors voici ce
              que je m'engage à faire.
            </p>

            <div className="mt-8 mb-8 space-y-6">
              <div className="border-l-2 border-white/20 pl-4">
                <h3 className="font-bold text-white mb-2">Ta part :</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex gap-2">
                    <ArrowRight size={16} className="shrink-0 mt-0.5" /> Tu
                    rejoins la HIGH–TICKET SETTING SCHOOL
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight size={16} className="shrink-0 mt-0.5" /> Tu suis
                    les étapes pendant 27 jours
                  </li>
                  <li className="flex gap-2">
                    <ArrowRight size={16} className="shrink-0 mt-0.5" /> Tu
                    viens aux appels en direct, tu poses tes questions, tu
                    passes à l'action
                  </li>
                </ul>
              </div>
              <div className="border-l-2 border-orange-500 pl-4">
                <h3 className="font-bold text-orange-400 mb-2">
                  Ma part : si, après ces 27 jours, tu n'as pas touché ta
                  première commission
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  Tu es remboursé en totalité. Pas la moitié. Pas un avoir pour
                  un autre programme. Chaque franc que tu as investi te revient.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-white">
                Pourquoi je prends ce risque ?
              </h3>
              <p className="font-medium text-white/80 leading-relaxed text-sm">
                Parce que je sais ce que c'est d'être l'étudiant fauché qui
                essaie tout : le trading, les ebooks, le freelancing, et qui se
                demande si un jour quelque chose va enfin fonctionner. Je sais
                ce que ça fait quand on compte sur toi et que tu n'as encore
                rien à montrer.
              </p>
              <p className="font-medium text-white/80 leading-relaxed text-sm">
                Je ne veux pas m'enrichir avec l'argent de quelqu'un que je n'ai
                pas su aider. Mon business, je veux le construire sur des vies
                qui changent, pas sur des regrets.
              </p>
              <p className="font-medium text-white/80 leading-relaxed text-sm mt-4">
                Regarde ce qui est réellement en jeu, de chaque côté.
                <br />
                <strong className="text-white">Pour toi :</strong> du temps et
                de l'énergie, si tu choisis de les donner.
                <br />
                <strong className="text-white">Pour moi :</strong> des heures
                d'accompagnement, tes questions auxquelles je réponds, ton
                remboursement. C'est moi qui porte le poids financier de cette
                décision.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center my-8">
              <p className="font-medium text-white/80 mb-2">
                La question qui compte n'est donc plus « Et si j'y perds mon
                argent ? »
              </p>
              <p className="font-bold text-lg sm:text-xl text-white">
                C'est : « Combien me coûte une année de plus exactement comme
                celle-ci ? »
              </p>
            </div>

            <p className="font-medium text-white/80 leading-relaxed text-sm">
              Six mois de plus à répondre « bientôt » quand ta famille te
              demande où tu en es. Six mois de plus à voir d'autres avancer
              pendant que tu restes sur le bord de la route.
            </p>
            <p className="font-medium text-white/80 leading-relaxed text-sm">
              <span className="text-green-400 font-bold">
                Si tu appliques, tu avances vers ta première commission.
              </span>{" "}
              Si malgré ton travail ça ne marche pas, tu es remboursé et je
              reste avec toi. Dans les deux cas, tu n'es plus seul face à ton
              problème.
            </p>

            <div className="text-center pt-8">
              <p className="font-bold text-white mb-6">
                C'est maintenant que ça se joue.
              </p>
              <Button to="/appel-strategique" className="px-12">
                Je réserve mon appel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. IMMOBILE ========== */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)] p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-8">
              <XCircle size={32} className="text-red-500 shrink-0" />
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-red-400">
                Si tu restes immobile
              </h2>
            </div>

            <div className="space-y-6 text-base font-medium text-white/80 leading-relaxed">
              <p>
                Ce soir, tu vas peut-être te dire : « Je regarderai ça plus
                tard. » Tu vas fermer cette vidéo, ouvrir TikTok, laisser filer
                une heure, puis une autre. Demain, ce sera déjà flou. Dans une
                semaine, il n'en restera rien. Et dans six mois, tu tomberas sur
                une autre vidéo comme celle-ci, avec la même boule au ventre, et
                la même vie.
              </p>

              <p>
                Attendre ressemble à de la sagesse. Souvent, c'est juste de la{" "}
                <span className="text-red-400 font-bold">
                  peur qui a trouvé un joli prétexte.
                </span>
              </p>

              <p>
                Pense à ta mère qui te demande, avec douceur, où tu en es. À cet
                ami parti tenter sa chance ailleurs. Aux CV envoyés qui n'ont
                jamais eu de réponse. À ce moment où quelqu'un te demande « et
                toi, tu fais quoi maintenant ? » et où tu cherches une réponse
                qui ne sonne pas comme une excuse.
              </p>

              <p>
                Cette fatigue-là, je la connais. Ce n'est pas de la paresse.
                C'est ce que l'on ressent quand on veut vraiment avancer et que
                rien ne s'ouvre.
              </p>

              <p>
                Et puis il y a ceux qui t'ont déjà fait du mal sans le dire : la
                formation payée puis le silence, le groupe géant où tu n'étais
                qu'un numéro, ceux qui posent devant des voitures louées. Ils
                gagnent quand tu cesses de croire.{" "}
                <strong className="text-white">
                  Ne les laisse pas décider à ta place.
                </strong>
              </p>

              <p>
                Personne ne se sent jamais prêt. Ceux qui avancent n'ont pas
                moins peur que toi. Ils ont juste fini par trouver l'immobilité
                plus lourde à porter que le risque d'essayer.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mt-6">
                <p className="text-sm">
                  Pour commencer, tu n'as rien à payer. Tu réserves un appel de
                  30 minutes : tu poses toutes tes questions, on t'explique
                  comment ça se passe, et c'est seulement après que tu décides,
                  tranquillement.
                </p>
                <p className="mt-2 font-bold text-white text-sm">
                  Une demi-heure pour te faire ta propre idée. Ou six mois de
                  plus à rester dans le doute.
                </p>
              </div>

              <p className="text-sm italic">
                Les personnes que tu verras juste en dessous sont parties du
                même endroit que toi : sans expérience, sans gros capital,
                parfois déjà déçues. Il ne te sépare d'elles qu'un appel de 30
                minutes.
              </p>
            </div>

            <div className="mt-10 text-center">
              <Button to="/appel-strategique" className="px-12">
                Je réserve mon appel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. ACTION ========== */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card-dark border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-8">
              <CheckCircle2 size={32} className="text-green-500 shrink-0" />
              <div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  Si tu passes à l'action
                </h2>
                <h3 className="text-lg font-bold text-green-400 mt-1">
                  Le DM Setting, c'est quoi ?
                </h3>
              </div>
            </div>

            <div className="space-y-6 text-base font-medium text-white/80 leading-relaxed">
              <p>
                Chaque jour, des entrepreneurs reçoivent des messages de
                personnes intéressées par leur offre, sur Instagram, TikTok ou
                WhatsApp. Beaucoup n'ont ni le temps ni la méthode pour leur
                répondre, et perdent des ventes sans le savoir.
              </p>

              <p>
                <span className="text-green-400 font-bold">
                  Le setter, c'est toi.
                </span>{" "}
                Tu discutes avec ces personnes, tu comprends ce qu'elles
                cherchent vraiment, et tu les accompagnes jusqu'à la décision
                d'achat. Pour chaque vente que tu déclenches, tu touches une
                commission. Tu gagnes de l'argent en écrivant des messages.
              </p>

              <p>
                Tu n'as rien à fabriquer. Tu travailles avec des entrepreneurs
                qui ont déjà une offre. Ton talent, c'est la conversation.
              </p>

              <p>
                Ton visage reste privé. Tout se passe par écrit, dans les
                messages privés.
              </p>

              <p>
                Tu n'as besoin d'aucun abonné. Pas de compte à faire grossir,
                pas de danse, pas de mise en scène.
              </p>

              <p>Un téléphone et une connexion suffisent pour commencer.</p>

              <p>
                Ça peut aller vite. Certains de mes élèves ont obtenu leur
                premier CONTRAT{" "}
                <strong className="text-white">en 7 JOURS</strong> après la fin
                de leur formation.
              </p>

              <p>
                Et tu n’as pas besoin d’attendre de décrocher ton premier
                contrat pour commencer à gagner de l’argent : grâce aux stages
                d’expérimentation de l’académie, tu peux générer entre{" "}
                <strong className="text-green-400">
                  100 et 200 $ par semaine
                </strong>
                .
              </p>

              <p>
                Et tu seras accompagné dans ta progression jusqu’à la signature
                de ton premier contrat avec un entrepreneur.
              </p>

              <div className="border-l-2 border-green-500 pl-4 my-6">
                <p className="italic text-white/90">
                  Imagine ce moment : ton téléphone vibre. Une notification. Une
                  commission, gagnée avec tes propres mots, sans l'avoir
                  demandée à personne. Tu peux enfin aider à la maison, t'offrir
                  quelque chose sans compter, et dire à ta famille :{" "}
                  <strong className="text-white">
                    « Ça, c'est moi qui l'ai fait. »
                  </strong>
                </p>
              </div>

              <p>
                Ce moment n'est pas réservé aux autres. Moi aussi je suis parti
                de très bas, sans argent et sans réponses, et c'est en
                découvrant le Setting que mes premières commissions sont
                arrivées. Aujourd'hui, je travaille avec plusieurs entrepreneurs
                grâce à cette seule compétence.
              </p>

              <p className="font-bold text-white text-center mt-6">
                Ce qu'on te demande : suivre les étapes, poser tes questions,
                venir aux appels. Le reste, on le construit ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ========== 6. OFFRES DU JOUR (Grand Cadre + Format Vidéo Entier) ========== */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-white">
            JE T’ENVOIE DES OFFRES CHAQUE JOUR
          </h2>

          <p className="font-medium text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Tu n’auras pas besoin de chercher les opportunités seul. Chaque
            jour, je t’envoie des offres d’entrepreneurs à la recherche de
            setters.
            <br />
            <br />
            Ton seul travail sera alors de postuler aux offres qui
            t’intéressent.
            <br />
            <br />
            <strong className="text-white text-xl">VOICI UN APERÇU :</strong>
          </p>

          {/* GRAND CADRE LARGE QUI CONTIENT LA VIDÉO SANS LA COUPER */}
          <div className="card-dark p-4 sm:p-8 max-w-3xl mx-auto">
            <SmartVideoPlayer
              src={CONTENT.videos.dailyOffer.src}
              type={CONTENT.videos.dailyOffer.type}
              title={CONTENT.videos.dailyOffer.title}
            />
          </div>
        </div>
      </section>

      {/* ========== 7. CE QUE TU REÇOIS ========== */}
      <section className="py-16 overflow-hidden">
        <div className="w-full">
          <div className="text-center mb-10 px-4">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Ce que tu reçois
            </h2>
          </div>
          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 py-6 px-4 sm:px-8 snap-x snap-mandatory scrollbar-hide w-full"
            >
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="card-dark min-w-[280px] sm:min-w-[320px] max-w-[320px] p-6 snap-center flex-shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center font-black text-white mb-6">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-3 text-white">
                      {b.t}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-white/60 leading-relaxed">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 relative z-10">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ========== 8. TÉMOIGNAGES (HORIZONTALES + MASONRY) ========== */}
      <section className="px-4 py-20 bg-[#050505]/40 border-y border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4 text-white">
              Témoignages
            </h2>
            <p className="text-lg font-bold text-white/60">
              Ils ont commencé exactement là où tu es
            </p>
          </div>

          {/* RANGÉE DE VIDÉOS STRICTEMENT HORIZONTALES (flex-nowrap) */}
          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 px-1 snap-x snap-mandatory scrollbar-hide mb-12">
            {CONTENT.proofs
              .filter(
                (p) => p.type === "video-file" || p.type === "video-youtube",
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="card-dark overflow-hidden snap-start shrink-0 w-[280px] sm:w-[320px] p-0"
                >
                  <SmartVideoPlayer
                    src={item.src}
                    type={item.type === "video-youtube" ? "youtube" : "file"}
                    title={item.title}
                  />
                </div>
              ))}
          </div>

          {/* GRILLE DES PHOTOS (r22, r20 puis le reste) */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
            {sortedProofs
              .filter((p) => p.type === "image")
              .map((item) => (
                <div
                  key={item.id}
                  className="card-dark break-inside-avoid overflow-hidden mb-5 p-0 border-white/5"
                >
                  <img
                    src={item.src}
                    alt="Témoignage"
                    className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Button to="/appel-strategique" className="px-12">
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>

      {/* ========== 9. DEUX CHEMINS ========== */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 text-center text-white">
            Deux chemins devant toi
          </h2>
          <p className="font-medium text-white/70 text-center mb-10 text-lg">
            Si tu es arrivé jusqu'ici, c'est peut-être que quelque chose en toi
            refuse de s'éteindre.
            <br /> Alors regarde honnêtement. Il n'y a que deux chemins.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-dark border-red-500/20 p-8">
              <h3 className="font-bold text-xl mb-4 text-red-400">
                Le premier : tout laisser comme avant
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Tu fermes cette page. Tu te promets d'y repenser, et tu
                continues de vivre comme hier : à attendre une réponse, un
                contact, un coup de chance.
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Un an passe. Tu es toujours au même endroit, un peu plus
                fatigué, un peu plus silencieux quand on te demande des
                nouvelles. Et tu regardes quelqu'un d'autre vivre ce que tu
                espérais, en te demandant ce qui aurait changé si tu avais osé.
              </p>
            </div>

            <div className="card-dark border-green-500/20 p-8">
              <h3 className="font-bold text-xl mb-4 text-green-400">
                Le second : faire ce petit pas
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Tu décides que tu mérites au moins de savoir. Tu réserves un
                appel de 30 minutes. Tu poses toutes tes questions, même celles
                qui te gênent.
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Et si tu continues, dans quelques semaines, tu ouvres ton
                téléphone et une notification t'annonce ton premier paiement.
                Ton premier vrai gain, venu de toi seul, qui ne passe par aucun
                patron, aucun diplôme, aucune faveur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 10. FAQ ========== */}
      <section className="px-4 py-16 border-t border-white/10 bg-[#050505]/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Les questions que tu te poses
            </h2>
          </div>
          <div className="card-dark p-2 sm:p-4">
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
      <section className="px-4 py-24 text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Dans 3 à 4 mois, tu seras soit quelqu'un qui a essayé, soit
            quelqu'un qui se demande ce qui serait arrivé.
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-blue-400">
            Choisis d'essayer.
          </p>
          <div className="pt-4">
            <Button to="/appel-strategique" className="px-12">
              Je réserve mon appel
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
