import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material';
import type { Transaction } from '../types';
import { TransactionStatus } from '../types';

interface Props {
    transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
    const getStatusColor = (status: TransactionStatus) => {
        switch (status) {
            case TransactionStatus.APPROVED: return 'success';
            case TransactionStatus.REJECTED: return 'error';
            default: return 'warning';
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>${row.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip label={row.status} color={getStatusColor(row.status)} size="small" />
                                </TableCell>
                            </TableRow>
                        ))}
                        {transactions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body2" sx={{ py: 2 }}>
                                        No transactions found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TransactionList;
