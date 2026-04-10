import { create } from "zustand";
import {
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import { loadFromStorage, saveToStorage } from "./storage";

type CustomNode = Node<{
  title: string;
  note: string;
}>;

type CustomEdge = Edge<{
  label: string;
}>;

interface GraphState {
nodes: Node[];
edges: Edge[];
selectedNode: Node | null;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

 setSelectedNode: (node: Node | null) => void;
  updateNode: (id: string, data: any) => void;
  addNode: () => void;
}

const stored = loadFromStorage();

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: stored?.nodes || [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { title: "React", note: "UI library" },
    },
  ],
  edges: stored?.edges || [],
  selectedNode: null,

  onNodesChange: (changes) => {
    const nextNodes = applyNodeChanges(changes, get().nodes);
    set({ nodes: nextNodes });
    saveToStorage({ nodes: nextNodes, edges: get().edges });
  },

  onEdgesChange: (changes) => {
    const nextEdges = applyEdgeChanges(changes, get().edges);
    set({ edges: nextEdges });
    saveToStorage({ nodes: get().nodes, edges: nextEdges });
  },

  onConnect: (params) => {
    const nextEdges = addEdge(
      { ...params, label: "relates to" },
      get().edges
    );
    set({ edges: nextEdges });
    saveToStorage({ nodes: get().nodes, edges: nextEdges });
  },

  setSelectedNode: (node) => set({ selectedNode: node }),

  updateNode: (id, newData) => {
    const nextNodes = get().nodes.map((n) =>
      n.id === id
        ? { ...n, data: { ...(n.data || {}), ...newData } }
        : n
    );
    set({ nodes: nextNodes });
    saveToStorage({ nodes: nextNodes, edges: get().edges });
  },

  addNode: () => {
    const newNode: CustomNode = {
      id: Date.now().toString(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { title: "New Node", note: "" },
    };

    const nextNodes = [...get().nodes, newNode];
    set({ nodes: nextNodes });
    saveToStorage({ nodes: nextNodes, edges: get().edges });
  },
}));