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
  // --- Naya Delete Logic ---
  deleteNode: (id: string) => void; 
  updateNode: (id: string, data: any) => void;
}

export const useGraphStore = create<GraphState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,
      selectedNode: null,

      setSelectedNode: (node) => set({ selectedNode: node }),

      // React Flow ke internal changes handle karne ke liye
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes) as GraphNode[],
        });
      },

      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges) as GraphEdge[],
        });
      },

      // Naya Connection handle karne ke liye
      onConnect: (connection: Connection | any) => {
        set({
          edges: addEdge(
            { 
              ...connection, 
              // Custom edges ke liye id generate karna achi practice hai
              id: `e-${connection.source}-${connection.target}-${Date.now()}`,
              type: "custom" 
            }, 
            get().edges
          ) as GraphEdge[],
        });
      },

      // Naya Node add karne ke liye
      addNode: (newNode) => set({ nodes: [...get().nodes, newNode] }),

      // --- DELETE NODE LOGIC ---
      // Ye function node aur usse judi saari edges ko ek saath uda dega
      deleteNode: (id: string) => {
        set({
          nodes: get().nodes.filter((node) => node.id !== id),
          edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
          // Agar deleted node selected tha, toh selection clear karo
          selectedNode: get().selectedNode?.id === id ? null : get().selectedNode
        });
      },

      // Node Update Logic (Inline editing ke liye)
      updateNode: (id, newData) => {
        const updatedNodes = get().nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
        );
        
        set({ nodes: updatedNodes });

        // Sync selected node state
        const currentSelected = get().selectedNode;
        if (currentSelected?.id === id) {
          set({ 
            selectedNode: { ...currentSelected, data: { ...currentSelected.data, ...newData } } 
          });
        }
      },
    }),
    {
      name: "neural-graph-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);