"use client";

import GraphCanvas from "../components/GraphCanvas";
import NodeSidebar from "../components/NodeSidebar";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <div className="flex-1">
        <GraphCanvas />
      </div>
      <NodeSidebar />
    </div>
  );
}