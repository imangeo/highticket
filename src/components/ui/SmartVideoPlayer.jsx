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
      new CustomEvent(VIDEO_PLAY_EVENT, { detail: { id: uniqueId.current } }),
    );
  };

  if (type === "youtube") {
    return (
      <div className="card-dark overflow-hidden aspect-video w-full">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    );
  }

  if (isSrcInvalid || hasError) {
    return (
      <div className="card-dark aspect-video flex flex-col items-center justify-center p-4 text-center">
        <div className="w-12 h-12 bg-white/5 text-white/50 rounded-full flex items-center justify-center mb-3 border border-white/10">
          <VideoOff size={24} />
        </div>
        <p className="font-bold text-sm sm:text-base text-white/70">
          VIDÉO INDISPONIBLE
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative card-dark overflow-hidden w-full bg-black"
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 text-white">
          <Loader2 className="animate-spin mb-3" size={36} />
          <p className="font-bold text-xs tracking-widest uppercase">
            Chargement...
          </p>
        </div>
      )}

      {/* OVERLAY NETTOYÉ ET RESPONSIVE */}
      {showPrompt && (
        <div className="absolute inset-0 bg-[#001d3d]/95 flex flex-col items-center justify-center z-30 p-4 text-center overflow-y-auto">
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

      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto max-h-[80vh] object-contain bg-black"
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
