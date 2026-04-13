"use client";
import React from "react";

interface ConnectionModalProps {
  position: {
    x: number;
    y: number;
    sourceType?: string;
    targetType?: string;
  } | null;
  onSelect: (level: string) => void;
  onCancel: () => void;
}

export default function ConnectionModal({
  position,
  onSelect,
  onCancel,
}: ConnectionModalProps) {
  if (!position) return null;

  // Check if it's a Skill-to-Skill connection
  const isSkillToSkill =
    position.sourceType === "custom" && position.targetType === "custom";

  // Member to Skill options
  const proficiencyLevels = [
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

  // Skill to Skill options
  const dependencyLevels = [
    {
      id: "prerequisite",
      label: "Prerequisite",
      color: "bg-amber-500",
      border: "border-amber-400",
    },
    {
      id: "relates",
      label: "Relates To",
      color: "bg-purple-500",
      border: "border-purple-400",
    },
  ];

  const activeLevels = isSkillToSkill ? dependencyLevels : proficiencyLevels;

  return (
    <div
      className="fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}>
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2 animate-in fade-in zoom-in duration-200">
        <div className="flex gap-1.5">
          {activeLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => onSelect(lvl.id)}
              className={`px-3 py-2 rounded-xl border ${lvl.border} bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-1 group min-w-[70px]`}>
              <div
                className={`w-2 h-2 rounded-full ${lvl.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
              />
              <span className="text-[9px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">
                {lvl.label}
              </span>
            </button>
          ))}
        </div>

        <div className="w-[1px] h-8 bg-white/10 mx-1" />

        <button
          onClick={onCancel}
          className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
          title="Cancel">
          <span className="text-xs font-bold">✕</span>
        </button>
      </div>

      {/* Decorative pointer arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-950/90" />
    </div>
  );
}
