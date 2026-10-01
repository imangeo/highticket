import { Play } from "lucide-react";

/**
 * media = { type: "youtube"|"file"|"image", src, title?, alt?, caption? }
 */
export default function Media({ media, className = "" }) {
  if (!media || !media.src) {
    return (
      <div
        className={`card-hard aspect-video flex flex-col items-center justify-center bg-sky/30 p-6 text-center ${className}`}
      >
        <div className="w-14 h-14 bg-ink text-white rounded-full flex items-center justify-center mb-3 border-3 border-ink">
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </div>
        <p className="font-black text-sm uppercase">
          {media?.title || media?.alt || "Média à ajouter"}
        </p>
        <p className="text-xs text-ink/40 mt-1">content.js → src vide</p>
      </div>
    );
  }

  if (media.type === "youtube") {
    return (
      <div
        className={`card-hard overflow-hidden aspect-video bg-ink ${className}`}
      >
        <iframe
          src={media.src}
          title={media.title || "Vidéo"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (media.type === "file") {
    return (
      <div
        className={`card-hard overflow-hidden aspect-video bg-ink ${className}`}
      >
        <video
          src={media.src}
          controls
          playsInline
          className="w-full h-full object-cover"
          title={media.title}
        />
      </div>
    );
  }

  if (media.type === "image") {
    return (
      <figure className={`card-hard overflow-hidden ${className}`}>
        <img
          src={media.src}
          alt={media.alt || ""}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        {media.caption && (
          <figcaption className="p-3 text-xs font-bold uppercase tracking-widest text-ink/50 border-t-3 border-ink">
            {media.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
