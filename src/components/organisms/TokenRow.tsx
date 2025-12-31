'use client';

import Image from 'next/image';
import { Token } from '@/lib/types';
import Typography from '../atoms/Typography';
import PriceCell from '../molecules/PriceCell';
import { formatCurrency, formatMarketCap } from '@/lib/format';

interface TokenRowProps {
    token: Token;
    index: number;
    onClick?: () => void;
}

/**
 * Standardized grid columns for the entire table to ensure pixel-perfect alignment.
 * 1fr (Token) | 100px (Price) | 80px (MC) | 80px (Liq) | 80px (Vol) | 60px (Age)
 */
export const TABLE_GRID_CLASS = "grid grid-cols-[1fr_100px_80px_80px_80px_60px]";

export default function TokenRow({ token, index, onClick }: TokenRowProps) {
    return (
        <div
            onClick={onClick}
            role="button"
            aria-label={`View details for ${token.symbol}`}
            className={`${TABLE_GRID_CLASS} items-center px-4 py-2 border-b border-white/[0.03] hover:bg-white/[0.04] transition-all duration-200 group cursor-pointer relative overflow-hidden`}
        >
            {/* Selection Glow Sidebar */}
            <div className="absolute left-0 top-0 w-[2px] h-full bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

            {/* Token Identity Column */}
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300 shadow-lg">
                    <Image
                        src={token.logoUrl || ''}
                        alt={`${token.symbol} logo`}
                        fill
                        unoptimized
                        priority={index < 8}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <Typography variant="caption" weight="black" className="text-zinc-100 truncate flex items-center gap-1.5 tracking-tight leading-tight uppercase">
                        {token.symbol}
                        {token.isPumped && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        )}
                    </Typography>
                    <Typography variant="tiny" weight="medium" className="text-zinc-600 truncate leading-none">
                        {token.name}
                    </Typography>
                </div>
            </div>

            {/* Price Column - Padding to reserve space for sort icon alignment */}
            <div className="flex justify-end pr-4">
                <PriceCell price={token.price} className="text-right" />
            </div>

            {/* Market Cap - Padding to reserve space for sort icon alignment */}
            <div className="text-right pr-4">
                <Typography variant="tiny" weight="bold" className="text-zinc-400 font-mono tracking-tighter">
                    {formatMarketCap(token.marketCap)}
                </Typography>
            </div>

            {/* Liquidity - Padding to reserve space for sort icon alignment */}
            <div className="text-right pr-4">
                <Typography variant="tiny" weight="bold" className="text-zinc-500 font-mono tracking-tighter">
                    {formatCurrency(token.liquidity)}
                </Typography>
            </div>

            {/* Volume - Padding to reserve space for sort icon alignment */}
            <div className="text-right pr-4">
                <Typography variant="tiny" weight="bold" className="text-zinc-500 font-mono tracking-tighter">
                    {formatCurrency(token.volume24h)}
                </Typography>
            </div>

            {/* Age - Padding to reserve space for sort icon alignment */}
            <div className="text-right pr-4">
                <Typography variant="tiny" weight="bold" className="text-zinc-700 font-mono italic">
                    {token.age}
                </Typography>
            </div>
        </div>
    );
}
