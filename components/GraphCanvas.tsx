"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Panel,
  BackgroundVariant,
  Connection,
} from "@xyflow/react";
import { MousePointer2 } from "lucide-react";
import "@xyflow/react/dist/style.css";

// Components
import Navbar from "./layout/Navbar";
import MemberNode from "./graph/MemberNode";
import LabeledEdge from "./LabelEdge";
import Map from "./Map";
import ActionControls from "./ActionsControls";
import Legend from "./Legend";
import ConnectionModal from "./ConnectionModal"; // Import your new component
import { useGraphStore } from "../lib/graphUtils";
import SkillNode from "./graph/SkillNode";

const LAYERS = {
  MEMBERS: 100,
  SKILLS: 600,
};

export default function GraphCanvas() {
  const [mounted, setMounted] = useState(false);

  // --- MODAL STATES ---
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(
    null,
  );
  const [modalPos, setModalPos] = useState<{ x: number; y: number } | null>(
    null,
  );

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

  const nodeTypes = useMemo(
    () => ({
      custom: SkillNode,
      member: MemberNode,
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      custom: LabeledEdge,
    }),
    [],
  );

  const addNewSkill = useCallback(() => {
    const id = `skill_${Date.now()}`;
    addNode({
      id,
      type: "custom",
      position: { x: LAYERS.SKILLS, y: nodes.length * 160 + 50 },
      data: {
        title: "New Skill",
        category: "Tech Stack",
        expertCount: 0,
        level: "skill", // <--- Ye add karein
      },
    });
  }, [addNode, nodes]);

  const addNewMember = useCallback(() => {
    const id = `member_${Date.now()}`;
    addNode({
      id,
      type: "member",
      position: { x: LAYERS.MEMBERS, y: nodes.length * 180 + 50 },
      data: {
        name: "New Member",
        role: "Team Lead",
        count: 0,
        level: "member", // <--- Ye add karein
      },
    });
  }, [addNode, nodes]);

  // --- 4. IMPROVED CONNECTION LOGIC (No Prompt) ---
  const handleConnect = useCallback((params: Connection) => {
    // Modal kholne ke liye current mouse position capture karein
    const event = window.event as MouseEvent;
    setPendingConnection(params);
    setModalPos({ x: event.clientX, y: event.clientY });
  }, []);

  const onLevelSelect = (level: string) => {
    if (pendingConnection) {
      const enhancedEdge = {
        ...pendingConnection,
        id: `e-${pendingConnection.source}-${pendingConnection.target}-${Date.now()}`,
        type: "custom",
        animated: level === "expert",
        data: { level },
      };
      onConnect(enhancedEdge);
    }
    // Modal close karein
    setPendingConnection(null);
    setModalPos(null);
  };

  if (!mounted) return null;

  return (
    <div className="flex-grow h-screen w-full bg-[#020617] relative text-white overflow-hidden">
      {/* 1. FLOATING DROP-DOWN MODAL */}
      <ConnectionModal
        position={modalPos}
        onSelect={onLevelSelect}
        onCancel={() => {
          setPendingConnection(null);
          setModalPos(null);
        }}
      />

      <Navbar
        nodes={nodes} // POORA array bhejo, sirf length nahi
        edgeCount={edges.length} // Ye sahi hai
        onAddNode={addNewSkill}
        onAddMember={addNewMember}
      />
      {/* Atmospheric Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={(_, node) => setSelectedNode(node as any)}
        onPaneClick={() => setSelectedNode(null)}
        fitView
        defaultEdgeOptions={{ type: "custom", interactionWidth: 20 }}
        connectionLineStyle={{
          stroke: "#22d3ee",
          strokeWidth: 2,
          strokeDasharray: "5,5",
        }}>
        <Background
          color="#1e293b"
          gap={40}
          size={1}
          variant={BackgroundVariant.Dots}
          className="opacity-20"
        />

        <Map />
        <ActionControls />
        <Legend />

        <Panel position="bottom-center" className="mb-10 pointer-events-none">
          <div className="flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-xl bg-slate-900/40 border border-white/5 shadow-2xl">
            <MousePointer2 size={12} className="text-cyan-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
              Drag from Member to Skill • Select Level on Release
            </span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
