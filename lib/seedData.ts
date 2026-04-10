import { GraphNode, GraphEdge } from "@/types/graph";

export const initialNodes: GraphNode[] = [
  { id: "1", title: "React", note: "A JavaScript library for building user interfaces.", position: { x: 250, y: 0 } },
  { id: "2", title: "Next.js", note: "React framework with SSR.", position: { x: 100, y: 100 } },
  { id: "3", title: "TypeScript", note: "Typed superset of JavaScript.", position: { x: 400, y: 100 } },
  { id: "4", title: "State Management", note: "Context, Zustand, Redux.", position: { x: 0, y: 200 } },
  { id: "5", title: "Component Design", note: "Reusable UI components.", position: { x: 200, y: 200 } },
  { id: "6", title: "Performance", note: "Memoization, lazy loading.", position: { x: 100, y: 300 } },
  { id: "7", title: "Testing", note: "Unit, integration, e2e.", position: { x: 300, y: 300 } },
  { id: "8", title: "CSS & Styling", note: "Tailwind, CSS Modules.", position: { x: 500, y: 200 } },
];

export const initialEdges: GraphEdge[] = [
  { id: "e2-1", source: "2", target: "1", label: "built on" },
  { id: "e1-3", source: "1", target: "3", label: "pairs well with" },
  { id: "e1-4", source: "1", target: "4", label: "uses" },
  { id: "e1-5", source: "1", target: "5", label: "guides" },
  { id: "e2-6", source: "2", target: "6", label: "improves" },
  { id: "e1-7", source: "1", target: "7", label: "requires" },
  { id: "e1-8", source: "1", target: "8", label: "styled with" },
  { id: "e4-6", source: "4", target: "6", label: "impacts" },
  { id: "e5-6", source: "5", target: "6", label: "impacts" },
];