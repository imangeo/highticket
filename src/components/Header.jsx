import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site.config";
import Button from "./ui/Button";

export default function Header() {
  // Fonction pour remonter en haut de la page au clic
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/70 backdrop-blur-md border-b-3 border-ink py-3 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-black text-sm sm:text-lg uppercase tracking-tight hover:opacity-70 transition-opacity"
        >
          {SITE_CONFIG.schoolName}
        </Link>
        <Button
          to="/appel-strategique"
          className="!px-5 !py-2.5 !text-sm !shadow-none"
        >
          Réserver
        </Button>
      </div>
    </header>
  );
}
