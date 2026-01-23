import React, { useEffect } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchUserBalance } from '../store/userSlice';
import { fetchTransactionHistory } from '../store/transactionSlice';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { webSocketService } from '../services/websocket';
import type { TransactionEvent } from '../types';


const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile } = useSelector((state: RootState) => state.user);
    const { history } = useSelector((state: RootState) => state.transactions);
    const { userId } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserBalance(userId));
            dispatch(fetchTransactionHistory(userId));

            // Setup WebSocket
            webSocketService.activate();
            webSocketService.subscribe((event: TransactionEvent) => {
                // In a real app, the WS message should probably contain the full Transaction record or we re-fetch
                // For this demo, let's refresh data when we get an update
                console.log('Received update:', event);
                if (event.userId === userId) {
                    // small delay to ensure DB is consistent if reading immediately
                    setTimeout(() => {
                        dispatch(fetchUserBalance(userId));
                        dispatch(fetchTransactionHistory(userId));
                    }, 500);
                }
            });
        }
        return () => {
            webSocketService.deactivate();
        };
    }, [dispatch, userId]);

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}>
                    <Box>
                        <Typography variant="h6">Current Balance</Typography>
                        <Typography variant="h3">${profile?.balance.toFixed(2) || '0.00'}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">User ID: {userId}</Typography>
                    </Box>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <TransactionForm />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" mb={2}>Transaction History</Typography>
                <TransactionList transactions={history} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
