import { Node, Edge } from "@xyflow/react";

export type NodeCardData = {
  // level ko optional (?) kar dein
  level?: "learning" | "familiar" | "expert" | "member" | "skill"; 
  title?: string;
  expertCount?: number;
  category?: string;
  name?: string;
  role?: string;
  count?: number;
  note?: string;
  // ... baaki properties
};

export type GraphNode = Node<NodeCardData>;

// --- Edge Types according to Legend ---
export type GraphEdge = Edge<{
  level?: "learning" | "familiar" | "expert"; // Matches Legend levels
  label?: string;
}>;

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};