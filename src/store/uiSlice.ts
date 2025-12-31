import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortField = 'marketCap' | 'volume24h' | 'age';
export type SortDirection = 'asc' | 'desc';

interface ColumnSortState {
    field: SortField | null;
    direction: SortDirection;
}

interface UiState {
    // Modal
    selectedTokenId: string | null;
    isModalOpen: boolean;

    // Sorting per column (keyed by column title or ID)
    columnSorts: Record<string, ColumnSortState>;

    // Watchlist
    watchlist: string[];
}

const initialState: UiState = {
    selectedTokenId: null,
    isModalOpen: false,
    columnSorts: {},
    watchlist: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.selectedTokenId = action.payload;
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedTokenId = null;
        },
        setColumnSort: (state, action: PayloadAction<{ columnId: string; field: SortField }>) => {
            const { columnId, field } = action.payload;
            const currentSort = state.columnSorts[columnId];

            if (currentSort && currentSort.field === field) {
                // Toggle direction
                state.columnSorts[columnId].direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                // New sort
                state.columnSorts[columnId] = { field, direction: 'desc' };
            }
        },
        toggleWatchlist: (state, action: PayloadAction<string>) => {
            const tokenId = action.payload;
            if (state.watchlist.includes(tokenId)) {
                state.watchlist = state.watchlist.filter(id => id !== tokenId);
            } else {
                state.watchlist.push(tokenId);
            }
        },
    },
});

export const { openModal, closeModal, setColumnSort, toggleWatchlist } = uiSlice.actions;
export default uiSlice.reducer;
