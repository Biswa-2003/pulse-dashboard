"use client";

import TokenColumn from "@/components/organisms/TokenColumn";
import Header from "@/components/organisms/Header";
import { usePulseStream } from "@/hooks/usePulseStream";
import { Menu, Box } from "lucide-react";

import AmbientBackground from "../atoms/AmbientBackground";

import GlobalTokenModal from "../organisms/GlobalTokenModal";

export default function PulseTemplate() {
    const { sections, loading } = usePulseStream();
    return (
        <div className="min-h-screen text-zinc-100 flex flex-col relative">
            <AmbientBackground />
            <Header />
            <div className="mx-auto w-full max-w-[1700px] px-4 pt-4 flex-1">
                {/* Page title */}
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Pulse</h1>
                    <button className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Menu className="text-blue-400" size={16} />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center hover:bg-white/5 transition-colors">
                        <Box className="text-yellow-400" size={16} />
                    </button>
                </div>

                {/* Columns */}
                <div className="mt-5 grid gap-4 grid-cols-1 lg:grid-cols-3 h-auto lg:h-[calc(100vh-140px)] pb-10 lg:pb-0">
                    <div className="min-h-[400px] h-auto lg:h-full">
                        <TokenColumn title="New Pairs" tokens={sections['new-pairs']} loading={loading || sections['new-pairs'].length === 0} />
                    </div>
                    <div className="min-h-[400px] h-auto lg:h-full">
                        <TokenColumn title="Final Stretch" tokens={sections['final-stretch']} loading={loading || sections['final-stretch'].length === 0} />
                    </div>
                    <div className="min-h-[400px] h-auto lg:h-full">
                        <TokenColumn title="Migrated" tokens={sections['migrated']} loading={loading || sections['migrated'].length === 0} />
                    </div>
                </div>
            </div>
            <GlobalTokenModal />
        </div>
    );
}
