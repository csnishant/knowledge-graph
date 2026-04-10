"use client";

import React from "react";
import {
  ReactFlow,
  Background,
  Controls
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useGraphStore } from "../lib/graphUtils";

export default function GraphCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
  } = useGraphStore();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button
        onClick={addNode}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
          padding: "8px",
          background: "black",
          color: "white",
        }}
      >
        Add Node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}