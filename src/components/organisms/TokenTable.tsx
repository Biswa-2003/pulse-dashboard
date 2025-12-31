'use client';

import { Token } from '@/lib/types';
import TokenCard from './TokenCard';
import Shimmer from '../atoms/Shimmer';
import { useState, memo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TokenTableProps {
    tokens: Token[];
    loading?: boolean;
    onSelectToken: (token: Token) => void;
}

const MemoizedTokenCard = memo(TokenCard);

export default function TokenTable({ tokens, loading, onSelectToken }: TokenTableProps) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Token, direction: 'asc' | 'desc' } | null>(null);

    const sortedTokens = [...tokens].sort((a: Token, b: Token) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const valA = a[key] as any;
        const valB = b[key] as any;

        if (valA === undefined || valB === undefined) return 0;

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (loading) {
        return (
            <div className="flex flex-col gap-2 p-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-[100px] w-full bg-white/[0.02] border border-white/5 rounded-xl animate-shimmer" />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#060709]">
            {/* Scrollable Card List */}
            <div className="custom-scrollbar overflow-y-auto px-3 py-2 flex flex-col gap-2 max-h-[calc(100vh-180px)] scroll-smooth">
                {sortedTokens.map((token, index) => (
                    <MemoizedTokenCard
                        key={token.id}
                        token={token}
                        onClick={() => onSelectToken(token)}
                    />
                ))}

                {/* Visual Bottom Spacer */}
                <div className="min-h-[20px]" />
            </div>
        </div>
    );
}
