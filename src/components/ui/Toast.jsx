import { CheckCircle2 } from "lucide-react";

export default function Toast({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-[toastIn_0.35s_ease-out]">
      <div className="card-hard bg-mint px-5 py-4 flex items-center gap-3 shadow-hard min-w-[280px] max-w-[90vw]">
        <div className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center shrink-0 border-3 border-ink">
          <CheckCircle2 size={22} strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <p className="font-black uppercase text-sm tracking-tight">
            Enregistré
          </p>
          <p className="text-xs font-medium text-ink/70 mt-0.5">
            {message || "Merci ! Je vous contacte dès que possible."}
          </p>
        </div>
      </div>
    </div>
  );
}
