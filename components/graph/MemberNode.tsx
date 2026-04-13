"use client";
import React, { memo, useState } from "react";
import { Handle, Position, useReactFlow, useEdges } from "@xyflow/react";
import { Trash2, Edit2, AlertTriangle } from "lucide-react";

export default memo(function MemberNode({ id, data, selected }: any) {
  const { setNodes, setEdges } = useReactFlow();
  const allEdges = useEdges();

  // States for UI control
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 1. Real-time Connection Counter
  const connectionCount = allEdges.filter(
    (edge) => edge.source === id || edge.target === id,
  ).length;

  const handleUpdate = (field: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, [field]: value } };
        }
        return node;
      }),
    );
  };

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  return (
    <div className="relative flex flex-col items-center group">
      {/* --- 1. PREMIUM DELETE WARNING OVERLAY --- */}
      {showDeleteConfirm && (
        <div className="absolute -top-24 z-[100] bg-slate-900 border border-rose-500/50 p-3 rounded-xl shadow-2xl backdrop-blur-xl w-48 animate-in fade-in zoom-in duration-200">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle
              size={14}
              className="text-rose-500 shrink-0 mt-0.5"
            />
            <p className="text-[10px] text-slate-300 leading-tight">
              Delete{" "}
              <span className="text-white font-bold">
                {data.name || "Member"}
              </span>
              ? This will remove{" "}
              <span className="text-rose-400 font-bold">
                {connectionCount} connections
              </span>
              .
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={confirmDelete}
              className="flex-1 py-1 bg-rose-600 hover:bg-rose-500 text-[9px] font-black rounded-md transition-colors">
              DELETE
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 text-[9px] font-black rounded-md transition-colors">
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* --- 2. FLOATING ACTION BAR (Hover par dikhega) --- */}
      <div className="absolute -right-12 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 rounded-xl border transition-all ${isEditing ? "bg-indigo-600 border-indigo-400 text-white" : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white"}`}>
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-2 bg-slate-900/80 border border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-500/50 rounded-xl transition-all">
          <Trash2 size={14} />
        </button>
      </div>

      {/* --- 3. MAIN CARD BOX (Image Style) --- */}
      <div
        className={`
        relative w-24 h-24 rounded-2xl bg-[#0f172a]/95 border-2 flex items-center justify-center
        transition-all duration-500 backdrop-blur-xl shadow-2xl
        ${selected ? "border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.4)] scale-110" : "border-slate-800/80"}
      `}>
        {/* Dynamic Initial */}
        <span className="text-4xl font-black text-indigo-100 drop-shadow-[0_0_10px_rgba(165,180,252,0.2)]">
          {data.name ? data.name.charAt(0).toUpperCase() : "A"}
        </span>

        {/* Dynamic Connection Counter Badge */}
        <div className="absolute -top-3 -right-3 min-w-[28px] h-7 px-1 bg-slate-900 border border-indigo-500/50 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <span className="text-indigo-400 text-[10px] font-black">
            {connectionCount}
          </span>
        </div>

        <Handle
          type="source"
          position={Position.Right}
          className="!bg-cyan-400 !w-3 !h-3 !border-2 !border-slate-900 !right-[-6px] shadow-[0_0_15px_#22d3ee]"
        />
      </div>

      {/* --- 4. TEXT SECTION (Hover-to-Edit Logic) --- */}
      <div className="mt-4 flex flex-col items-center gap-1 w-44">
        {isEditing ? (
          <div className="flex flex-col items-center w-full animate-in slide-in-from-top-1 duration-200">
            <input
              autoFocus
              value={data.name || ""}
              onChange={(e) => handleUpdate("name", e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="bg-slate-800/50 text-white text-xs font-black text-center outline-none border border-indigo-500/30 rounded-md py-1 w-full px-2"
            />
            <input
              value={data.role || ""}
              onChange={(e) => handleUpdate("role", e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="bg-transparent text-indigo-400 text-[9px] font-bold uppercase tracking-widest text-center outline-none mt-1 w-full"
            />
          </div>
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className="flex flex-col items-center cursor-text group/text">
            <span className="text-white text-xs font-black tracking-tight group-hover/text:text-indigo-300 transition-colors">
              {data.name || "Add Name"}
            </span>
            <span className="text-indigo-400/70 text-[9px] font-bold uppercase tracking-widest">
              {data.role || "Designer"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});
