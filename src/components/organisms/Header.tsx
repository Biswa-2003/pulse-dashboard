"use client";

import {
    Search, ChevronDown, Bell, Star, Wallet,
    LayoutGrid, Settings, Sun, Monitor, Shield, Menu
} from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-white/5 bg-transparent glass-effect px-4">
            {/* Left: Logo & Nav */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                {/* Advanced Logo */}
                <div className="flex items-center gap-2.5 group cursor-pointer">
                    <div className="relative h-8 w-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-lg group-hover:bg-cyan-400/30 transition-all duration-500" />
                        <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[#060b14] to-[#0f1729] border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all overflow-hidden">
                            {/* Abstract "Pulse" Shape - SVG */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400 rotate-0 transition-transform duration-500 group-hover:rotate-180">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_currentColor]" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
                            </svg>
                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-scan" />
                        </div>
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-xl font-bold tracking-tight text-white font-[family-name:var(--font-display)] leading-none mt-1">NOVA</span>
                        <span className="text-[10px] font-medium tracking-[0.2em] text-cyan-500 uppercase leading-none">Pulse</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="hidden items-center gap-6 lg:flex">
                    {['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className={`text-sm font-medium transition-colors ${item === 'Pulse' ? 'text-cyan-400' : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                        >
                            {/* Dot for Pulse */}
                            {item === 'Pulse' && (
                                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            )}
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Center: Search (Hidden on small mobile, visible on lg) */}
            <div className="mx-4 hidden max-w-md flex-1 lg:block">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300 transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="Search by token or CA..."
                        className="h-9 w-full rounded-full border border-white/10 bg-white/[0.03] pl-9 pr-4 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500">
                        /
                    </div>
                </div>
            </div>

            {/* Right: Controls & Wallet */}
            <div className="flex items-center gap-3">
                {/* Chain Selector */}
                <div className="hidden items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 hover:bg-cyan-500/20 cursor-pointer lg:flex">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-400" />
                    <span className="text-xs font-bold text-cyan-400">SOL</span>
                    <ChevronDown size={12} className="text-cyan-400" />
                </div>

                {/* Deposit Button */}
                <button className="hidden h-8 items-center rounded-full bg-blue-600 px-4 text-xs font-bold text-white hover:bg-blue-700 shadow-[0_4px_12px_rgba(37,99,235,0.3)] lg:flex">
                    Deposit
                </button>

                <div className="h-4 w-[1px] bg-white/10 hidden lg:block" />

                {/* Icons */}
                <button className="text-zinc-400 hover:text-white transition-colors">
                    <Star size={18} />
                </button>
                <button className="text-zinc-400 hover:text-white transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* Wallet Settings Group */}
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                        <Wallet size={14} />
                    </div>
                    <div className="flex items-center gap-1 pr-2">
                        <ChevronDown size={12} className="text-zinc-500" />
                    </div>
                </div>

                {/* Mobile Menu */}
                <button className="lg:hidden text-zinc-400">
                    <Menu size={20} />
                </button>
            </div>
        </header>
    );
}
