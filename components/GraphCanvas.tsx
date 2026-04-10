"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import {
  Plus,
  LayoutGrid,
  Activity,
  Search,
  Map as MapIcon,
  Maximize2,
  MousePointer2,
} from "lucide-react";
import "@xyflow/react/dist/style.css";
import { useGraphStore } from "../lib/graphUtils";
import NodeCard from "./NodeCard";


const nodeTypes = { custom: NodeCard };

export default function GraphCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
    selectedNode,
  } = useGraphStore();

  // Optimized add node with random scattering (Maps effect)
  const addNewNode = useCallback(() => {
    const newNode = {
      id: Math.random().toString(36).substr(2, 9),
      type: "custom",
      position: {
        x: Math.random() * 800 - 400, // Centers around 0
        y: Math.random() * 600 - 300,
      },
      data: { title: "New Unit", note: "Initializing telemetry..." },
    };
    addNode(newNode);
  }, [addNode]);

  if (!mounted) return null;

  return (
    <div className="flex-grow h-[100dvh] w-full bg-[#020617] relative text-white font-sans overflow-hidden touch-none">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node as any)}
        onPaneClick={() => setSelectedNode(null)}
        // --- ZOOM & RESPONSIVENESS SETTINGS ---

        minZoom={0.1} // Google Map jaisa door ka view
        maxZoom={2.0} // Close-up detail view
        fitView
        fitViewOptions={{ duration: 800 }}
        panOnScroll={true} // Mouse wheel se pan (Maps style)
        selectionOnDrag={true}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: "#3b82f6",
            strokeWidth: 2,
            filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))",
          },
        }}>
        <Background
          color="#1e293b"
          gap={40}
          size={1}
          variant={BackgroundVariant.Lines}
          className="opacity-20"
        />

        {/* TOP INTERFACE: Dynamic Scaling */}
        <Panel
          position="top-left"
          className="flex flex-wrap items-center gap-2 sm:gap-4 m-2 sm:m-6">
          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 p-2 rounded-2xl shadow-2xl">
            <div className="bg-blue-600 p-2 rounded-xl">
              <LayoutGrid size={18} />
            </div>
            <div className="hidden xs:block pr-2">
              <h1 className="text-[10px] font-black tracking-widest text-slate-400 uppercase leading-none">
                Global Atlas
              </h1>
              <p className="text-xs font-bold text-white leading-tight">
                {nodes.length} Active Points
              </p>
            </div>
          </div>

          <button
            onClick={addNewNode}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Node</span>
          </button>
        </Panel>

        {/* SEARCH: Maps Style Floating Bar */}
        <Panel
          position="top-center"
          className="w-full max-w-[90vw] sm:max-w-md mt-4 sm:mt-6 px-4">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400"
              size={16}
            />
            <input
              placeholder="Locate Coordinate..."
              className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-2xl"
            />
          </div>
        </Panel>

        {/* MINIMAP: Google Maps Style */}
        <MiniMap
          zoomable
          pannable
          className="!hidden md:!block !bg-slate-950/90 !border-slate-800 !rounded-3xl !shadow-2xl !m-6 !w-60 !h-44 border border-white/5"
          nodeColor="#3b82f6"
          maskColor="rgba(0, 0, 0, 0.3)"
        />

        {/* STATS: Adaptive Position */}
        {!selectedNode && (
          <Panel position="top-right" className="m-6 hidden lg:block">
            <div className="w-64 bg-slate-950/80 backdrop-blur-2xl border border-slate-800/50 p-5 rounded-[2rem] shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">
                  Telemetry
                </span>
                <Activity size={14} className="text-blue-500 animate-pulse" />
              </div>
              <div className="space-y-2">
                <StatRow label="Map Zoom" value="Dynamic" />
                <StatRow
                  label="Accuracy"
                  value="99.2%"
                  color="text-green-400"
                />
                <StatRow label="Nodes" value={nodes.length.toString()} />
              </div>
            </div>
          </Panel>
        )}

        {/* ZOOM CONTROLS: Modern Floating Style */}
        <Controls
          showInteractive={false}
          className=" text-gray-900 !bg-slate-900/90 !border-slate-800 !shadow-2xl !rounded-xl !p-1 !flex !flex-col !gap-1 !m-4 sm:!m-6"
        />

        {/* INTERACTION BADGE (Google Maps style bottom right info) */}
        <Panel
          position="bottom-right"
          className="m-4 sm:m-6 flex flex-col items-end gap-2">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
            <MousePointer2 size={12} className="text-blue-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
              Scroll to Zoom • Pan to Move
            </span>
          </div>
        </Panel>
      </ReactFlow>

     
    </div>
  );
}

function StatRow({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-center bg-slate-800/20 p-2.5 rounded-xl border border-slate-700/30">
      <span className="text-[9px] text-slate-500 font-bold uppercase">
        {label}
      </span>
      <span className={`text-[10px] font-mono font-bold ${color}`}>
        {value}
      </span>
    </div>
  );
}
