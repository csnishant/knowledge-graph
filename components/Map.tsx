"use client";
import React from "react";
import { MiniMap } from "@xyflow/react";

const Map = () => {
  return (
    <div className="hidden md:block group">
      {/* Container with Neon Glow and Glassmorphism */}
      <div className="absolute bottom-8 right-8 p-[1px] rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-transparent shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:from-indigo-500/40">
        {/* Scan-line Animation Effect (Optional) */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none opacity-20">
          <div className="w-full h-[2px] bg-indigo-400 animate-[scan_3s_linear_infinite]" />
        </div>

        <MiniMap
          zoomable
          pannable
          // Professional Dark UI Classes
          className="!bg-slate-950/90 !backdrop-blur-2xl !border-white/5 !rounded-[2rem] !m-0 !w-64 !h-44 !shadow-inner overflow-hidden"
          // Nodes Styling: Glowing Dots effect
          nodeColor={(node) => {
            if (node.selected) return "#fbbf24"; // Gold for selected
            if (node.type === "custom") return "#6366f1"; // Indigo for custom
            return "#475569";
          }}
          // Mask Styling: The area outside the current view
          maskColor="rgba(2, 6, 23, 0.8)"
          maskStrokeColor="rgba(99, 102, 241, 0.3)"
          maskStrokeWidth={2}
          nodeBorderRadius={20} // Makes nodes look like circular pips
          nodeStrokeWidth={0}
        />

        {/* Floating Label / Status Indicator */}
        <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[10px] font-bold text-indigo-300/70 uppercase tracking-[0.2em]">
            System Radar
          </span>
        </div>
      </div>

      {/* Adding custom Scan animation to Global CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes scan {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(400%);
          }
        }
      `}</style>
    </div>
  );
};

export default Map;
