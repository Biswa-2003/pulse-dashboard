'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'start' | 'center' | 'end';
}

export default function Popover({ trigger, children, align = 'center' }: PopoverProps) {
    return (
        <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger asChild>
                {trigger}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    align={align}
                    sideOffset={5}
                    className="z-[150] w-48 rounded-lg border border-zinc-800 bg-[#0F1116] p-4 text-zinc-100 shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-200"
                >
                    {children}
                    <PopoverPrimitive.Arrow className="fill-zinc-800" />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
