"use client";
import React from "react";

export default function ConnectionModal({ position, onSelect, onCancel }: any) {
  if (!position) return null;

  const levels = [
    {
      id: "learning",
      label: "Learning",
      color: "bg-slate-500",
      border: "border-slate-400",
    },
    {
      id: "familiar",
      label: "Familiar",
      color: "bg-blue-500",
      border: "border-blue-400",
    },
    {
      id: "expert",
      label: "Expert",
      color: "bg-cyan-500",
      border: "border-cyan-400",
    },
  ];

  return (
    <div
      className="fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}>
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex gap-2">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => onSelect(lvl.id)}
            className={`px-3 py-2 rounded-xl border ${lvl.border} bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-1 group`}>
            <div
              className={`w-2 h-2 rounded-full ${lvl.color} shadow-[0_0_8px_currentColor]`}
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">
              {lvl.label}
            </span>
          </button>
        ))}
        <button
          onClick={onCancel}
          className="px-2 text-slate-500 hover:text-white text-[10px] font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}
