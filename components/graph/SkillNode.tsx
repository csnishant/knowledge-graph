"use client";
import React, { memo, useState } from "react";
import { Handle, Position, useReactFlow, useEdges } from "@xyflow/react";
import {
  Trash2,
  Atom,
  Globe,
  Database,
  Server,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Workflow,
} from "lucide-react";

// --- ICON MAPPING LOGIC ---
const getSkillIcon = (title: string = "") => {
  const t = title.toLowerCase();
  if (t.includes("react")) return <Atom size={24} className="text-cyan-400" />;
  if (t.includes("next")) return <Layers size={24} className="text-white" />;
  if (t.includes("node") || t.includes("backend"))
    return <Server size={24} className="text-emerald-400" />;
  if (t.includes("db") || t.includes("mongo") || t.includes("sql"))
    return <Database size={24} className="text-amber-400" />;
  if (t.includes("api") || t.includes("rest"))
    return <Workflow size={24} className="text-rose-400" />;
  if (t.includes("js") || t.includes("ts") || t.includes("script"))
    return <Terminal size={24} className="text-yellow-400" />;
  if (t.includes("css") || t.includes("tailwind"))
    return <Globe size={24} className="text-sky-400" />;
  return <Code2 size={24} className="text-indigo-400" />; // Default Icon
};

export default memo(function NodeCard({ id, data, selected }: any) {
  const { setNodes, setEdges } = useReactFlow();
  const allEdges = useEdges();
  const [isEditing, setIsEditing] = useState(false);

  const expertCount = allEdges.filter(
    (edge) => edge.target === id && edge.data?.level === "expert",
  ).length;

  const handleUpdate = (value: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, title: value } };
        }
        return node;
      }),
    );
  };

const onDelete = (e: React.MouseEvent) => {
  e.stopPropagation(); // Taaki node select na ho jaye delete click par

  // 1. Remove the specific node
  setNodes((nds) => nds.filter((n) => n.id !== id));

  // 2. Remove ONLY edges connected to THIS node
  setEdges((eds) =>
    eds.filter((edge) => edge.source !== id && edge.target !== id),
  );
};

  return (
    <div className="relative group p-4 flex flex-col items-center">
      {/* --- FLOATING ACTIONS --- */}
      <button
        onClick={onDelete}
        className="absolute -top-1 -left-1 p-1.5 bg-rose-500/10 text-rose-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-50 hover:bg-rose-500 hover:text-white border border-rose-500/20">
        <Trash2 size={12} />
      </button>

      {/* --- EXPERT BADGE --- */}
      {expertCount > 0 && (
        <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 border border-emerald-500/50 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tight">
            {expertCount} Expert{expertCount > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* --- PREMIUM HEXAGON CONTAINER --- */}
      <div
        className={`
          relative w-20 h-20 flex items-center justify-center transition-all duration-500 cursor-pointer
          ${selected ? "scale-110" : "hover:scale-105"}
        `}>
        {/* Animated Glow Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${selected ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full animate-pulse" />
        </div>

        {/* Outer Hexagon (Border) */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${selected ? "bg-indigo-500" : "bg-slate-700 group-hover:bg-slate-500"}`}
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />

        {/* Inner Hexagon (Content Area) */}
        <div
          className="absolute inset-[2px] bg-[#020617] flex items-center justify-center overflow-hidden"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}>
          {/* Skill Icon */}
          <div
            className={`transition-all duration-500 ${selected ? "scale-110 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "opacity-80"}`}>
            {getSkillIcon(data.title)}
          </div>

          {/* Subtle Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>

        {/* --- REACT FLOW HANDLES --- */}
        <Handle
          type="target"
          position={Position.Left}
          className="!w-2 !h-2 !bg-indigo-500 !border-2 !border-slate-900 !-left-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-2 !h-2 !bg-indigo-500 !border-2 !border-slate-900 !-right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* --- LABEL SYSTEM --- */}
      <div className="mt-4 flex flex-col items-center text-center">
        {isEditing ? (
          <input
            autoFocus
            value={data.title || ""}
            onChange={(e) => handleUpdate(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            className="bg-slate-800 text-white text-[11px] font-bold text-center outline-none border-b-2 border-indigo-500 px-1 w-28 animate-in fade-in zoom-in duration-200"
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-[12px] font-black text-white uppercase tracking-wider cursor-text hover:text-indigo-400 transition-all flex items-center gap-1 group/text">
            {data.title || "New Skill"}
          </h3>
        )}

        <div className="mt-1 px-2 py-0.5 bg-slate-800/50 rounded-full border border-white/5">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
            {data.category || "Technology"}
          </span>
        </div>
      </div>
    </div>
  );
});
