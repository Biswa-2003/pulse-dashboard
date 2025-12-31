import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
    size?: 'xs' | 'sm';
    className?: string;
}

export default function Badge({
    children,
    variant = 'secondary',
    size = 'xs',
    className
}: BadgeProps) {
    const variants = {
        primary: 'bg-blue-600 text-white',
        secondary: 'bg-zinc-800 text-zinc-400',
        success: 'bg-green-500/10 text-green-500 border border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
        error: 'bg-red-500/10 text-red-500 border border-red-500/20',
        outline: 'bg-transparent border border-zinc-700 text-zinc-400',
    };

    const sizes = {
        xs: 'px-1.5 py-0.5 text-[9px]',
        sm: 'px-2 py-0.5 text-[10px]',
    };

    return (
        <span className={`inline-flex items-center font-bold font-mono rounded-sm transition-colors ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
}
