import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    className,
    ...props
}, ref) => {
    const variants = {
        primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]',
        secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50',
        ghost: 'bg-transparent hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-100',
        outline: 'bg-transparent border border-zinc-700/80 hover:bg-zinc-800/50 hover:border-zinc-500 text-zinc-300',
        glass: 'glass-effect hover:bg-white/5 text-zinc-100 shadow-xl',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-[10px] font-bold tracking-wider rounded-lg',
        md: 'px-5 py-2.5 text-xs font-bold tracking-wider rounded-xl',
        lg: 'px-8 py-3.5 text-sm font-bold tracking-widest rounded-2xl',
        icon: 'p-2 rounded-xl',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none uppercase select-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export default Button;
