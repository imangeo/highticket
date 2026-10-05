import { SITE_CONFIG } from "../config/site.config";

export default function Footer() {
  return (
    <footer className="w-full border-t-3 border-ink bg-cream/70 backdrop-blur-md py-10 px-4 flex flex-col items-center justify-center">
      <p className="font-black uppercase text-sm tracking-tight mb-2">
        {SITE_CONFIG.schoolName}
      </p>
      <p className="text-xs text-ink/50 font-medium mb-6">
        © {new Date().getFullYear()} — Tous droits réservés.
      </p>
    </footer>
  );
}
