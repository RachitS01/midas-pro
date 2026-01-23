import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Alert, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../services/api';
import { loginSuccess } from '../store/authSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(username, password);
            dispatch(loginSuccess(data));
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Check backend connection.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Paper sx={{ p: 4, width: 400, backdropFilter: 'blur(10px)', background: 'rgba(19, 47, 76, 0.8)' }}>
                <Typography variant="h4" mb={1} textAlign="center">
                    MidasPro
                </Typography>
                <Typography variant="h6" mb={3} textAlign="center" color="text.secondary">
                    Welcome Back
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 3, mb: 2, height: 48 }}
                    >
                        Login
                    </Button>
                    <Box textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/signup" color="primary">
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
