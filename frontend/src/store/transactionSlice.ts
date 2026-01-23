import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getHistory } from '../services/api';
import type { Transaction } from '../types';

interface TransactionState {
    history: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    history: [],
    loading: false,
    error: null,
};

export const fetchTransactionHistory = createAsyncThunk(
    'transactions/fetchHistory',
    async (userId: number) => {
        const response = await getHistory(userId);
        return response;
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.history.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchTransactionHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch history';
            });
    },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
