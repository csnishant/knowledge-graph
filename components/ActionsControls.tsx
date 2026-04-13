"use client";
import React from "react";
import { Controls, Panel } from "@xyflow/react";

const ActionControls = () => {
  return (
    // 'bottom-right' ka use karenge taaki Map ke paas rahe, 
    // aur margins se position adjust karenge
    <Panel position="top-right" className="!m-29 sm:!m- flex items-end gap-3 pointer-events-none">
      
      {/* 1. Action Controls (Left of Map) */}
      <div className="group relative pointer-events-auto">
        {/* Glow Background */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />

        {/* Main Box */}
        <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-1 shadow-2xl flex flex-row sm:flex-col gap-1">
          <Controls
            showInteractive={false}
            className="!static !flex !flex-row sm:!flex-col !bg-transparent !border-none !shadow-none !m-0 !gap-1"
          />

          <style jsx global>{`
            .react-flow__controls-button {
              background: rgba(255, 255, 255, 0.03) !important;
              border: 1px solid rgba(255, 255, 255, 0.05) !important;
              border-radius: 10px !important;
              color: #94a3b8 !important;
              transition: all 0.2s ease !important;
              width: 32px !important; /* Mobile friendly size */
              height: 32px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }

            @media (min-width: 640px) {
              .react-flow__controls-button {
                width: 38px !important;
                height: 38px !important;
              }
            }

            .react-flow__controls-button:hover {
              background: rgba(99, 102, 241, 0.15) !important;
              color: #818cf8 !important;
              border-color: rgba(99, 102, 241, 0.3) !important;
            }

            .react-flow__controls-button svg {
              fill: currentColor !important;
              width: 14px !important;
            }
          `}</style>
        </div>
      </div>

      {/* Note: Map (MiniMap) component aapke GraphCanvas mein already rendered hoga. 
          Agar aap dono ko chipka ke rakhna chahte hain, toh Map component 
          ko is Panel ke andar bhi daal sakte hain ya CSS se gap manage karein. */}
    </Panel>
  );
};

export default ActionControls;