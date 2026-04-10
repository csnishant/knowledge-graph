"use client";
import React from "react";
import {
  LayoutGrid,
  Search,
  Plus,
  Share2,
  BarChart3,
  Zap,
  Settings,
  History,
  Navigation,
  Download,
  Volume2,
  HelpCircle,
} from "lucide-react";

interface NavbarProps {
  nodeCount: number;
  edgeCount: number;
  onAddNode: () => void;
}

export default function Navbar({
  nodeCount,
  edgeCount,
  onAddNode,
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3 flex items-center justify-between pointer-events-none">
      {/* Left Section: Logo & Stats */}
      <div className="flex items-center gap-3 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl pointer-events-auto shadow-2xl">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <LayoutGrid size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xs font-black tracking-tight text-white leading-none">
            Knowledge Graph
          </h1>
          <p className="text-[10px] font-medium text-slate-400 mt-1">
            {nodeCount} nodes • {edgeCount} edges
          </p>
        </div>
      </div>

      {/* Center Section: View Toggle & Search */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* View Toggle */}
        <div className="flex items-center bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-1 rounded-xl shadow-2xl">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-xs font-bold text-indigo-400 transition-all">
            <Zap size={14} />
            2D Graph
          </button>
          <div className="flex px-2 gap-3 text-slate-500">
            <Settings
              size={16}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <Share2
              size={16}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <History
              size={16}
              className="hover:text-white cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group w-64 md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400"
            size={16}
          />
          <input
            placeholder="Search nodes... ( / )"
            className="w-full bg-slate-950/60 backdrop-blur-2xl border border-white/5 rounded-xl py-2 pl-12 pr-4 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Right Section: Actions & Tools */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-1 bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-1 rounded-xl shadow-2xl">
          <button
            onClick={onAddNode}
            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/5 rounded-lg text-xs font-bold text-slate-300 transition-all">
            <Plus size={16} /> Node
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/5 rounded-lg text-xs font-bold text-slate-300 transition-all">
            <Share2 size={16} className="rotate-90" /> Edge
          </button>
        </div>

        {/* Utility Icons */}
        <div className="flex items-center gap-4 px-4 py-2 bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/5 text-slate-400">
          <BarChart3 size={16} className="hover:text-white cursor-pointer" />
          <Zap
            size={16}
            className="hover:text-white cursor-pointer text-indigo-400"
          />
          <Settings size={16} className="hover:text-white cursor-pointer" />
          <History size={16} className="hover:text-white cursor-pointer" />
          <Navigation size={16} className="hover:text-white cursor-pointer" />
          <Download size={16} className="hover:text-white cursor-pointer" />
          <Volume2 size={16} className="hover:text-white cursor-pointer" />
          <HelpCircle size={16} className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
