import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FileText, Sparkles } from "lucide-react";

export default function NodeCard({ data, selected }: any) {
  return (
    <div className={`min-w-[180px] p-4 rounded-2xl border-2 transition-all duration-300 shadow-2xl
      ${selected 
        ? "bg-blue-600 border-blue-300 scale-105" 
        : "bg-slate-900/90 border-slate-700 hover:border-blue-500/50 backdrop-blur-md"}`}>
      
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-blue-400 !border-slate-900" />
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className={selected ? "text-blue-200" : "text-blue-400"} />
          <h4 className={`font-bold text-sm truncate ${selected ? "text-white" : "text-slate-100"}`}>
            {data.title || "New Topic"}
          </h4>
        </div>
        
        {data.note && (
          <p className={`text-[10px] line-clamp-2 ${selected ? "text-blue-100" : "text-slate-400"}`}>
            {data.note}
          </p>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-blue-400 !border-slate-900" />
    </div>
  );
}