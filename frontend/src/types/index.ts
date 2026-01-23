export interface User {
    id: number;
    username: string;
    balance: number;
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER = 'TRANSFER'
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface Transaction {
    id: number;
    userId: number;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    timestamp: string;
}

export interface TransactionEvent {
    transactionId?: string;
    userId: number;
    amount: number;
    type: TransactionType;
}

export interface AuthResponse {
    token: string;
    userId: number;
    username: string;
}
