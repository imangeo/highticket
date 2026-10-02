import React from "react";
import { GridScan } from "./GridScan";

export default function GlobalGridScan() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] overflow-hidden pointer-events-none">
      <GridScan
        lineThickness={1.5}
        gridScale={0.12}
        linesColor="#1e293b" /* Lignes de grille sombres et fines */
        scanColor="#00ff88" /* Laser Vert Néon très lumineux */
        scanOpacity={0.9}
        scanDuration={2.2}
        scanGlow={0.8}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Légère vignette pour concentrer l'œil au centre */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
