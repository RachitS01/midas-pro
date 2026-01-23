import axios from 'axios';
import type { AuthResponse, Transaction, TransactionEvent, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { username, password });
    return response.data;
};

export const signup = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', { username, password });
    return response.data;
};

export const getBalance = async (userId: number): Promise<User> => {
    const response = await api.get<User>(`/users/${userId}/balance`);
    return response.data;
};

export const getHistory = async (userId: number): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>(`/transactions/history?userId=${userId}`);
    return response.data;
};

export const createTransaction = async (event: TransactionEvent): Promise<string> => {
    const response = await api.post<string>('/transactions', event);
    return response.data;
};

export default api;
