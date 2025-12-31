import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'tiny';
    className?: string;
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
}

const Typography = forwardRef<HTMLElement, TypographyProps>(({
    children,
    variant = 'body',
    weight = 'normal',
    className,
    onClick,
    ...props
}, ref) => {
    const variants = {
        h1: 'text-2xl sm:text-3xl tracking-tight',
        h2: 'text-lg sm:text-xl tracking-tight',
        h3: 'text-base',
        body: 'text-sm',
        caption: 'text-xs',
        tiny: 'text-[10px]',
    };

    const weights = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
    };

    const Component = (variant.startsWith('h') ? variant : 'p') as any;

    return (
        <Component
            ref={ref}
            className={cn(variants[variant], weights[weight], className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
});

Typography.displayName = 'Typography';

export default Typography;
