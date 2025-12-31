import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTokens, updateTokenPrice } from '@/store/tokensSlice';
import { getInitialTokens } from '@/lib/mockData';
import { PulseSectionType } from '@/lib/types';

/**
 * Custom hook to simulate a real-time WebSocket stream of token data.
 * It manages the initial data load and sets up an interval to simulate
 * price ticks for tokens across different sections.
 * 
 * @returns {Record<PulseSectionType, Token[]>} The current state of tokens grouped by section.
 */
export const usePulseStream = () => {
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.tokens.sections);
    const loading = useAppSelector((state) => state.tokens.loading);

    useEffect(() => {
        const sectionTypes: PulseSectionType[] = ['new-pairs', 'final-stretch', 'migrated'];

        // Initial load: Populate each section with mock tokens
        sectionTypes.forEach(section => {
            dispatch(setTokens({ section, tokens: getInitialTokens(section) }));
        });

        /**
         * Simulated WebSocket Interval
         * In a production environment, this would be replaced by a Socket.io or 
         * Native WebSocket listener that receives updates from the backend.
         */
        const interval = setInterval(() => {
            // Pick a random section and a random row to update, simulating a "tick"
            sectionTypes.forEach(section => {
                const randomIdx = Math.floor(Math.random() * 15);
                const id = `${section}-${randomIdx}`;

                // Dispatch an update action. The reducer handles the price delta logic.
                // This ensures the UI reflects the "heartbeat" of the market.
                dispatch(updateTokenPrice({
                    id,
                    newPrice: 0
                }));
            });
        }, 1000); // 1-second heartbeat

        return () => clearInterval(interval);
    }, [dispatch]);

    return { sections, loading };
};
