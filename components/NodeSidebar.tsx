"use client";
import React from "react";
import { useGraphStore } from "../lib/graphUtils";
import { X, Trash2, FileText, Type, Sparkles } from "lucide-react";

export default function NodeSidebar() {
  const { selectedNode, setSelectedNode, updateNode, nodes, onNodesChange } =
    useGraphStore();
  const node = nodes.find((n) => n.id === selectedNode?.id) || null;

  if (!node) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-40"
        onClick={() => setSelectedNode(null)}
      />
      <aside className="fixed right-0 top-0 h-full w-[400px] z-50 bg-[#0f172a] border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-400">
            <Sparkles size={18} />
            <span className="font-bold text-xs uppercase tracking-widest text-slate-400">
              Editor
            </span>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="text-slate-500 hover:text-white transition-colors">
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <Type size={12} /> Title
            </label>
            <input
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={node.data.title}
              onChange={(e) => updateNode(node.id, { title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
              <FileText size={12} /> Notes
            </label>
            <textarea
              rows={10}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={node.data.note}
              onChange={(e) => updateNode(node.id, { note: e.target.value })}
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-800">
          <button
            onClick={() => {
              if (confirm("Delete node?")) {
                onNodesChange([{ type: "remove", id: node.id }]);
                setSelectedNode(null);
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl transition-all font-semibold">
            <Trash2 size={18} /> Delete Node
          </button>
        </div>
      </aside>
    </>
  );
}
