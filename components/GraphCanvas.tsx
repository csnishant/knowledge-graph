"use client";

import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  BackgroundVariant,
} from "@xyflow/react";
import { Plus } from "lucide-react";
import "@xyflow/react/dist/style.css";

// Internal Imports
import { useGraphStore } from "../lib/graphUtils";
import NodeCard from "./NordCard"; // Ensure path is correct
import NodeSidebar from "./NodeSidebar"; // Sidebar import

// Custom Node Types mapping
const nodeTypes = {
  custom: NodeCard,
};

export default function GraphCanvas() {
  const [mounted, setMounted] = useState(false);

  // Hydration fix for Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
  } = useGraphStore();

  // CRUD: Create - Function to add a new custom node
  const addNewNode = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNode = {
      id,
      type: "custom", // Important: matches the key in nodeTypes
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        title: "New Topic",
        note: "",
      },
    };

    addNode(newNode);
    setSelectedNode(newNode); // Automatically open sidebar for the new node
  };

  if (!mounted) return null;

  return (
    <div className="flex-grow h-screen bg-[#020617] relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // CRUD: Read - Select node on click
        onNodeClick={(_, node) => setSelectedNode(node as any)}
        // Deselect when clicking the background
        onPaneClick={() => setSelectedNode(null)}
        fitView
        defaultEdgeOptions={{
          style: { stroke: "#3b82f6", strokeWidth: 2 },
          animated: true,
        }}>
        {/* Background with Enum fix for TS(2322) */}
        <Background
          color="#1e293b"
          gap={25}
          size={1}
          variant={BackgroundVariant.Dots}
        />

        {/* Floating UI Panel */}
        <Panel position="top-left" className="m-4">
          <button
            onClick={addNewNode}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 font-bold border border-blue-400/30">
            <Plus size={20} />
            <span>New Concept</span>
          </button>
        </Panel>

        {/* Styled Controls */}
        <Controls className="bg-slate-900 border-slate-800 fill-white rounded-lg overflow-hidden [&_button]:border-slate-800 [&_button]:bg-slate-900 hover:[&_button]:bg-slate-800 transition-colors" />
      </ReactFlow>

      {/* Node Sidebar handles Update and Delete */}
      <NodeSidebar />

      {/* Subtle Branding */}
      <div className="absolute bottom-6 left-20 pointer-events-none opacity-10">
        <h1 className="text-5xl font-black text-white italic tracking-tighter">
          GRAPH ENGINE
        </h1>
      </div>
    </div>
  );
}
