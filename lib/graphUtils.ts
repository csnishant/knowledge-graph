import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
import { initialNodes, initialEdges } from "./seedData";

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

export const useGraphStore = create<GraphState>()(
  persist(
    (set, get) => ({
      // Refresh hone par pehle localstorage check hoga, 
      // agar wahan kuch nahi hai toh initialNodes load honge.
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,

      setSelectedNode: (node) => set({ selectedNode: node }),

      onNodesChange: (changes: NodeChange[]) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) as GraphNode[] });
      },

      onEdgesChange: (changes: EdgeChange[]) => {
        set({ edges: applyEdgeChanges(changes, get().edges) as GraphEdge[] });
      },

     onConnect: (connection: any) => { // Type 'any' temporarily to allow enhanced edge data
  set({
    edges: addEdge(
      { 
        ...connection, 
        // Note: GraphCanvas se data (level) pass ho raha hai, 
        // yahan manually style override karne ki zaroorat nahi hai.
      },
      get().edges
    ) as GraphEdge[],
  });
},

      addNode: (newNode) => set({ nodes: [...get().nodes, newNode] }),

      updateNode: (id, newData) => {
        const updatedNodes = get().nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
        );
        set({ nodes: updatedNodes });

        // Agar edit kiya hua node select hai, toh selected state ko bhi update karo
        const currentSelected = get().selectedNode;
        if (currentSelected?.id === id) {
          set({ selectedNode: { ...currentSelected, data: { ...currentSelected.data, ...newData } } });
        }
      },
    }),
    {
      name: "neural-graph-data", // Browser ke Application -> Local Storage mein ye key dikhegi
      storage: createJSONStorage(() => localStorage),
    }
  )
);