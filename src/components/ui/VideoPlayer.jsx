import { Play } from "lucide-react";

export default function VideoPlayer({ url, placeholderTitle = "Vidéo" }) {
  if (url?.trim()) {
    return (
      <div className="card-hard overflow-hidden aspect-video bg-ink">
        <iframe
          src={url}
          title={placeholderTitle}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="card-hard aspect-video flex flex-col items-center justify-center bg-sky/40 p-6 text-center cursor-pointer group">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-ink text-white rounded-full flex items-center justify-center mb-4 border-3 border-ink group-hover:scale-105 transition-transform">
        <Play size={28} fill="currentColor" className="ml-1" />
      </div>
      <p className="font-black text-lg uppercase tracking-tight">
        {placeholderTitle}
      </p>
      <p className="text-sm text-ink/50 mt-1">
        [Insérer l’URL dans site.config.js]
      </p>
    </div>
  );
}
