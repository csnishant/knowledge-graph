"use client";

import React from "react";
import { useGraphStore } from "../lib/graphUtils";
import { Node } from "@xyflow/react";

export default function NodeSidebar() {
  const { selectedNode, setSelectedNode, updateNode, deleteNode } =
    useGraphStore();

  // ✅ Single clean node (NO confusion)
  const node = selectedNode as Node<{
    title: string;
    note: string;
  }> | null;

  // ✅ Empty state
  if (!node) {
    return (
      <aside className="w-96 border-l border-slate-200 bg-white/80 p-8 flex flex-col items-center justify-center text-center">
        <h3 className="text-slate-800 font-semibold">No Node Selected</h3>
        <p className="text-slate-500 text-sm mt-2">
          Click on a node to edit it.
        </p>
      </aside>
    );
  }

  return (
    <aside className="w-96 border-l border-slate-200 bg-white shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="font-bold text-slate-800">Concept Editor</h2>
        <button onClick={() => setSelectedNode(null)}>✕</button>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4 flex-grow">
        {/* Title */}
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          value={node.data.title || ""}
          onChange={(e) => updateNode(node.id, { title: e.target.value })}
        />

        {/* Notes */}
        <textarea
          rows={8}
          className="w-full border rounded-lg px-3 py-2"
          value={node.data.note || ""}
          onChange={(e) => updateNode(node.id, { note: e.target.value })}
        />
      </div>

      {/* Delete */}
      <div className="p-6 border-t">
        <button
          onClick={() => deleteNode(node.id)} // ✅ safe
          className="w-full bg-red-500 text-white py-2 rounded-lg">
          Delete Node
        </button>
      </div>
    </aside>
  );
}
