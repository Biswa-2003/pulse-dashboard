'use client';

import { useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/lib/format';

interface PriceCellProps {
    price: number;
    className?: string;
}

export default function PriceCell({ price, className }: PriceCellProps) {
    const [direction, setDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
    const [flash, setFlash] = useState(false);
    const prevPrice = useRef(price);

    useEffect(() => {
        if (price > prevPrice.current) {
            setDirection('up');
            setFlash(true);
            const timer = setTimeout(() => {
                setDirection('neutral');
                setFlash(false);
            }, 700);
            return () => clearTimeout(timer);
        } else if (price < prevPrice.current) {
            setDirection('down');
            setFlash(true);
            const timer = setTimeout(() => {
                setDirection('neutral');
                setFlash(false);
            }, 700);
            return () => clearTimeout(timer);
        }
        prevPrice.current = price;
    }, [price]);

    const colorClass = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-blue-100',
    }[direction];

    return (
        <div className={`font-mono text-[11px] font-bold tracking-tighter transition-all duration-300 inline-block ${colorClass} ${flash ? 'brightness-125' : 'brightness-100'} ${className}`}>
            {formatPrice(price)}
        </div>
    );
}
