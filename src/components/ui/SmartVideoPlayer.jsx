import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Loader2, VideoOff } from "lucide-react";

const VIDEO_PLAY_EVENT = "smart-video-play";

export default function SmartVideoPlayer({
  src,
  title = "Vidéo",
  type = "file",
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const uniqueId = useRef(Math.random().toString(36).slice(2));

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [savedTime, setSavedTime] = useState(0);

  const storageKey = `video_progress_${src}`;
  const isSrcInvalid = !src || src.trim() === "";

  // ASTUCE MOBILE :
  // 1) On ajoute #t=0.001 pour forcer iOS Safari & Android Chrome à afficher la 1ère image au scroll
  const videoSrcWithTime =
    src && type === "file" && !src.includes("#t=") ? `${src}#t=0.001` : src;

  // 2) Génération automatique d'une image miniature (.jpg) si la vidéo provient de Cloudinary
  const autoCloudinaryPoster = src?.includes("cloudinary.com")
    ? src.replace(/\.(mp4|mov|webm)(\?.*)?$/i, ".jpg")
    : undefined;

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

  // Met en pause les AUTRES vidéos quand celle-ci joue
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

  // Pause automatique au scroll
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
    }
    setShowPrompt(false);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    localStorage.removeItem(storageKey);
    setShowPrompt(false);
  };

  const handleVideoPlay = () => {
    setIsLoading(false);
    window.dispatchEvent(
      new CustomEvent(VIDEO_PLAY_EVENT, { detail: { id: uniqueId.current } }),
    );
  };

  if (type === "youtube") {
    return (
      <div className="card-dark overflow-hidden aspect-video w-full bg-black relative">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </div>
    );
  }

  if (isSrcInvalid || hasError) {
    return (
      <div className="card-dark aspect-[9/16] max-h-[480px] flex flex-col items-center justify-center p-4 text-center bg-black/80 w-full">
        <VideoOff size={28} className="text-white/30 mb-2" />
        <p className="font-bold text-xs text-white/40 uppercase tracking-widest">
          {title}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative card-dark overflow-hidden w-full bg-black flex items-center justify-center aspect-[9/16] max-h-[70vh]"
    >
      {/* SPINNER UNIQUE DE CHARGEMENT */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20 pointer-events-none">
          <Loader2
            className="animate-spin text-white"
            size={32}
            strokeWidth={2.5}
          />
        </div>
      )}

      {/* OVERLAY DE REPRISE */}
      {showPrompt && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-30 p-4 text-center">
          <p className="text-white font-bold text-sm mb-4 leading-snug">
            Reprendre la vidéo ?
          </p>
          <div className="flex flex-col gap-2.5 w-full max-w-[180px]">
            <button
              onClick={handleResume}
              className="w-full flex items-center justify-center gap-2 border border-white/30 bg-white/10 rounded-full px-3 py-2 text-white font-bold text-xs hover:bg-white/20 transition-colors"
            >
              <Play size={14} fill="currentColor" />
              <span>Continuer</span>
            </button>
            <button
              onClick={handleRestart}
              className="w-full flex items-center justify-center gap-2 border border-white/30 rounded-full px-3 py-2 text-white/70 font-bold text-xs hover:bg-white/10 transition-colors"
            >
              <RotateCcw size={14} />
              <span>Recommencer</span>
            </button>
          </div>
        </div>
      )}

      {/* BALISE VIDÉO OPTIMISÉE MOBILE */}
      <video
        ref={videoRef}
        src={videoSrcWithTime}
        poster={autoCloudinaryPoster}
        className="w-full h-full object-cover bg-black block"
        controls
        playsInline
        preload="metadata"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
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
