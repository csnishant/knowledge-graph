"use client";

import dynamic from "next/dynamic";
import NodeSidebar from "../components/NodeSidebar";

// ✅ FIX: dynamic import with ssr false
const GraphCanvas = dynamic(() => import("../components/GraphCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <div className="flex-1">
        <GraphCanvas />
      </div>
    </div>
  );
}
