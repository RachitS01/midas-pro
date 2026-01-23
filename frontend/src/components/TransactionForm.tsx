import React, { useState } from 'react';
import { TextField, Button, MenuItem, Paper, Typography, Box, Alert } from '@mui/material';
import { TransactionType } from '../types';
import type { TransactionEvent } from '../types';
import { createTransaction } from '../services/api';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const TransactionForm: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>(TransactionType.DEPOSIT);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { userId } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!userId) return;

        try {
            const event: TransactionEvent = {
                userId,
                amount: parseFloat(amount),
                type
            };
            await createTransaction(event);
            setMessage('Transaction submitted successfully');
            setAmount('');
        } catch (err) {
            setError('Failed to submit transaction');
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>New Transaction</Typography>
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        select
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value as TransactionType)}
                        fullWidth
                    >
                        {Object.values(TransactionType).map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" type="submit" sx={{ minWidth: 120 }}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default TransactionForm;
