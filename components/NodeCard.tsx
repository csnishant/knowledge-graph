"use client";
import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Cpu,
  Clock,
  Link2,
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

export default memo(function NodeCard({ id, data, selected }: any) {
  const { updateNode, onNodesChange } = useGraphStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tempData, setTempData] = useState({
    title: data.title,
    note: data.note,
  });

  const saveChanges = () => {
    updateNode(id, tempData);
    setIsEditing(false);
  };

  return (
    <div className="relative group p-4">
      {/* --- NEON AMBIENT GLOW --- */}
      {selected && (
        <div className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full animate-pulse" />
      )}

      {/* --- MAIN TERMINAL CARD --- */}
      <div
        className={`
        relative min-w-[320px] rounded-2xl transition-all duration-500 ease-out
        ${
          selected
            ? "scale-105 rotate-[0.5deg] z-50"
            : "hover:scale-[1.02] hover:-rotate-[0.5deg]"
        }
      `}>
        {/* Glassmorphic Background with Border Gradient */}
        <div
          className={`
          absolute inset-0 rounded-2xl p-[1.5px]
          ${
            selected
              ? "bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)]"
              : "bg-slate-700/30"
          }
        `}
        />

        <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-[calc(1rem+4px)] p-6 overflow-hidden border border-white/5">
          {/* --- TOP DECORATION: SCANLINE EFFECT --- */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-scan" />

          {/* --- HANDLES --- */}
          <Handle
            type="target"
            position={Position.Top}
            className="!w-4 !h-1 !rounded-none !bg-blue-500 !border-none !shadow-[0_0_10px_#3b82f6]"
          />

          {/* --- ACTION FLOATING BAR --- */}
          <div
            className={`absolute top-4 right-4 flex gap-2 transition-all duration-500 ${selected ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-slate-800/80 hover:bg-blue-600 rounded-lg border border-white/10 text-white transition-all shadow-xl">
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="p-2 bg-slate-800/80 hover:bg-red-600 rounded-lg border border-white/10 text-white transition-all shadow-xl">
              <Trash2 size={14} />
            </button>
          </div>

          {/* --- HEADER: PROTOCOL INFO --- */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`p-2.5 rounded-xl ${selected ? "bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-slate-800 text-slate-500"}`}>
              <Layers size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-500/70 uppercase tracking-[0.2em] leading-none">
                Core_Layer
              </span>
              <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase">
                ID: {id.slice(0, 8)}
              </span>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                <div className="relative">
                  <TypeIcon />
                  <input
                    className="w-full bg-slate-900 border border-blue-500/30 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500/40 outline-none transition-all"
                    value={tempData.title}
                    onChange={(e) =>
                      setTempData({ ...tempData, title: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="relative">
                  <NoteIcon />
                  <textarea
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-[11px] text-slate-300 focus:ring-2 focus:ring-blue-500/40 outline-none resize-none"
                    value={tempData.note}
                    onChange={(e) =>
                      setTempData({ ...tempData, note: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveChanges}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                    <Check size={14} /> COMMIT
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 bg-slate-800 hover:bg-slate-700 py-2.5 rounded-xl text-slate-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDoubleClick={() => setIsEditing(true)}
                className="group/text">
                <h3 className="text-lg font-black text-white tracking-tight mb-1 group-hover/text:text-blue-400 transition-colors">
                  {data.title || "NULL_ENTRY"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 font-medium line-clamp-3 mb-4">
                  {data.note || "System awaits description protocols..."}
                </p>

                {/* --- PREMIUM METRIC: HEALTH BAR --- */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                    <span className="flex items-center gap-1">
                      <Activity size={10} /> Sync Health
                    </span>
                    <span className="text-blue-400 font-mono">98.2%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[98%] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* --- FOOTER: SYSTEM TELEMETRY --- */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-3 text-[9px] font-mono font-bold">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock size={12} className="text-blue-500" /> 14.5ms
              </div>
              <div className="flex items-center gap-1.5 text-green-500/80">
                <ShieldCheck size={12} /> SECURE
              </div>
            </div>
            <div
              className={`h-2 w-2 rounded-full shadow-[0_0_8px] ${selected ? "bg-blue-400 shadow-blue-400 animate-pulse" : "bg-slate-700 shadow-transparent"}`}
            />
          </div>

          {/* --- DELETE OVERLAY (The "Warning" Screen) --- */}
          {isDeleting && (
            <div className="absolute inset-0 z-[60] bg-slate-950/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="p-4 bg-red-500/10 rounded-full mb-4">
                <AlertCircle className="text-red-500 animate-pulse" size={32} />
              </div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-2">
                Initialize Deletion?
              </h4>
              <p className="text-[10px] text-slate-500 mb-6 leading-relaxed">
                This action will permanently terminate the data node and all its
                visual connections.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => onNodesChange([{ type: "remove", id }])}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-xl text-[10px] font-black text-white uppercase shadow-lg shadow-red-900/40 transition-all">
                  Destroy
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="flex-1 bg-slate-800 py-3 rounded-xl text-[10px] font-black text-slate-400 uppercase hover:text-white transition-all">
                  Abort
                </button>
              </div>
            </div>
          )}

          <Handle
            type="source"
            position={Position.Bottom}
            className="!w-4 !h-1 !rounded-none !bg-blue-500 !border-none !shadow-[0_0_10px_#3b82f6]"
          />
        </div>
      </div>
    </div>
  );
});

// Small Internal Components for Icons
const TypeIcon = () => (
  <Edit3 className="absolute left-3 top-3 text-slate-600" size={16} />
);
const NoteIcon = () => (
  <Zap className="absolute left-3 top-3 text-slate-600" size={16} />
);
