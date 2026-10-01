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
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const storageKey = `video_progress_${src}`;
  const isSrcInvalid = !src || src.trim() === "";

  useEffect(() => {
    if (type !== "file" || isSrcInvalid) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setHasError(false);

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsedTime = parseFloat(saved);
      if (parsedTime > 3) {
        setSavedTime(parsedTime);
        setShowPrompt(true);
      }
    }
  }, [src, type, storageKey, isSrcInvalid]);

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

  useEffect(() => {
    if (type !== "file" || !videoRef.current || isSrcInvalid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!entry.isIntersecting) {
          if (video && !video.paused) video.pause();
        }
      },
      { threshold: 0.4 },
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
      setIsManuallyPaused(false);
    }
    setShowPrompt(false);
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setHasStarted(true);
      setIsManuallyPaused(false);
    }
    localStorage.removeItem(storageKey);
    setShowPrompt(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleVideoPlay = () => {
    setHasStarted(true);
    setIsManuallyPaused(false);
    window.dispatchEvent(
      new CustomEvent(VIDEO_PLAY_EVENT, {
        detail: { id: uniqueId.current },
      }),
    );
  };

  if (type === "youtube") {
    return (
      <div className="card-hard overflow-hidden aspect-video bg-ink w-full">
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

  if (isSrcInvalid || hasError) {
    return (
      <div className="card-hard aspect-video flex flex-col items-center justify-center bg-sky/30 p-4 text-center border-3 border-ink">
        <div className="w-12 h-12 bg-white text-ink rounded-full flex items-center justify-center mb-3 border-3 border-ink">
          <VideoOff size={24} strokeWidth={2.5} />
        </div>
        <p className="font-black text-sm sm:text-base uppercase tracking-tight">
          {title}
        </p>
        <p className="text-[10px] text-ink/50 mt-1 font-bold">
          [Contenu à venir]
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative card-hard overflow-hidden bg-ink w-full"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-cream flex flex-col items-center justify-center z-20 text-ink">
          <Loader2 className="animate-spin mb-3" size={36} strokeWidth={3} />
          <p className="font-black uppercase text-xs tracking-tight">
            Chargement...
          </p>
        </div>
      )}

      {/* OVERLAY CORRIGÉ : Responsive, empilé verticalement et sans débordement */}
      {showPrompt && (
        <div className="absolute inset-0 bg-ink/95 flex flex-col items-center justify-center z-30 p-4 text-center overflow-y-auto">
          <p className="text-white font-black uppercase text-sm sm:text-base tracking-tight mb-4 px-2 leading-snug">
            Reprendre là où tu t'étais arrêté ?
          </p>

          {/* flex-col force les boutons l'un sous l'autre. max-w-[200px] évite qu'ils touchent les bords */}
          <div className="flex flex-col gap-3 w-full max-w-[200px]">
            <button
              onClick={handleResume}
              className="w-full btn-hard bg-mint text-ink hover:bg-white !py-2.5 !px-3 font-black text-xs flex items-center justify-center gap-2"
            >
              <Play size={16} fill="currentColor" />
              <span>Continuer</span>
            </button>

            <button
              onClick={handleRestart}
              className="w-full btn-hard bg-blush text-ink hover:bg-white !py-2.5 !px-3 font-black text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Recommencer</span>
            </button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto max-h-[80vh] object-contain bg-ink"
        controls
        playsInline
        preload="metadata"
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onError={handleVideoError}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handleVideoPlay}
        onPause={() => setIsManuallyPaused(true)}
      />
    </div>
  );
}
