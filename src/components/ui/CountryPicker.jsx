import { useState, useRef, useEffect } from "react";
import { defaultCountries, parseCountry } from "react-international-phone";
import { Search, ChevronDown, X } from "lucide-react";

// Fonction utilitaire pour transformer un code ISO (ex: FR) en Emoji Drapeau officiel
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Génération dynamique de la liste de tous les pays à partir de la bibliothèque
const ALL_COUNTRIES = defaultCountries.map((c) => {
  const parsed = parseCountry(c);
  return {
    code: parsed.iso2.toUpperCase(),
    name: parsed.name,
    dial: `+${parsed.dialCode}`,
    flag: getFlagEmoji(parsed.iso2),
  };
});

export default function CountryPicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Recherche filtrée dynamique
  const filtered = ALL_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Bouton Principal */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white border-3 border-ink rounded-2xl px-4 py-4 flex items-center justify-between font-bold text-ink hover:bg-cream/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-xl">{selected.flag}</span>
          <span className="text-sm truncate max-w-[180px] sm:max-w-xs">
            {selected.name}
          </span>
          <span className="text-ink/50 text-sm">({selected.dial})</span>
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2.5}
          className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu Déroulant */}
      {open && (
        <div className="absolute top-full mt-2 w-full bg-white border-3 border-ink rounded-2xl shadow-hard z-50 overflow-hidden">
          {/* Moteur de recherche */}
          <div className="p-3 border-b-3 border-ink bg-cream/50 flex items-center gap-2">
            <Search size={18} strokeWidth={2.5} className="text-ink/50" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pays ou indicatif..."
              className="flex-1 bg-transparent outline-none font-bold text-sm placeholder:text-ink/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-ink/50 hover:text-ink"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Liste dynamique */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onSelect(c);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-sky/30 transition-colors ${
                    selected.code === c.code ? "bg-sky/50" : ""
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-xl">{c.flag}</span>
                    <span className="font-bold text-sm truncate">{c.name}</span>
                  </span>
                  <span className="text-xs font-black text-ink/60 shrink-0">
                    {c.dial}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-sm font-bold text-ink/40">
                Aucun pays trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { ALL_COUNTRIES };
