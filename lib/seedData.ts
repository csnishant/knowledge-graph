import { GraphNode, GraphEdge } from "@/types/graph";

export const initialNodes: GraphNode[] = [
  { 
    id: "m1", 
    type: "member", 
    position: { x: 0, y: 0 },
    data: { name: "Nishant", role: "Developer", count: 0, level: "member" } 
  },
  { 
    id: "1", 
    type: "custom", 
    position: { x: 250, y: 0 },
    data: { 
      title: "React", 
      note: "Library for UI", 
      color: "blue", 
      category: "CORE",
      level: "skill" // Consistency ke liye level add kiya
    } 
  },
  { 
    id: "2", 
    type: "custom", 
    position: { x: 100, y: 100 },
    data: { 
      title: "Next.js", 
      note: "React Framework", 
      color: "purple", 
      category: "FRAMEWORK",
      level: "skill"
    } 
  },
  { 
    id: "4", 
    type: "custom", 
    position: { x: 0, y: 200 },
    data: { 
      title: "Zustand", 
      note: "State Management", 
      color: "emerald", 
      category: "STATE",
      level: "skill"
    } 
  }
];

// Sirf wahi edges rakhein jinke source aur target upar exist karte hain
export const initialEdges: GraphEdge[] = [
  { id: "e-m1-1", source: "m1", target: "1", label: "Knows", animated: true },
  { id: "e2-1", source: "2", target: "1", label: "built on", animated: true },
  { id: "e1-4", source: "1", target: "4", label: "uses", animated: true },
];