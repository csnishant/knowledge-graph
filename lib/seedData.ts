import { GraphNode, GraphEdge } from "@/types/graph";

export const initialNodes: GraphNode[] = [
  { 
    id: "1", 
    type: "custom", 
    position: { x: 250, y: 0 },
    data: { 
      title: "React", 
      note: "Library for UI", 
      color: "blue", // Alag color
      category: "CORE" 
    } 
  },
  { 
    id: "2", 
    type: "custom", 
    position: { x: 100, y: 100 },
    data: { 
      title: "Next.js", 
      note: "React Framework", 
      color: "purple", // Alag color
      category: "FRAMEWORK" 
    } 
  },
  { 
    id: "4", 
    type: "custom", 
    position: { x: 0, y: 200 },
    data: { 
      title: "Zustand", 
      note: "State Management", 
      color: "emerald", // Alag color
      category: "STATE" 
    } 
  }
];

export const initialEdges: GraphEdge[] = [
  { id: "e2-1", source: "2", target: "1", label: "built on", animated: true },
  { id: "e1-3", source: "1", target: "3", label: "pairs well with", animated: true },
  { id: "e1-4", source: "1", target: "4", label: "uses", animated: true },
  { id: "e1-5", source: "1", target: "5", label: "guides", animated: true },
  { id: "e2-6", source: "2", target: "6", label: "improves", animated: true },
  { id: "e1-7", source: "1", target: "7", label: "requires", animated: true },
  { id: "e1-8", source: "1", target: "8", label: "styled with", animated: true },
  { id: "e4-6", source: "4", target: "6", label: "impacts", animated: true },
  { id: "e5-6", source: "5", target: "6", label: "impacts", animated: true },
];