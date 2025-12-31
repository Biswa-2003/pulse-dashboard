'use client';

import { Token } from '@/lib/types';
import TokenTable from '../organisms/TokenTable';
import ErrorBoundary from '../atoms/ErrorBoundary';
import Tooltip from '../atoms/Tooltip';
import Typography from '../atoms/Typography';
import { SlidersHorizontal, Search as SearchIcon, Zap, RotateCw } from 'lucide-react';

interface PulseColumnProps {
    title: string;
    tokens: Token[];
    count: number;
    className?: string;
    onSelectToken: (token: Token) => void;
}

export default function PulseColumn({ title, tokens, count, className, onSelectToken }: PulseColumnProps) {
    return (
        <div className={`flex flex-col bg-[#060709] h-full ${className} border-r border-white/5`}>
            {/* Column Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0F1116]/80 backdrop-blur-xl sticky top-0 z-[20]">
                <div className="flex items-center gap-2">
                    <Typography variant="body" weight="black" className="text-zinc-100 uppercase tracking-widest text-[11px]">
                        {title}
                    </Typography>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Zap size={11} className="text-zinc-500 hover:text-yellow-500 transition-colors cursor-pointer" />
                        <div className="flex gap-1.5">
                            {['P1', 'P2', 'P3'].map(p => (
                                <Typography
                                    key={p}
                                    variant="tiny"
                                    weight="black"
                                    className="text-zinc-600 hover:text-blue-400 transition-colors uppercase cursor-pointer text-[9px] tracking-tighter"
                                >
                                    {p}
                                </Typography>
                            ))}
                        </div>
                        <RotateCw size={11} className="text-zinc-500 hover:text-green-500 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>

            <ErrorBoundary>
                {/* Search Bar Area - Updated to match Pro screenshot */}
                <div className="px-3 py-2 bg-[#060709] border-b border-white/5">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search tokens..."
                            className="w-full bg-[#0F1116] border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-[9px] text-zinc-400 placeholder-zinc-700 outline-none focus:border-white/10 focus:bg-[#16171B] transition-all"
                        />
                        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-700 group-focus-within:text-zinc-500 transition-colors" />
                    </div>
                </div>

                {/* The Table/Card Container */}
                <div className="flex-1 overflow-hidden">
                    <TokenTable tokens={tokens} onSelectToken={onSelectToken} />
                </div>
            </ErrorBoundary>
        </div>
    );
}
