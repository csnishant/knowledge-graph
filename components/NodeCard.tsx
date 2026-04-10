"use client";
import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Clock,
  Trash2,
  Check,
  X,
  Edit3,
  AlertCircle,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
} from "lucide-react";
import { useGraphStore } from "../lib/graphUtils";

// Theme configuration for different colors
const COLOR_MAP = {
  blue: {
    border: "from-blue-400 via-cyan-400 to-blue-600",
    glow: "bg-blue-500/20",
    text: "text-blue-400",
    handle: "!bg-blue-500 !shadow-[0_0_10px_#3b82f6]",
  },
  purple: {
    border: "from-purple-400 via-fuchsia-400 to-purple-600",
    glow: "bg-purple-500/20",
    text: "text-purple-400",
    handle: "!bg-purple-500 !shadow-[0_0_10px_#a855f7]",
  },
  emerald: {
    border: "from-emerald-400 via-teal-400 to-emerald-600",
    glow: "bg-emerald-500/20",
    text: "text-emerald-400",
    handle: "!bg-emerald-500 !shadow-[0_0_10px_#10b981]",
  },
  rose: {
    border: "from-rose-400 via-pink-400 to-rose-600",
    glow: "bg-rose-500/20",
    text: "text-rose-400",
    handle: "!bg-rose-500 !shadow-[0_0_10px_#f43f5e]",
  },
};

export default memo(function NodeCard({ id, data, selected }: any) {
  const { updateNode, onNodesChange } = useGraphStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tempData, setTempData] = useState({
    title: data.title,
    note: data.note,
  });

  // Pick theme based on data.color
  const theme =
    COLOR_MAP[data.color as keyof typeof COLOR_MAP] || COLOR_MAP.blue;

  const saveChanges = () => {
    updateNode(id, tempData);
    setIsEditing(false);
  };

  return (
    <div className="relative group p-4">
      {/* --- NEON AMBIENT GLOW --- */}
      {selected && (
        <div
          className={`absolute inset-0 ${theme.glow} blur-[40px] rounded-full animate-pulse`}
        />
      )}

      {/* --- MAIN TERMINAL CARD --- */}
      <div
        className={`
        relative min-w-[320px] rounded-2xl transition-all duration-500 ease-out
        ${selected ? "scale-105 rotate-[0.5deg] z-50" : "hover:scale-[1.02] hover:-rotate-[0.5deg]"}
      `}>
        {/* Dynamic Border Gradient */}
        <div
          className={`
          absolute inset-0 rounded-2xl p-[1.5px]
          ${selected ? `bg-gradient-to-br ${theme.border} shadow-2xl` : "bg-slate-700/30"}
        `}
        />

        <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-[calc(1rem+4px)] p-6 overflow-hidden border border-white/5">
          {/* --- TOP DECORATION: SCANLINE EFFECT --- */}
          <div
            className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-scan`}
          />

          {/* --- BIGGER CIRCULAR HANDLES --- */}
          <Handle
            type="target"
            position={Position.Top}
            className={`!w-3 !h-3 !rounded-full !border-2 !border-slate-950 ${theme.handle} transition-transform hover:scale-150`}
          />

          {/* --- ACTION FLOATING BAR --- */}
          <div
            className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 ${selected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-slate-800/80 hover:bg-blue-600 rounded-lg border border-white/10 text-white shadow-xl">
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="p-2 bg-slate-800/80 hover:bg-red-600 rounded-lg border border-white/10 text-white shadow-xl">
              <Trash2 size={14} />
            </button>
          </div>

          {/* --- HEADER --- */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`p-2.5 rounded-xl ${selected ? `${theme.glow} ${theme.text}` : "bg-slate-800 text-slate-500"}`}>
              <Layers size={18} />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] leading-none ${theme.text}`}>
                {data.category || "Core_Layer"}
              </span>
              <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase">
                ID: {id.slice(0, 8)}
              </span>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  className="w-full bg-slate-900 border border-blue-500/30 rounded-xl py-3 px-4 text-sm text-white outline-none"
                  value={tempData.title}
                  onChange={(e) =>
                    setTempData({ ...tempData, title: e.target.value })
                  }
                />
                <textarea
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-[11px] text-slate-300 outline-none resize-none"
                  value={tempData.note}
                  onChange={(e) =>
                    setTempData({ ...tempData, note: e.target.value })
                  }
                  rows={3}
                />
                <button
                  onClick={saveChanges}
                  className="w-full bg-blue-600 py-2.5 rounded-xl text-xs font-bold text-white">
                  COMMIT
                </button>
              </div>
            ) : (
              <div>
                <h3
                  className={`text-lg font-black text-white mb-1 transition-colors ${selected ? theme.text : ""}`}>
                  {data.title || "NULL_ENTRY"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 line-clamp-3 mb-4">
                  {data.note || "System awaits description protocols..."}
                </p>
                {/* Health Bar */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500">
                    <span>
                      <Activity size={10} className="inline mr-1" /> Health
                    </span>
                    <span className={theme.text}>98.2%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${theme.glow.replace("/20", "")} w-[98%]`}
                      style={{
                        backgroundColor: theme.text.includes("blue")
                          ? "#3b82f6"
                          : theme.text.includes("purple")
                            ? "#a855f7"
                            : theme.text.includes("emerald")
                              ? "#10b981"
                              : "#f43f5e",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- FOOTER --- */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-3 text-[9px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock size={12} className={theme.text} /> 14.5ms
              </div>
              <div className="flex items-center gap-1.5 text-green-500/80">
                <ShieldCheck size={12} /> SECURE
              </div>
            </div>
            <div
              className={`h-2 w-2 rounded-full ${selected ? `animate-pulse shadow-lg ${theme.handle}` : "bg-slate-700"}`}
            />
          </div>

          {/* Delete Overlay Logic remains same... */}
          {isDeleting && (
            <div className="absolute inset-0 z-[60] bg-slate-950/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="p-4 bg-red-500/10 rounded-full mb-4">
                <AlertCircle className="text-red-500 animate-pulse" size={32} />
              </div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">
                Delete Node?
              </h4>
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => onNodesChange([{ type: "remove", id }])}
                  className="flex-1 bg-red-600 py-3 rounded-xl text-[10px] text-white">
                  Destroy
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="flex-1 bg-slate-800 py-3 rounded-xl text-[10px] text-slate-400">
                  Abort
                </button>
              </div>
            </div>
          )}

          <Handle
            type="source"
            position={Position.Bottom}
            className={`!w-3 !h-3 !rounded-full !border-2 !border-slate-950 ${theme.handle} transition-transform hover:scale-150`}
          />
        </div>
      </div>
    </div>
  );
});
