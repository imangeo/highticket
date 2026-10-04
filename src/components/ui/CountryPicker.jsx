import { useState, useRef, useEffect } from "react";
import { defaultCountries, parseCountry } from "react-international-phone";
import { Search, ChevronDown, X } from "lucide-react";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

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

  const filtered = ALL_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Bouton Principal - Dark Mode */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-black/40 border border-white/30 rounded-xl px-4 py-3 flex items-center justify-between font-bold text-white hover:bg-white/10 transition-colors shadow-inner outline-none focus:border-white/80"
      >
        <span className="flex items-center gap-2">
          <span className="text-xl">{selected.flag}</span>
          <span className="text-sm truncate max-w-[180px] sm:max-w-xs">
            {selected.name}
          </span>
          <span className="text-white/50 text-sm">({selected.dial})</span>
        </span>
        <ChevronDown
          size={20}
          strokeWidth={2.5}
          className={`transition-transform shrink-0 text-white/50 ${open ? "rotate-180 text-white" : ""}`}
        />
      </button>

      {/* Menu Déroulant - Dark Mode */}
      {open && (
        <div className="absolute top-full mt-2 w-full bg-[#111111] border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
          {/* Moteur de recherche */}
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
            <Search size={18} className="text-white/50" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pays..."
              className="flex-1 bg-transparent outline-none font-medium text-sm text-white placeholder:text-white/30"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-white/50 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Liste dynamique */}
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
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
                  className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                    selected.code === c.code ? "bg-white/15" : ""
                  }`}
                >
                  <span className="flex items-center gap-3 truncate">
                    <span className="text-xl">{c.flag}</span>
                    <span className="font-bold text-sm text-white/90 truncate">
                      {c.name}
                    </span>
                  </span>
                  <span className="text-xs font-black text-white/50 shrink-0">
                    {c.dial}
                  </span>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-sm font-bold text-white/40">
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
