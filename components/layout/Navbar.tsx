"use client";
import React, { useState } from "react";
import {
  LayoutGrid,
  Search,
  Plus,
  Zap,
  Settings,
  Menu,
  X,
  Users,
  Code2,
  Network,
  Activity,
} from "lucide-react";

// 1. Interface matches the logic
interface NavbarProps {
  nodes: any[]; // Pure nodes ka array filter karne ke liye
  edgeCount: number; // Links ka total count
  onAddNode: () => void;
  onAddMember: () => void;
}

export default function Navbar({
  nodes, // FIXED: Corrected parameter name
  edgeCount,
  onAddNode,
  onAddMember,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Safely calculate counts even if nodes is empty or undefined
  // Navbar.tsx ke andar
  const memberCount = (nodes || []).filter((n) => n.type === "member").length;
  const skillCount = (nodes || []).filter((n) => n.type === "custom").length;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-5 flex items-center justify-between pointer-events-none">
        {/* --- LEFT: BRAND & DYNAMIC STATS --- */}
        <div className="flex items-center gap-5 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-2 pr-6 rounded-2xl shadow-2xl pointer-events-auto transition-all hover:border-indigo-500/30 group">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform">
            <LayoutGrid size={20} className="text-white" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-[11px] font-black tracking-[0.2em] text-white uppercase italic">
                Skill Matrix
              </h1>
              <div className="flex items-center gap-1 bg-emerald-500/20 px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-tighter">
                  Live
                </span>
              </div>
            </div>

            {/* REAL-TIME STATS ROW */}
            <div className="flex items-center gap-4 mt-1.5">
              <div className="flex items-center gap-1.5">
                <Users size={12} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-400">
                  <span className="text-white">{memberCount}</span> Members
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-400">
                  <span className="text-white">{skillCount}</span> Skills
                </span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                <Network size={12} className="text-cyan-400" />
                <span className="text-[10px] font-bold text-slate-400">
                  <span className="text-white">{edgeCount}</span> Edges
                  
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CENTER: SEARCH & VIEW MODES --- */}
        <div className="hidden lg:flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center bg-slate-950/40 backdrop-blur-3xl border border-white/5 p-1 rounded-xl shadow-inner">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
              <Zap size={14} fill="currentColor" /> Graph
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 hover:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all hover:text-slate-300">
              <Activity size={14} /> Matrix
            </button>
          </div>

          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
              size={15}
            />
            <input
              placeholder="Query matrix..."
              className="w-64 bg-slate-950/60 backdrop-blur-2xl border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-[11px] focus:w-72 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>

        {/* --- RIGHT: ACTIONS & SETTINGS --- */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden md:flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-2xl border border-white/10 p-1.5 rounded-xl">
            <button
              onClick={onAddMember}
              className="group flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-indigo-400 rounded-lg text-[10px] font-black uppercase text-indigo-400 hover:text-white transition-all">
              <Plus
                size={14}
                className="group-hover:rotate-90 transition-transform"
              />
              Member
            </button>

            <button
              onClick={onAddNode}
              className="group flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 hover:border-emerald-400 rounded-lg text-[10px] font-black uppercase text-emerald-400 hover:text-white transition-all">
              <Code2 size={14} /> Skill
            </button>
          </div>

          <button className="p-2.5 bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 text-slate-400 hover:text-white transition-all active:scale-90">
            <Settings size={20} />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30 pointer-events-auto">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 right-0 w-72 bg-[#020617]/98 backdrop-blur-3xl z-[150] border-l border-white/10 transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-5">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">
              System Control
            </span>
            <X
              size={20}
              className="text-slate-500 cursor-pointer hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                onAddMember();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 bg-indigo-600 rounded-2xl text-white font-black text-xs uppercase shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all">
              <span>Add Team Member</span> <Users size={18} />
            </button>
            <button
              onClick={() => {
                onAddNode();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs uppercase hover:bg-white/10 active:scale-[0.98] transition-all">
              <span>Register New Skill</span> <Code2 size={18} />
            </button>
          </div>

          {/* Quick Stats in Mobile */}
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                Members
              </p>
              <p className="text-xl font-black text-white">{memberCount}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                Skills
              </p>
              <p className="text-xl font-black text-white">{skillCount}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
