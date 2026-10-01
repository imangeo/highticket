import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b-3 border-ink last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="font-black text-base sm:text-lg uppercase tracking-tight pr-2">
          {question}
        </span>
        <ChevronDown
          size={22}
          strokeWidth={2.5}
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-ink/70 font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
