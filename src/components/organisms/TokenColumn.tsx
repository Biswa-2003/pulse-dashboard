import { Token } from "@/lib/types";
import TokenCard from "./TokenCard";
import TokenCardSkeleton from "./TokenCardSkeleton";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";
import { ArrowUp, ArrowDown, SlidersHorizontal } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setColumnSort, SortField } from "@/store/uiSlice";
import React, { useMemo, useCallback } from "react";

interface TokenColumnProps {
    title: string;
    tokens?: Token[];
    loading?: boolean;
}



export default function TokenColumn({ title, tokens = [], loading = false }: TokenColumnProps) {
    const dispatch = useAppDispatch();
    const sortState = useAppSelector((state) => state.ui.columnSorts[title]);

    const sortField = sortState?.field || null;
    const sortDirection = sortState?.direction || 'desc';

    const handleSort = useCallback((field: SortField) => {
        dispatch(setColumnSort({ columnId: title, field }));
    }, [dispatch, title]);

    // Memoize the sorting logic to prevent recalc on every render
    const sortedTokens = useMemo(() => {
        if (!sortField) return tokens;

        return [...tokens].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Parse age "15m", "1h" -> minutes
            if (sortField === 'age') {
                const parseAge = (s: string) => {
                    if (!s) return 0;
                    const val = parseInt(s.replace(/\D/g, '')) || 0;
                    if (s.includes('h')) return val * 60;
                    if (s.includes('d')) return val * 1440;
                    return val;
                };
                aValue = parseAge(a.age);
                bValue = parseAge(b.age);
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tokens, sortField, sortDirection]);

    return (
        <ErrorBoundary fallback={<div className="p-4 text-red-500 bg-red-500/10 rounded">Error loading column</div>}>
            <section className="rounded-3xl border border-cyan-500/20 bg-[#030712]/80 backdrop-blur-xl lg:overflow-hidden flex flex-col h-full shadow-[0_0_40px_rgba(6,182,212,0.05)] relative group/col transition-all duration-300">
                {/* Glowing Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

                {/* Header - Sticky relative to WINDOW on mobile, CONTAINER on desktop */}
                <div className="sticky top-[58px] lg:top-0 z-30 flex flex-col gap-3 px-1 py-1 bg-[#030712] lg:bg-gradient-to-b lg:from-white/[0.02] lg:to-transparent rounded-t-3xl border-b border-white/5 lg:border-none">
                    {/* Cyber Title Bar */}
                    <div className="mx-2 mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent skew-x-12" />
                        <div className="flex items-center gap-2 relative z-10">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                            <h2 className="text-sm font-black tracking-widest text-cyan-100 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                                {title}
                            </h2>
                        </div>
                        <div className="p-1 rounded bg-black/40 border border-cyan-500/20">
                            <SlidersHorizontal size={10} className="text-cyan-400" />
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="px-3 flex items-center gap-1.5">
                        <div className="flex-1 flex items-center justify-between p-1 bg-[#0b1221] rounded-lg border border-white/5">
                            <SortButton field="marketCap" label="MC" currentField={sortField} direction={sortDirection} onClick={handleSort} />
                            <div className="w-[1px] h-3 bg-white/10" />
                            <SortButton field="volume24h" label="VOL" currentField={sortField} direction={sortDirection} onClick={handleSort} />
                            <div className="w-[1px] h-3 bg-white/10" />
                            <SortButton field="age" label="AGE" currentField={sortField} direction={sortDirection} onClick={handleSort} />
                        </div>
                    </div>
                </div>

                {/* Scrollable List - expands on mobile, constrained on desktop */}
                <div className="flex-1 lg:overflow-y-auto custom-scrollbar bg-transparent px-2 pb-2 min-h-0">
                    {loading ? (
                        <div className="p-2 space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => <TokenCardSkeleton key={i} />)}
                        </div>
                    ) : sortedTokens.length === 0 ? (
                        <div className="text-center py-10 text-zinc-600 text-xs">No tokens found</div>
                    ) : (
                        <div className="p-2 space-y-2">
                            {sortedTokens.map((token) => (
                                <TokenCard key={token.id} token={token} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </ErrorBoundary>
    );
}

// Reusable Sort Button Component for cleaner code structure
const SortButton = React.memo(({ field, label, currentField, direction, onClick }: {
    field: SortField,
    label: string,
    currentField: SortField | null,
    direction: 'asc' | 'desc',
    onClick: (f: SortField) => void
}) => (
    <button
        onClick={() => onClick(field)}
        className={`px-2 py-0.5 text-[10px] font-bold transition-colors flex items-center gap-1 ${currentField === field ? 'text-cyan-400 bg-cyan-500/10 rounded' : 'text-zinc-500 hover:text-white'}`}
    >
        {label} {currentField === field && (direction === 'asc' ? <ArrowUp size={8} /> : <ArrowDown size={8} />)}
    </button>
));
SortButton.displayName = 'SortButton';
