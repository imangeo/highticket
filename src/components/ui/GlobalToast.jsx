import { useState, useEffect } from "react";
import { Info } from "lucide-react";

export default function GlobalToast() {
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    let timer;
    const handler = (e) => {
      setToast({ show: true, message: e.detail.message });
      clearTimeout(timer);
      timer = setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };
    window.addEventListener("show-info-toast", handler);
    return () => window.removeEventListener("show-info-toast", handler);
  }, []);

  if (!toast.show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-[toastIn_0.35s_ease-out]">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl px-5 py-4 flex items-center gap-3 border border-[#006bb3]/50 rounded-2xl shadow-[0_0_30px_rgba(0,107,179,0.3)] min-w-[280px] max-w-[90vw]">
        <div className="w-10 h-10 rounded-full bg-[#006bb3] text-white flex items-center justify-center shrink-0 border border-white/20">
          <Info size={22} strokeWidth={2.5} />
        </div>
        <div className="text-left text-white">
          <p className="font-bold uppercase text-xs tracking-wider text-[#006bb3]">
            Information
          </p>
          <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
}
