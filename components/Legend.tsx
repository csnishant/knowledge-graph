"use client";
import React from "react";
import { Panel } from "@xyflow/react";

export default function Legend() {
  return (
    <Panel position="bottom-left" className="ml-6 mb-10">
      <div className="bg-slate-950/60 backdrop-blur-xl border border-white/5 p-5 rounded-2xl shadow-2xl w-52 overflow-hidden">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400/80 mb-5">
          Legend
        </h3>

        <div className="space-y-4">
          {/* 1. NODE TYPES */}
          <div className="space-y-2.5 mb-2">
            <div className="flex items-center gap-3 group">
              <div className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">
                Team Member
              </span>
            </div>
            <div className="flex items-center gap-3 group">
              <div
                className="w-5 h-5 bg-slate-900 border border-slate-700"
                style={{
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                }}
              />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">
                Skill
              </span>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* 2. EDGE TYPES (Image style connections) */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 group">
              <div className="w-6 border-t-[1.5px] border-dashed border-slate-500 opacity-60" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Learning
              </span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-6 border-t-2 border-blue-500/80 shadow-[0_0_5px_rgba(59,130,246,0.3)]" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Familiar
              </span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-6 h-[3px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Expert
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div className="mt-6 pt-3 border-t border-white/5">
          <p className="text-[8px] text-indigo-400/50 font-medium italic">
            Click to inspect • Drag to reposition
          </p>
        </div>
      </div>
    </Panel>
  );
}
