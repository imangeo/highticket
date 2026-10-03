import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Loader2, VideoOff } from "lucide-react";

const VIDEO_PLAY_EVENT = "smart-video-play";

export default function SmartVideoPlayer({
  src,
  title = "Vidéo",
  type = "file",
  priority = false, // true uniquement pour la vidéo du Hero
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const uniqueId = useRef(Math.random().toString(36).slice(2));

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const storageKey = `video_progress_${src}`;
  const isSrcInvalid = !src || src.trim() === "";

  // 1. Vérification de la reprise dans la session
  useEffect(() => {
    if (type !== "file" || isSrcInvalid) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsedTime = parseFloat(saved);
      if (parsedTime > 3) {
        setSavedTime(parsedTime);
        setShowPrompt(true);
      }
    }
  }, [src, type, storageKey, isSrcInvalid]);

  // 2. Gestion de l'arrêt des AUTRES vidéos quand celle-ci joue
  useEffect(() => {
    const handleOtherVideoPlay = (event) => {
      if (event.detail?.id !== uniqueId.current) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      }
    };
    window.addEventListener(VIDEO_PLAY_EVENT, handleOtherVideoPlay);
    return () =>
      window.removeEventListener(VIDEO_PLAY_EVENT, handleOtherVideoPlay);
  }, []);

  // 3. Pause automatique au scroll si hors de l'écran
  useEffect(() => {
    if (type !== "file" || !videoRef.current || isSrcInvalid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting &&
          videoRef.current &&
          !videoRef.current.paused
        ) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [type, isSrcInvalid]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    if (currentTime > 2 && currentTime < videoRef.current.duration - 2) {
      localStorage.setItem(storageKey, currentTime.toString());
    }
  };

  const handleResume = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = savedTime;
      videoRef.current.play().catch(() => {});
      setHasStarted(true);
    }
    setShowPrompt(false);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setHasStarted(true);
    }
    localStorage.removeItem(storageKey);
    setShowPrompt(false);
  };

  const handleVideoPlay = () => {
    setHasStarted(true);
    window.dispatchEvent(
      new CustomEvent(VIDEO_PLAY_EVENT, { detail: { id: uniqueId.current } }),
    );
  };

  // YouTube Embed
  if (type === "youtube") {
    return (
      <div className="card-dark overflow-hidden aspect-video w-full">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Fichier invalide / absent
  if (isSrcInvalid || hasError) {
    return (
      <div className="card-dark aspect-video flex flex-col items-center justify-center p-4 text-center bg-black/60">
        <div className="w-12 h-12 bg-white/5 text-white/40 rounded-full flex items-center justify-center mb-3 border border-white/10">
          <VideoOff size={24} />
        </div>
        <p className="font-bold text-xs sm:text-sm text-white/50 uppercase tracking-widest">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative card-dark overflow-hidden w-full bg-black min-h-[200px] flex items-center justify-center"
    >
      {/* LOADER SEUL : Affiche un Spinner propre pendant le buffering */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-20 text-white backdrop-blur-sm">
          <Loader2
            className="animate-spin text-blue-400 mb-2"
            size={36}
            strokeWidth={2.5}
          />
          <p className="font-bold text-xs tracking-widest uppercase text-white/80">
            Chargement de la vidéo...
          </p>
        </div>
      )}

      {/* OVERLAY DE REPRISE */}
      {showPrompt && (
        <div className="absolute inset-0 bg-[#001d3d]/95 flex flex-col items-center justify-center z-30 p-4 text-center">
          <p className="text-white font-bold text-sm sm:text-base mb-4 leading-snug px-2">
            Reprendre là où tu t'étais arrêté ?
          </p>
          <div className="flex flex-col gap-3 w-full max-w-[200px] justify-center">
            <button
              onClick={handleResume}
              className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-full px-4 py-2.5 text-white hover:bg-white/10 transition-colors font-medium text-xs sm:text-sm"
            >
              <Play size={16} fill="currentColor" />
              <span>Continuer</span>
            </button>
            <button
              onClick={handleRestart}
              className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-full px-4 py-2.5 text-white hover:bg-white/10 transition-colors font-medium text-xs sm:text-sm"
            >
              <RotateCcw size={16} />
              <span>Recommencer</span>
            </button>
          </div>
        </div>
      )}

      {/* BALISE VIDÉO OPTIMISÉE POUR LE WEB */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto max-h-[80vh] object-contain bg-black"
        controls
        playsInline
        /*
          CRUCIAL POUR LA VITESSE :
          - 'metadata' uniquement pour le Hero (priority=true)
          - 'none' pour toutes les autres vidéos (charge uniquement quand l'utilisateur appuie sur Play)
        */
        preload={priority ? "metadata" : "none"}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handleVideoPlay}
      />
    </div>
  );
}
