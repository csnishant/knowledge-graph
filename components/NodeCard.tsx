"use client";
import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Sparkles, Terminal, Cpu, Clock, Link2 } from "lucide-react";

export default memo(function NodeCard({ data, selected }: any) {
  return (
    <div className="relative group">
      {/* 1. Animated Border Glow */}
      {selected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse" />
      )}

      {/* 2. Main Container */}
      <div
        className={`
        relative min-w-[240px] p-[1px] rounded-xl transition-all duration-500
        ${
          selected
            ? "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-105"
            : "bg-slate-800/50 border border-slate-700/50 backdrop-blur-md"
        }
      `}>
        <div className="bg-[#0b1120] p-4 rounded-xl overflow-visible relative">
          {/* --- TARGET HANDLE (Top) --- */}
          <Handle
            type="target"
            position={Position.Top}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-slate-900 !opacity-100 hover:!scale-150 transition-transform"
          />

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Cpu
                size={14}
                className={selected ? "text-blue-400" : "text-slate-500"}
              />
              <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">
                System
              </span>
            </div>
            <div className="flex gap-1">
              <div
                className={`h-1 w-1 rounded-full ${selected ? "bg-blue-400 animate-ping" : "bg-slate-600"}`}
              />
            </div>
          </div>

          {/* Title & Note */}
          <div className="space-y-2">
            <h3
              className={`text-sm font-bold truncate ${selected ? "text-white" : "text-slate-200"}`}>
              {data.title || "NEW_MODULE"}
            </h3>
            <p className="text-[10px] text-slate-400 line-clamp-2">
              {data.note || "No description provided."}
            </p>
          </div>

          {/* Footer Stats */}
          <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between text-[8px] font-mono text-slate-500 uppercase">
            <span className="flex items-center gap-1">
              <Clock size={10} /> 12ms
            </span>
            <span className="flex items-center gap-1">
              <Link2 size={10} /> Active
            </span>
          </div>

          {/* --- SOURCE HANDLE (Bottom) --- */}
          <Handle
            type="source"
            position={Position.Bottom}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-slate-900 !opacity-100 hover:!scale-150 transition-transform"
          />
        </div>
      </div>
    </div>
  );
});
