'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

export default function Tooltip({ children, content }: { children: React.ReactNode, content: string }) {
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        className="z-50 overflow-hidden rounded-md bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-xs text-zinc-100 animate-in fade-in zoom-in duration-200"
                        sideOffset={5}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-zinc-900" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
