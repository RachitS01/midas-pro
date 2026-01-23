import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getBalance } from '../services/api';
import type { User } from '../types';

interface UserState {
    profile: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    loading: false,
    error: null,
};

export const fetchUserBalance = createAsyncThunk(
    'user/fetchBalance',
    async (userId: number) => {
        const response = await getBalance(userId);
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateBalance: (state, action: PayloadAction<number>) => {
            if (state.profile) {
                state.profile.balance = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch balance';
            });
    },
});

export const { updateBalance } = userSlice.actions;
export default userSlice.reducer;
