import { create } from "zustand";
import { 
  addEdge, 
  Connection, 
  EdgeChange, 
  NodeChange, 
  applyEdgeChanges, 
  applyNodeChanges, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect 
} from "@xyflow/react";
import { GraphEdge, GraphNode } from "@/types/graph";

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: GraphNode | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setSelectedNode: (node: GraphNode | null) => void;
  addNode: (node: GraphNode) => void;
  updateNode: (id: string, data: { title?: string; note?: string }) => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  setSelectedNode: (node) => set({ selectedNode: node }),

  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) as GraphNode[] });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) as GraphEdge[] });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        { ...connection, animated: true, style: { stroke: "#3b82f6", strokeWidth: 2 } },
        get().edges
      ) as GraphEdge[],
    });
  },

  addNode: (newNode) => set({ nodes: [...get().nodes, newNode] }),

  updateNode: (id, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    });
  },
}));