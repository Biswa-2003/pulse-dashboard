'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, TrendingUp, Droplets, BarChart3, Users, Zap, ExternalLink } from 'lucide-react';
import { Token } from '@/lib/types';
import Image from 'next/image';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Badge from '../atoms/Badge';
import { formatCurrency, formatMarketCap } from '@/lib/format';

interface TokenModalProps {
    token: Token | null;
    isOpen: boolean;
    onClose: () => void;
    onViewChart?: (token: Token) => void;
}

export default function TokenModal({ token, isOpen, onClose, onViewChart }: TokenModalProps) {
    if (!token) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] animate-in fade-in duration-500" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-xl glass-effect rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[101] animate-in zoom-in-95 fade-in duration-500 overflow-hidden border-white/[0.05]">

                    {/* Top Accent Gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 pulse-subtle" />

                    <div className="p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-6">
                                <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-zinc-900 ring-2 ring-white/10 shadow-2xl">
                                    <Image src={token.logoUrl || ''} alt={token.symbol} fill unoptimized className="object-cover" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Dialog.Title asChild>
                                            <Typography variant="h2" weight="bold" className="text-white text-3xl tracking-tight">
                                                {token.symbol}
                                            </Typography>
                                        </Dialog.Title>
                                        {token.isPumped && (
                                            <Badge variant="success" className="animate-pulse bg-green-500/20 text-green-400 border-green-500/30">
                                                HIGH IMPACT
                                            </Badge>
                                        )}
                                    </div>
                                    <Dialog.Description asChild>
                                        <Typography variant="body" className="text-zinc-500 font-medium tracking-wide">
                                            {token.name} • Live Market Execution
                                        </Typography>
                                    </Dialog.Description>
                                </div>
                            </div>
                            <Dialog.Close asChild>
                                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 text-zinc-500 hover:text-white group">
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </Dialog.Close>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <StatCard icon={<TrendingUp size={18} className="text-blue-400" />} label="Market Cap" value={formatMarketCap(token.marketCap)} />
                            <StatCard icon={<Droplets size={18} className="text-cyan-400" />} label="Liquidity" value={formatCurrency(token.liquidity)} />
                            <StatCard icon={<BarChart3 size={18} className="text-purple-400" />} label="24h Volume" value={formatCurrency(token.volume24h)} />
                            <StatCard icon={<Users size={18} className="text-orange-400" />} label="Total Holders" value={(token.holders || 0).toLocaleString()} />
                        </div>

                        <div className="flex gap-4">
                            <Button
                                className="flex-1 h-14 bg-white text-black hover:bg-zinc-200 shadow-xl group"
                            >
                                <Zap size={18} className="mr-2 fill-black" />
                                SWAP NOW
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 h-14 border-white/10 bg-white/5 hover:bg-white/10 group"
                                onClick={() => onViewChart?.(token)}
                            >
                                <ExternalLink size={18} className="mr-2 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                                ANALYZE CHART
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Footer */}
                    <div className="px-8 py-4 bg-white/[0.02] border-t border-white/[0.05] flex justify-between items-center">
                        <Typography variant="tiny" className="text-zinc-600 font-bold tracking-widest uppercase">
                            Secure Execution Gate
                        </Typography>
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="glass-card rounded-[1.5rem] p-5 flex flex-col gap-3 group">
            <div className="flex items-center gap-3 text-zinc-500">
                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                <Typography variant="tiny" weight="bold" className="uppercase tracking-[0.15em] text-[9px]">
                    {label}
                </Typography>
            </div>
            <Typography variant="h3" weight="bold" className="text-white font-mono text-lg">
                {value}
            </Typography>
        </div>
    );
}
