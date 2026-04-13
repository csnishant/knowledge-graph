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
import SkillNode from "./graph/SkillNode";
import LabeledEdge from "./LabelEdge";
import Map from "./Map";
import ActionControls from "./ActionsControls";
import Legend from "./Legend";
import ConnectionModal from "./ConnectionModal";
import { useGraphStore } from "../lib/graphUtils";

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
  // GraphCanvas.tsx ke upar state definition change karein

  const [modalPos, setModalPos] = useState<{
    x: number;
    y: number;
    sourceType?: string;
    targetType?: string;
  } | null>(null);

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

  // --- VALIDATION LOGIC ---
  // Isse 'Skill to Skill' connection block ho jayega
  const isValidConnection = useCallback(
    (edge: any) => {
      const { source, target } = edge;
      if (!source || !target) return false;

      const sourceNode = nodes.find((n) => n.id === source);
      const targetNode = nodes.find((n) => n.id === target);

      // Allow Member to Skill
      if (sourceNode?.type === "member" && targetNode?.type === "custom")
        return true;

      // Allow Skill to Skill (Dependency)
      if (sourceNode?.type === "custom" && targetNode?.type === "custom")
        return true;

      return false;
    },
    [nodes],
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
        level: "skill",
      },
    });
  }, [addNode, nodes.length]);

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
        level: "member",
      },
    });
  }, [addNode, nodes.length]);

const handleConnect = useCallback(
  (params: Connection) => {
    const event = window.event as MouseEvent;

    // Nodes find karein taaki unka type pata chale
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);

    setPendingConnection(params);

    // Ab ye object state ke naye type se match karega
    setModalPos({
      x: event.clientX,
      y: event.clientY,
      sourceType: sourceNode?.type,
      targetType: targetNode?.type,
    });
  },
  [nodes],
);

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
    setPendingConnection(null);
    setModalPos(null);
  };

  if (!mounted) return null;

  return (
    <div className="flex-grow h-screen w-full bg-[#020617] relative text-white overflow-hidden">
      {/* 1. CONNECTION MODAL */}
      <ConnectionModal
        position={modalPos}
        onSelect={onLevelSelect}
        onCancel={() => {
          setPendingConnection(null);
          setModalPos(null);
        }}
      />

      {/* 2. NAVBAR */}
      <Navbar
        nodes={nodes}
        edgeCount={edges.length}
        onAddNode={addNewSkill}
        onAddMember={addNewMember}
      />

      {/* Atmospheric Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 3. REACT FLOW CANVAS */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        isValidConnection={isValidConnection} // <--- Critical Fix: Validation applied here
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
