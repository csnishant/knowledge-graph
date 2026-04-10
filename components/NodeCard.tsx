"use client";
import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Sparkles,
  Cpu,
  Clock,
  Link2,
  Trash2,
  Check,
  X,
  Edit3,
  AlertCircle,
} from "lucide-react";
import { useGraphStore } from "../lib/graphUtils";

export default memo(function NodeCard({ id, data, selected }: any) {
  const { updateNode, onNodesChange } = useGraphStore();

  // States for Inline Editing & Inline Deleting
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

  const cancelEdit = () => {
    setTempData({ title: data.title, note: data.note });
    setIsEditing(false);
  };

  const deleteNode = () => {
    onNodesChange([{ type: "remove", id }]);
  };

  return (
    <div className="relative group">
      {/* 1. Animated Border Glow */}
      {selected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 rounded-2xl blur opacity-30 animate-pulse" />
      )}

      {/* 2. Main Container */}
      <div
        className={`
        relative min-w-[280px] p-[1px] rounded-xl transition-all duration-500
        ${
          selected
            ? "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105"
            : "bg-slate-800/50 border border-slate-700/50 backdrop-blur-md hover:border-slate-500"
        }
      `}>
        <div className="bg-[#0b1120] p-5 rounded-xl overflow-visible relative">
          <Handle
            type="target"
            position={Position.Top}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-slate-900"
          />

          {/* --- TOP ACTIONS (Visible on Hover/Select) --- */}
          <div
            className={`absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2 transition-all duration-300 ${selected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-blue-400 hover:bg-blue-600 hover:text-white shadow-xl">
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => setIsDeleting(true)}
              className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white shadow-xl">
              <Trash2 size={14} />
            </button>
          </div>

          {/* --- DELETE WARNING OVERLAY (Inline Confirmation) --- */}
          {isDeleting && (
            <div className="absolute inset-0 z-20 bg-slate-950/95 rounded-xl flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-200">
              <AlertCircle
                className="text-red-500 mb-2 animate-bounce"
                size={24}
              />
              <p className="text-[10px] font-bold text-white uppercase tracking-tighter mb-4">
                Terminate Module?
              </p>
              <div className="flex gap-2 w-full">
                <button
                  onClick={deleteNode}
                  className="flex-1 bg-red-600 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500">
                  Confirm
                </button>
                <button
                  onClick={() => setIsDeleting(false)}
                  className="flex-1 bg-slate-800 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700">
                  Abort
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <Cpu
                size={14}
                className={selected ? "text-blue-400" : "text-slate-500"}
              />
              <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">
                Node_Protocol
              </span>
            </div>
            {isEditing && (
              <span className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full animate-pulse">
                EDITING
              </span>
            )}
          </div>

          {/* --- EDITABLE CONTENT --- */}
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-2 animate-in slide-in-from-top-1 duration-200">
                <input
                  className="w-full bg-slate-900/50 border border-blue-500/50 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                  value={tempData.title}
                  onChange={(e) =>
                    setTempData({ ...tempData, title: e.target.value })
                  }
                  autoFocus
                />
                <textarea
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-[10px] text-slate-300 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  value={tempData.note}
                  onChange={(e) =>
                    setTempData({ ...tempData, note: e.target.value })
                  }
                  rows={2}
                />
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={saveChanges}
                    className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors">
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:bg-slate-700 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDoubleClick={() => setIsEditing(true)}
                className="cursor-pointer group/text">
                <h3
                  className={`text-sm font-bold truncate ${selected ? "text-white" : "text-slate-200"}`}>
                  {data.title || "NEW_MODULE"}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 group-hover/text:text-slate-300">
                  {data.note || "Double click to add description..."}
                </p>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className="mt-5 pt-3 border-t border-slate-800/50 flex justify-between text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
            <span className="flex items-center gap-1">
              <Clock size={10} /> Latency: 0.04s
            </span>
            <span className="flex items-center gap-1 text-cyan-500/80">
              <Link2 size={10} /> Online
            </span>
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-slate-900"
          />
        </div>
      </div>
    </div>
  );
});
