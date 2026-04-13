import { GraphNode, GraphEdge } from "@/types/graph";

export const initialNodes: GraphNode[] = [
  // --- MEMBERS (Team) ---
  { 
    id: "m1", 
    type: "member", 
    position: { x: 50, y: 150 },
    data: { name: "Nishant Choudhary", role: "Full Stack Developer", level: "member" } 
  },

  // --- CORE LANGUAGES (Level 0) ---
  { 
    id: "s1", 
    type: "custom", 
    position: { x: 400, y: 50 },
    data: { title: "JavaScript", category: "Language", note: "Base for MERN", level: "skill" } 
  },
  { 
    id: "s2", 
    type: "custom", 
    position: { x: 400, y: 250 },
    data: { title: "TypeScript", category: "Language", note: "Type Safety", level: "skill" } 
  },

  // --- FRONTEND STACK (Level 1) ---
  { 
    id: "s3", 
    type: "custom", 
    position: { x: 700, y: 0 },
    data: { title: "React.js", category: "Frontend", note: "UI Library", level: "skill" } 
  },
  { 
    id: "s4", 
    type: "custom", 
    position: { x: 700, y: 100 },
    data: { title: "Next.js", category: "Framework", note: "SSR & Routing", level: "skill" } 
  },

  // --- BACKEND & DB (Level 1) ---
  { 
    id: "s5", 
    type: "custom", 
    position: { x: 700, y: 250 },
    data: { title: "Node.js", category: "Backend", note: "Runtime", level: "skill" } 
  },
  { 
    id: "s6", 
    type: "custom", 
    position: { x: 700, y: 350 },
    data: { title: "MongoDB", category: "Database", note: "NoSQL DB", level: "skill" } 
  },

  // --- AI INTEGRATION ---
  { 
    id: "s7", 
    type: "custom", 
    position: { x: 1000, y: 150 },
    data: { title: "OpenAI SDK", category: "AI/ML", note: "GPT Integration", level: "skill" } 
  }
];

export const initialEdges: GraphEdge[] = [
  // --- EXPERTISE (Member to Skill: Using Blue/Cyan Theme) ---
  { id: "e-m1-s3", source: "m1", target: "s3", type: "custom", data: { level: "expert" }, animated: true },
  { id: "e-m1-s5", source: "m1", target: "s5", type: "custom", data: { level: "familiar" } },
  { id: "e-m1-s7", source: "m1", target: "s7", type: "custom", data: { level: "learning" }, animated: true },

  // --- DEPENDENCIES (Skill to Skill: Using Amber/Prerequisite Theme) ---
  // JavaScript is prerequisite for React & Node
  { id: "d-s1-s3", source: "s1", target: "s3", type: "custom", data: { level: "prerequisite" } },
  { id: "d-s1-s5", source: "s1", target: "s5", type: "custom", data: { level: "prerequisite" } },
  
  // React is prerequisite for Next.js
  { id: "d-s3-s4", source: "s3", target: "s4", type: "custom", data: { level: "prerequisite" } },

  // TypeScript used in Next.js & AI SDK
  { id: "d-s2-s4", source: "s2", target: "s4", type: "custom", data: { level: "prerequisite" } },
  { id: "d-s5-s7", source: "s5", target: "s7", type: "custom", data: { level: "prerequisite" } },
];