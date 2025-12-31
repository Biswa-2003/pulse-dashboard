"use client";

import React from 'react';

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Base dark noise/texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>

            {/* --- NEW: Dynamic Cyber Grid --- */}
            <div className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) scale(2)',
                    transformOrigin: 'top center',
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, transparent 60%)'
                }}
            />

            {/* --- NEW: Floating Particles (Stars) --- */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle blur-[1px]" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-twinkle blur-[1px]" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle blur-[1px]" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle blur-[0.5px]" style={{ animationDelay: '3s' }} />
            <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-cyan-600 rounded-full animate-twinkle blur-[2px]" style={{ animationDelay: '1.5s' }} />

            {/* Blob 1: Top Left - Deep Violet/Purple (Aurora 1) */}
            <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-cyan-500 opacity-20 rounded-full blur-[100px] aurora-blob-1 mix-blend-plus-lighter" />

            {/* Blob 2: Top Right - Soft Pink/Lavender (Aurora 2) */}
            <div className="absolute top-[0%] -right-[20%] w-[50vw] h-[50vw] bg-[#d946ef] opacity-15 rounded-full blur-[110px] aurora-blob-2 mix-blend-plus-lighter" />

            {/* Blob 3: Center Highlight - Cyan (For "Neo" pop) */}
            <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slower mix-blend-plus-lighter" />

            {/* Blob 4: Bottom Right - Vibrant Fuchsia (pop) */}
            <div className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] bg-[#d946ef] opacity-20 rounded-full blur-[130px] animate-float-delayed mix-blend-screen" />

            {/* Overlay to deepen the blacks but keep color */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060a]/50 to-[#05060a]/80" />
        </div>
    );
}
