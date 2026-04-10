"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ReactFlow, Background, Panel, BackgroundVariant } from "@xyflow/react";
import { MousePointer2 } from "lucide-react";
import "@xyflow/react/dist/style.css";

// --- IMPORTANT: Imports check karein ---
import Navbar from "./Navbar";
import NodeCard from "./NodeCard";
import { useGraphStore } from "../lib/graphUtils";
import Map from "./Map";
import ActionControls from "./ActionsControls";
// Apna GraphNode type yahan import karein
import { GraphNode } from "../types/graph";

const nodeTypes = { custom: NodeCard };

export default function GraphCanvas() {
  const [mounted, setMounted] = useState(false);

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

  // --- ADD NEW NODE FUNCTION (FIXED) ---
  const addNewNode = useCallback(() => {
    // 1. 'as const' use karein taaki TS ko pata chale sirf yahi 4 colors hain
    const colors = ["blue", "purple", "emerald", "rose"] as const;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // 2. newNode ko 'GraphNode' ka type dein
    const newNode: GraphNode = {
      id: Math.random().toString(36).substr(2, 9),
      type: "custom",
      position: {
        x: Math.random() * 600 - 300,
        y: Math.random() * 400 - 200,
      },
      data: {
        title: "New Research Unit",
        note: "Data stream initializing...",
        color: randomColor, // Ab error nahi aayega
        category: `${randomColor.toUpperCase()}_UNIT`,
      },
    };

    addNode(newNode);
  }, [addNode]);

  // Mounted check hamesha return se pehle
  if (!mounted) return null;

  return (
    <div className="flex-grow h-[100dvh] w-full bg-[#020617] relative text-white font-sans overflow-hidden">
      <Navbar
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onAddNode={addNewNode}
      />

      {/* Background Animated Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
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
        minZoom={0.2}
        maxZoom={1.5}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        panOnScroll={true}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: "#6366f1",
            strokeWidth: 2,
            filter: "drop-shadow(0 0 5px rgba(99, 102, 241, 0.4))",
          },
        }}>
        <Background
          color="#1e293b"
          gap={35}
          size={1}
          variant={BackgroundVariant.Dots}
          className="opacity-30"
        />

        <Map />
        <ActionControls />

        <Panel
          position="bottom-center"
          className="mb-6 md:mb-10 w-full flex justify-center pointer-events-none">
          <div
            className={`
    /* Layout & Spacing */
    flex items-center gap-1.5 md:gap-2 
    px-3 py-1.5 md:px-4 md:py-2 
    rounded-full backdrop-blur-md 
    
    /* Colors & Border */
    bg-indigo-500/10 border border-indigo-500/20 
    
    /* Animation & Shadow */
    shadow-[0_0_20px_rgba(99,102,241,0.1)]
    animate-in fade-in slide-in-from-bottom-4 duration-1000
  `}>
            <MousePointer2
              size={10}
              className="text-indigo-400 md:w-3 md:h-3"
            />

            <span
              className={`
      /* Text Styling */
      font-black uppercase tracking-[0.1em] md:tracking-widest 
      text-indigo-300 whitespace-nowrap
      
      /* Responsive Font Size */
      text-[8px] md:text-[10px]
    `}>
              Navigation Active <span className="hidden xs:inline mx-1">•</span>{" "}
              <span className="block xs:inline">Pan to Move</span>
            </span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
