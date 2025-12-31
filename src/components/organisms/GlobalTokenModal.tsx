"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal } from '@/store/uiSlice';
import TokenModal from './TokenModal';
import { Token } from '@/lib/types';

export default function GlobalTokenModal() {
    const dispatch = useAppDispatch();
    const { selectedTokenId, isModalOpen } = useAppSelector(state => state.ui);
    const sections = useAppSelector(state => state.tokens.sections);

    // Find the token across all sections
    const token = React.useMemo(() => {
        if (!selectedTokenId) return null;
        for (const sectionKey of Object.keys(sections)) {
            // @ts-ignore - keys are typed effectively
            const found = sections[sectionKey].find((t: Token) => t.id === selectedTokenId);
            if (found) return found;
        }
        return null;
    }, [selectedTokenId, sections]);

    if (!token) return null;

    return (
        <TokenModal
            token={token}
            isOpen={isModalOpen}
            onClose={() => dispatch(closeModal())}
        />
    );
}
