'use client';

import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Activity, Globe, Zap, Clock } from 'lucide-react';
import Typography from '../atoms/Typography';
import Shimmer from '../atoms/Shimmer';

const fetchStats = async () => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    return {
        marketCap: '$2.45T',
        volume24h: '$84.2B',
        btcDominance: '52.4%',
        activeTokens: '18,452',
    };
};

export default function MarketBar() {
    const { data, isLoading } = useQuery({
        queryKey: ['market-stats'],
        queryFn: fetchStats,
    });

    return (
        <div className="h-9 bg-[#0F1116]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-6 overflow-x-auto no-scrollbar z-40 transition-all">
            <StatItem
                icon={<Activity size={13} className="text-blue-400" />}
                label="PULSES"
                value={data?.activeTokens}
                loading={isLoading}
            />
            <StatItem
                icon={<TrendingUp size={13} className="text-green-400" />}
                label="VOLUME 24H"
                value={data?.volume24h}
                loading={isLoading}
            />
            <StatItem
                icon={<Globe size={13} className="text-purple-400" />}
                label="IMPACT"
                value={data?.btcDominance}
                loading={isLoading}
            />
            <StatItem
                icon={<Clock size={13} className="text-yellow-400" />}
                label="LATENCY"
                value="14ms"
                loading={isLoading}
            />
        </div>
    );
}

function StatItem({ icon, label, value, loading }: { icon: React.ReactNode; label: string; value?: string; loading: boolean }) {
    return (
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-default">
            {icon}
            <Typography variant="tiny" weight="black" className="text-zinc-500 uppercase tracking-[0.15em] text-[9px] whitespace-nowrap">
                {label}:
            </Typography>
            {loading ? (
                <Shimmer className="w-10 h-2.5 rounded" />
            ) : (
                <Typography variant="tiny" weight="black" className="text-zinc-200 font-mono tracking-tighter text-[10px]">
                    {value}
                </Typography>
            )}
        </div>
    );
}
