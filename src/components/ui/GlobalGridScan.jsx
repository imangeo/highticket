import React from "react";
import { GridScan } from "./GridScan";

export default function GlobalGridScan() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-cream overflow-hidden pointer-events-none">
      <GridScan
        lineThickness={2.0}
        gridScale={0.12}
        linesColor="#0f0f0f"
        scanColor="#1D5B3E"
        scanOpacity={0.9}
        scanDuration={2.2}
        scanGlow={0.8}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Léger voile crème à 15% pour laisser briller le scan */}
      <div className="absolute inset-0 bg-cream/15 pointer-events-none" />
    </div>
  );
}
