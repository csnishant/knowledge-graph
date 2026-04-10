import { GraphNode, GraphEdge } from "@/types/graph";

export const initialNodes: GraphNode[] = [
  { 
    id: "1", 
    type: "custom", // Custom type add karna zaroori hai agar aap NodeCard use kar rahe hain
    position: { x: 250, y: 0 },
    data: { title: "React", note: "A JavaScript library for building user interfaces." } 
  },
  { 
    id: "2", 
    type: "custom",
    position: { x: 100, y: 100 },
    data: { title: "Next.js", note: "React framework with SSR." } 
  },
  { 
    id: "3", 
    type: "custom",
    position: { x: 400, y: 100 },
    data: { title: "TypeScript", note: "Typed superset of JavaScript." } 
  },
  { 
    id: "4", 
    type: "custom",
    position: { x: 0, y: 200 },
    data: { title: "State Management", note: "Context, Zustand, Redux." } 
  },
  { 
    id: "5", 
    type: "custom",
    position: { x: 200, y: 200 },
    data: { title: "Component Design", note: "Reusable UI components." } 
  },
  { 
    id: "6", 
    type: "custom",
    position: { x: 100, y: 300 },
    data: { title: "Performance", note: "Memoization, lazy loading." } 
  },
  { 
    id: "7", 
    type: "custom",
    position: { x: 300, y: 300 },
    data: { title: "Testing", note: "Unit, integration, e2e." } 
  },
  { 
    id: "8", 
    type: "custom",
    position: { x: 500, y: 200 },
    data: { title: "CSS & Styling", note: "Tailwind, CSS Modules." } 
  },
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