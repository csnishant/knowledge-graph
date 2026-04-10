import { Node, Edge } from "@xyflow/react";

export type GraphNode = Node<{
  title: string;
  note: string;
}>;

export type GraphEdge = Edge<{
  label: string;
}>;

export type GraphData = {
nodes: Node[];
edges: Edge[];
};