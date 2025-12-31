import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, PulseSectionType } from '../lib/types';

interface TokensState {
    sections: Record<PulseSectionType, Token[]>;
    loading: boolean;
    error: string | null;
}

const initialState: TokensState = {
    sections: {
        'new-pairs': [],
        'final-stretch': [],
        'migrated': [],
    },
    loading: false,
    error: null,
};

const tokensSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ section: PulseSectionType; tokens: Token[] }>) => {
            state.sections[action.payload.section] = action.payload.tokens;
        },
        updateTokenPrice: (state, action: PayloadAction<{ id: string; newPrice?: number }>) => {
            const { id, newPrice } = action.payload;
            for (const section of Object.keys(state.sections) as PulseSectionType[]) {
                const token = state.sections[section].find(t => t.id === id);
                if (token) {
                    if (newPrice && newPrice !== 0) {
                        token.price = newPrice;
                    } else {
                        // Simulate a tick
                        const change = 1 + (Math.random() * 0.01 - 0.005);
                        token.price *= change;
                    }
                    break;
                }
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setTokens, updateTokenPrice, setLoading, setError } = tokensSlice.actions;
export default tokensSlice.reducer;
