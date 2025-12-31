"use client";

import React, { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import { Token } from '@/lib/types';
import Typography from '../atoms/Typography';
import Tooltip from '../atoms/Tooltip';
import Popover from '../atoms/Popover';
import {
    Globe, Twitter, Send, Zap,
    TrendingUp, BarChart3, Search, User,
    AlertCircle, ZapOff, MoreHorizontal, Copy, ExternalLink, Eye, Bell
} from 'lucide-react';
import { formatMarketCap } from '@/lib/format';
import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/uiSlice';

interface TokenCardProps {
    token: Token;
    onClick?: () => void;
}

const TokenCard = memo(function TokenCard({ token, onClick }: TokenCardProps) {
    const dispatch = useAppDispatch();

    // Simulate CA address
    const caPrefix = token.id.split('-')[1] || '5Aps';
    const caSuffix = 'pump';

    // Flash Effect Logic
    const [flash, setFlash] = useState<'green' | 'red' | null>(null);
    const prevPrice = useRef(token.price);

    useEffect(() => {
        if (token.price > prevPrice.current) {
            setFlash('green');
        } else if (token.price < prevPrice.current) {
            setFlash('red');
        }
        prevPrice.current = token.price;

        const timer = setTimeout(() => setFlash(null), 1000);
        return () => clearTimeout(timer);
    }, [token.price]);

    // Random percentage values for the badges
    const percentages = [
        { value: Math.floor(Math.random() * 20), color: 'green', time: '' },
        { value: Math.floor(Math.random() * 15), color: 'green', time: '17h' },
        { value: Math.floor(Math.random() * 10), color: 'red', time: '' },
        { value: 0, color: 'zinc', time: '' },
        { value: Math.floor(Math.random() * 8), color: 'red', time: '' },
    ];

    const handleCardClick = () => {
        dispatch(openModal(token.id));
        if (onClick) onClick();
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className={`group relative bg-blue-900/[0.05] hover:bg-cyan-500/[0.08] border border-white/5 rounded-2xl p-3 transition-all duration-300 ease-out cursor-pointer overflow-hidden backdrop-blur-md
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)] hover:-translate-y-[4px]
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                    ${flash === 'green' ? 'ring-1 ring-green-500/50 bg-green-500/10' :
                        flash === 'red' ? 'ring-1 ring-red-500/50 bg-red-500/10' : ''}`}
            >
                {/* Holographic Top Highlight */}
                <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/10 to-transparent blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="flex items-center justify-between gap-2 relative z-10 w-full h-full">
                    {/* 1. Left Section: Logo & Identity */}
                    <div className="flex items-center gap-3 w-[30%] overflow-hidden">
                        <Popover trigger={
                            <div className="relative w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-cyan-500/50 shadow-lg shadow-black/40 transition-all duration-300">
                                <Image src={token.logoUrl || ''} alt={token.symbol} fill unoptimized className="object-cover" />
                                {/* Status Dot */}
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-black rounded-tl-md flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            </div>
                        }>
                            <div className="p-2 space-y-2">
                                <p className="text-sm font-bold">{token.name}</p>
                                <div className="grid grid-cols-2 gap-2"><button className="px-2 py-1 text-xs bg-blue-600 rounded text-white">Copy</button><button className="px-2 py-1 text-xs bg-zinc-700 rounded text-white">Scan</button></div>
                            </div>
                        </Popover>

                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                                <Typography variant="body" weight="black" className="text-zinc-100 text-[12px] tracking-tight truncate">{token.symbol}</Typography>
                                {token.age.includes('m') && <span className="text-[8px] px-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">NEW</span>}
                            </div>
                            <Typography variant="tiny" className="text-zinc-500 text-[9px] font-mono flex items-center gap-1 truncate opacity-70">
                                {caPrefix}... <Copy size={8} className="hover:text-white cursor-pointer" />
                            </Typography>
                        </div>
                    </div>
                    {/* 2. Middle Section: Simulated Sparkline & Micro-Stats */}
                    <div className="flex-1 hidden sm:flex flex-col justify-center h-full px-2 border-x border-white/5 mx-1">
                        {/* Simulated Sparkline SVG */}
                        <div className="h-6 w-full relative opacity-50 group-hover:opacity-100 transition-opacity">
                            <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
                                <path
                                    d={`M0,30 L10,${20} L20,${15} L30,${25} L40,${10} L50,${15} L60,${5} L70,${20} L80,${10} L90,${5} L100,0`}
                                    fill="none"
                                    stroke={flash === 'red' ? '#ef4444' : '#22d3ee'}
                                    strokeWidth="1.5"
                                    vectorEffect="non-scaling-stroke"
                                    className="drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]"
                                />
                                <defs>
                                    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M0,30 L10,${20} L20,${15} L30,${25} L40,${10} L50,${15} L60,${5} L70,${20} L80,${10} L90,${5} L100,0 V30 H0Z`}
                                    fill="url(#glow)"
                                />
                            </svg>
                        </div>
                        <div className="flex justify-between px-1 mt-0.5 opacity-60 w-full">
                            <span className="text-[8px] font-mono text-zinc-500">Vol: ${formatMarketCap(token.volume24h)}</span>
                            <span className="text-[8px] font-mono text-zinc-500">Liq: $45K</span>
                        </div>
                    </div>

                    {/* 3. Right Section: Price & Action */}
                    <div className="flex flex-col items-end min-w-[25%] gap-0.5">
                        <Typography variant="body" weight="black" className={`text-[13px] font-mono tracking-tighter ${flash === 'green' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' : flash === 'red' ? 'text-red-400' : 'text-cyan-50'}`}>
                            ${token.price.toFixed(6)}
                        </Typography>
                        <div className="flex items-center gap-1.5">
                            <PercentBadge value={12.5} color="green" showIcon />
                            <Typography variant="tiny" className="text-zinc-500 text-[9px] font-bold">MC ${formatMarketCap(token.marketCap)}</Typography>
                        </div>
                    </div>
                </div>


                {/* Footer / Meta Row */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded px-1.5 py-0.5 border border-white/5">
                            <User size={8} className="text-blue-400" />
                            <span className="text-[9px] text-zinc-300 font-mono">145</span>
                        </div>
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded px-1.5 py-0.5 border border-white/5">
                            <Zap size={8} className="text-yellow-400" />
                            <span className="text-[9px] text-zinc-300 font-mono">24s</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Quick Actions */}
                        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-cyan-400"><Globe size={10} /></button>
                            <button className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-cyan-400"><Twitter size={10} /></button>
                        </div>
                        <Popover trigger={<MoreHorizontal size={14} className="text-zinc-600 group-hover:text-zinc-300 cursor-pointer" />}>
                            <div className="flex flex-col min-w-[140px] p-1">
                                <MenuOption icon={<Bell size={12} />} label="Alert" />
                                <MenuOption icon={<Eye size={12} />} label="Watch" />
                            </div>
                        </Popover>
                    </div>
                </div>

                {/* Cover for hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
            </div>
        </>
    );
});

function MenuOption({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <button className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors text-left">
            {icon}
            <span>{label}</span>
        </button>
    );
}



function PercentBadge({ value, color, time, showIcon }: { value: number; color: string; time?: string; showIcon?: boolean }) {
    const colors = {
        green: 'bg-green-500/10 text-green-500 border-green-500/20',
        red: 'bg-red-500/10 text-red-400 border-red-500/20',
        zinc: 'bg-zinc-800/30 text-zinc-600 border-white/5',
    }[color] || '';

    return (
        <div className={`px-1.5 h-4 flex items-center gap-0.5 rounded-sm border ${colors} text-[7.5px] font-black tracking-tight whitespace-nowrap`}>
            {showIcon && color === 'green' && <TrendingUp size={7} />}
            {showIcon && color === 'red' && <ZapOff size={7} />}
            {value}%{time && ` ${time}`}
        </div>
    );
}

export default TokenCard;
