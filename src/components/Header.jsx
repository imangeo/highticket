import { Link, useLocation } from "react-router-dom";
import Button from "./ui/Button";

export default function Header() {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Nom de l'école */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-bold text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-tight text-white hover:opacity-80 transition-opacity truncate"
        >
          H-T SETTING SCHOOL
        </Link>

        {/* Bouton connecté à la logique Toast */}
        <Button
          to="/appel-strategique"
          className="!px-3.5 !py-2 sm:!px-5 sm:!py-2.5 !text-xs sm:!text-sm shrink-0 whitespace-nowrap"
        >
          Je réserve mon appel
        </Button>
      </div>
    </header>
  );
}
