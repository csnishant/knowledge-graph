import { GraphData } from "@/types/graph";
import { initialNodes, initialEdges } from "./seedData";

const STORAGE_KEY = "knowledge-graph-data";

export const saveToStorage = (data: GraphData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const loadFromStorage = (): GraphData => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  }
  return { nodes: initialNodes, edges: initialEdges };
};