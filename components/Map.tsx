"use client";
import React from "react";
import { MiniMap } from "@xyflow/react";

const Map = () => {
  return (
    <div className="group">
      {/* Responsive Positioning:
        Mobile: bottom-6 right-6 (Kone se thoda andar aur upar)
        Desktop: md:bottom-10 md:right-10 
      */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 p-[1.5px] rounded-[1.2rem] md:rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-transparent to-indigo-500/10 shadow-[0_10px_40px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:from-indigo-500/50 z-[999]">
        {/* Scan-line Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-[1.2rem] md:rounded-[2rem] pointer-events-none opacity-30">
          <div className="w-full h-[3px] bg-indigo-400/50 animate-[scan_4s_linear_infinite]" />
        </div>

        <MiniMap
          zoomable
          pannable
          /* Mobile Size: !w-36 !h-28 (Balanced size for thumbs)
            Desktop Size: md:!w-64 md:!h-44 
          */
          className="!bg-slate-950/95 !backdrop-blur-3xl !border-white/10 !rounded-[1.2rem] md:!rounded-[2rem] !m-0 !w-36 !h-28 md:!w-64 md:!h-44 !shadow-inner overflow-hidden"
          nodeColor={(node) => {
            if (node.selected) return "#fbbf24";
            const nodeColor = (node.data as any)?.color;
            // Aapke custom node colors ke saath sync:
            const colors: Record<string, string> = {
              blue: "#3b82f6",
              purple: "#a855f7",
              emerald: "#10b981",
              rose: "#f43f5e",
            };
            return colors[nodeColor] || "#6366f1";
          }}
          maskColor="rgba(2, 6, 23, 0.85)"
          maskStrokeColor="rgba(99, 102, 241, 0.4)"
          maskStrokeWidth={2}
          nodeBorderRadius={20}
          nodeStrokeWidth={0}
        />

        {/* Status Badge */}
        <div className="absolute top-2 left-3 md:top-4 md:left-6 flex items-center gap-1.5 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1] animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-black text-indigo-300/80 uppercase tracking-[0.15em] drop-shadow-md">
            Radar_v2
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(-110%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(350%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Map;
