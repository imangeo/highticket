import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group outline-none"
      >
        <span className="font-bold text-base sm:text-lg text-white/90 group-hover:text-blue-400 transition-colors pr-2">
          {question}
        </span>
        <ChevronDown
          size={22}
          className={`shrink-0 text-white/50 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-400" : ""
          }`}
        />
      </button>

      {/* 
        Nouvelle animation Grid : empêche le texte d'être coupé sur mobile 
        et s'adapte parfaitement à la longueur de ta réponse.
      */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-white/70 font-medium text-sm sm:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
