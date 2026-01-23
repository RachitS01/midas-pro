import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userId: number | null;
    username: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null,
    username: localStorage.getItem('username'),
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; userId: number; username: string }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', String(action.payload.userId));
            localStorage.setItem('username', action.payload.username);
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.username = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
