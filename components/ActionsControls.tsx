"use client";
import React from "react";
import { Controls, Panel } from "@xyflow/react";

const ActionControls = () => {
  return (
    <Panel position="bottom-left" className="m-8">
      {/* Outer Container with Floating Effect */}
      <div className="group relative">
        {/* Shadow Glow Background */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />

        {/* Main Control Box */}
        <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1">
          <Controls
            showInteractive={false}
            // Hum default classes ko override kar rahe hain
            className="!static !flex !flex-col !bg-transparent !border-none !shadow-none !m-0 !gap-1"
          />

          {/* Custom Stylings for React Flow Buttons via CSS-in-JS or Global CSS */}
          <style jsx global>{`
            /* Buttons styling */
            .react-flow__controls-button {
              background: rgba(255, 255, 255, 0.03) !important;
              border: 1px solid rgba(255, 255, 255, 0.05) !important;
              border-radius: 12px !important;
              color: #94a3b8 !important;
              transition: all 0.3s ease !important;
              width: 38px !important;
              height: 38px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              margin-bottom: 0px !important;
            }

            .react-flow__controls-button:hover {
              background: rgba(99, 102, 241, 0.15) !important;
              color: #818cf8 !important;
              border-color: rgba(99, 102, 241, 0.3) !important;
              transform: translateY(-1px);
            }

            .react-flow__controls-button svg {
              fill: currentColor !important;
              width: 14px !important;
            }

            /* Tooltip fix (Optional) */
            .react-flow__controls-button:after {
              display: none !important;
            }
          `}</style>
        </div>
      </div>
    </Panel>
  );
};

export default ActionControls;
