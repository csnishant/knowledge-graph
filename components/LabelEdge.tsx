"use client";
import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

export default function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  // Level Specific Styling Logic
  const levelConfig: any = {
    learning: {
      color: "text-slate-400",
      border: "border-slate-500/30",
      bg: "bg-slate-900/80",
      stroke: "#64748b",
      width: 2,
      dash: "6,6",
    },
    familiar: {
      color: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-950/40",
      stroke: "#3b82f6",
      width: 2.5,
      dash: "",
    },
    expert: {
      color: "text-cyan-400",
      border: "border-cyan-500/50",
      bg: "bg-[#020617]/90",
      stroke: "#22d3ee",
      width: 4,
      dash: "",
      glow: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))",
    },
    // --- NAYA PREREQUISITE STYLE (Skill to Skill) ---
    prerequisite: {
      color: "text-amber-400",
      border: "border-amber-500/50",
      bg: "bg-amber-950/30",
      stroke: "#f59e0b", // Amber Color
      width: 2.5,
      dash: "5,5", // Dashed Line
      glow: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.4))",
    },
  };

  // Agar data.level "prerequisite" hai toh amber wala config use hoga
  const current = levelConfig[data?.level] || levelConfig.learning;

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: current.stroke,
          strokeWidth: current.width,
          strokeDasharray: current.dash,
          filter: current.glow || "none",
        }}
        className="transition-all duration-500"
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan group">
          <div
            className={`
            relative flex items-center gap-1.5 px-3 py-1 rounded-full border 
            backdrop-blur-md transition-all duration-300 scale-90
            ${current.bg} ${current.border}
            group-hover:scale-100 
            ${
              data?.level === "prerequisite"
                ? "group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                : "group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            }
          `}>
            {/* Level Icon / Dot */}
            <div
              className={`w-1.5 h-1.5 rounded-full 
                ${data?.level === "expert" ? "bg-cyan-400 animate-pulse" : ""}
                ${data?.level === "prerequisite" ? "bg-amber-400" : "bg-current opacity-50"}
              `}
            />

            <span
              className={`text-[9px] font-black uppercase tracking-[0.15em] ${current.color}`}>
              {data?.level || "Learning"}
            </span>

            {/* Expert Glow */}
            {data?.level === "expert" && (
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(34,211,238,0.2)] pointer-events-none" />
            )}

            {/* Prerequisite Glow */}
            {data?.level === "prerequisite" && (
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(245,158,11,0.1)] pointer-events-none" />
            )}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
