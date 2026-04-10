"use client";
import React, { useState } from "react";
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
  Menu,
  X,
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-3 flex items-center justify-between pointer-events-none">
        {/* --- LEFT SECTION (Logo & Stats) --- */}
        <div className="flex items-center gap-3 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl pointer-events-auto shadow-2xl">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <LayoutGrid size={20} className="text-white" />
          </div>
          <div className="hidden sm:block">
            {" "}
            {/* Mobile par text hide kar diya for space */}
            <h1 className="text-xs font-black tracking-tight text-white leading-none">
              Knowledge Graph
            </h1>
            <p className="text-[10px] font-medium text-slate-400 mt-1">
              {nodeCount} nodes • {edgeCount} edges
            </p>
          </div>
        </div>

        {/* --- DESKTOP CENTER SECTION (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center bg-slate-950/60 backdrop-blur-2xl border border-white/5 p-1 rounded-xl shadow-2xl">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-xs font-bold text-indigo-400">
              <Zap size={14} /> 2D Graph
            </button>
            <div className="flex px-2 gap-3 text-slate-500">
              <Settings size={16} className="hover:text-white cursor-pointer" />
              <Share2 size={16} className="hover:text-white cursor-pointer" />
              <History size={16} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="relative group w-64 lg:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              placeholder="Search nodes..."
              className="w-full bg-slate-950/60 backdrop-blur-2xl border border-white/5 rounded-xl py-2 pl-12 pr-4 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all text-white"
            />
          </div>
        </div>

        {/* --- DESKTOP RIGHT SECTION (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-3 pointer-events-auto">
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

          <div className="flex items-center gap-4 px-4 py-2 bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/5 text-slate-400">
            <BarChart3 size={16} className="hover:text-white" />
            <Settings size={16} className="hover:text-white" />
            <HelpCircle size={16} className="hover:text-white" />
          </div>
        </div>

        {/* --- MOBILE HAMBURGER BUTTON --- */}
        <button
          onClick={toggleMenu}
          className="md:hidden pointer-events-auto bg-slate-900/80 p-2.5 rounded-xl border border-white/10 text-white shadow-2xl">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-slate-950/95 backdrop-blur-2xl z-[150] border-l border-white/10 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full p-6 space-y-8 overflow-y-auto pt-20">
          {/* Mobile Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Mobile Actions */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-1">
              Quick Actions
            </p>
            <button
              onClick={() => {
                onAddNode();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-4 bg-indigo-600 rounded-xl text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              <Plus size={20} /> Add New Node
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm">
              <Share2 size={20} className="rotate-90" /> Add Connection
            </button>
          </div>

          {/* Mobile Utilities Grid */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-1">
              Tools & Settings
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: BarChart3, label: "Stats" },
                { icon: History, label: "History" },
                { icon: Settings, label: "Settings" },
                { icon: Download, label: "Export" },
                { icon: Navigation, label: "Map" },
                { icon: HelpCircle, label: "Help" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <item.icon size={20} className="text-slate-400 mb-2" />
                  <span className="text-[10px] text-slate-300 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stats Summary */}
          <div className="mt-auto bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-xs text-indigo-300 font-semibold mb-1">
              Graph Health
            </p>
            <p className="text-[10px] text-slate-400">
              Current active session with {nodeCount} objects.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay (to close when clicking outside) */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] md:hidden"
        />
      )}
    </>
  );
}
