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
import { MousePointer2 } from "lucide-react";
import "@xyflow/react/dist/style.css";

// Components Import
import Navbar from "./Navbar"; // Naya Navbar import
import NodeCard from "./NodeCard";
import { useGraphStore } from "../lib/graphUtils";

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

  // Naye Navbar ke liye function pass karna
  const addNewNode = useCallback(() => {
    const newNode = {
      id: Math.random().toString(36).substr(2, 9),
      type: "custom",
      position: {
        x: Math.random() * 600 - 300,
        y: Math.random() * 400 - 200,
      },
      data: {
        title: "New Research Unit",
        note: "Data stream initializing...",
      },
    };
    addNode(newNode);
  }, [addNode]);

  if (!mounted) return null;

  return (
    <div className="flex-grow h-[100dvh] w-full bg-[#020617] relative text-white font-sans overflow-hidden">
      {/* 1. Naya Navbar Yahan Add Kiya Hai */}
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
        // Settings for smooth navigation
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

        {/* Humne purane Panels (top-left, top-center) hata diye hain kyunki wo Navbar mein hain */}

        {/* RADAR STYLE MINIMAP (Bottom Right) */}
        <div className="hidden md:block">
          <MiniMap
            zoomable
            pannable
            className="!bg-slate-950/80 !border-white/10 !rounded-[2rem] !shadow-2xl !m-8 !w-56 !h-40 backdrop-blur-xl border overflow-hidden"
            nodeColor="#6366f1"
            maskColor="rgba(2, 6, 23, 0.7)"
          />
        </div>

        {/* FLOATING ZOOM CONTROLS */}
        <Panel position="bottom-left" className="m-8">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-1 shadow-2xl">
            <Controls
              showInteractive={false}
              className="!static !flex !flex-col !bg-transparent !border-none !shadow-none !m-0"
            />
          </div>
        </Panel>

        {/* INTERACTION INFO */}
        <Panel position="bottom-center" className="mb-8">
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2">
            <MousePointer2 size={12} className="text-indigo-400" />
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
              Navigation Active • Pan to Move
            </span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
