'use client';

import React, { useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Maximize2, Activity } from 'lucide-react';
import { Token } from '@/lib/types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import { generateMockChartData } from '@/lib/chartUtils';
import Typography from '../atoms/Typography';
import { formatPrice } from '@/lib/format';
import Shimmer from '../atoms/Shimmer';

interface ChartModalProps {
    token: Token | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ChartModal({ token, isOpen, onClose }: ChartModalProps) {
    const chartData = useMemo(() => {
        if (!token) return [];
        return generateMockChartData(token.price, 30);
    }, [token]);

    if (!token) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] animate-in fade-in duration-300" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl bg-[#0F1116] border border-zinc-800 rounded-2xl shadow-2xl p-0 z-[111] animate-in zoom-in-95 duration-300 overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-[#16171B]/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Activity size={18} className="text-blue-500" />
                            </div>
                            <div>
                                <Dialog.Title asChild>
                                    <Typography variant="h3" weight="bold" className="text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                                        {token.symbol} / USD
                                        <Typography variant="tiny" weight="medium" className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                                            LIVE
                                        </Typography>
                                    </Typography>
                                </Dialog.Title>
                                <Dialog.Description asChild>
                                    <Typography variant="tiny" className="text-zinc-500 uppercase tracking-tighter">
                                        Real-time Execution Chart for {token.symbol}. Displaying price action and volume statistics.
                                    </Typography>
                                </Dialog.Description>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex bg-zinc-800/50 rounded-lg p-1 mr-4">
                                {['1m', '5m', '15m', '1h'].map((t) => (
                                    <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded ${t === '1m' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <Dialog.Close asChild>
                                <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-zinc-300">
                                    <X size={20} />
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="p-6 h-[400px] relative">
                        {!chartData.length ? (
                            <div className="w-full h-full flex flex-col gap-4">
                                <Shimmer className="flex-1 rounded-xl" />
                                <div className="flex gap-4 h-8">
                                    <Shimmer className="w-20 rounded" />
                                    <Shimmer className="w-20 rounded" />
                                </div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.5} />
                                    <XAxis
                                        dataKey="time"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 10 }}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        domain={['auto', 'auto']}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 10 }}
                                        orientation="right"
                                        tickFormatter={(val) => `$${val.toFixed(4)}`}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0F1116', border: '1px solid #374151', borderRadius: '8px', fontSize: '10px' }}
                                        itemStyle={{ color: '#3b82f6' }}
                                        labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                                        formatter={(value: any) => [formatPrice(Number(value || 0)), 'Price']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="px-6 py-4 bg-[#16171B]/30 border-t border-zinc-800 flex justify-between items-center">
                        <div className="flex gap-6">
                            <div className="flex flex-col">
                                <Typography variant="tiny" className="text-zinc-500 uppercase font-bold tracking-widest">Current Price</Typography>
                                <Typography variant="body" weight="bold" className="text-blue-400">{formatPrice(token.price)}</Typography>
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="tiny" className="text-zinc-500 uppercase font-bold tracking-widest">24h Change</Typography>
                                <Typography variant="body" weight="bold" className="text-green-500">{token.priceChange24h || '+4.25%'}</Typography>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-[10px] font-bold rounded-lg transition-all">
                            <Maximize2 size={14} />
                            OPEN FULL TRADINGVIEW
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
