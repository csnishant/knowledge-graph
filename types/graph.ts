import { Node, Edge } from "@xyflow/react";

// Ye batata hai ki ek Node ke andar kya-kya data ho sakta hai
export type NodeCardData = {
  title: string;
  note: string;
  color?: "blue" | "purple" | "emerald" | "rose"; // Sirf ye 4 colors allowed hain
  category?: string;
};

// Yahan hum generic Node ko apni NodeCardData de rahe hain
export type GraphNode = Node<NodeCardData>;

export type GraphEdge = Edge<{
  label?: string;
}>;

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};