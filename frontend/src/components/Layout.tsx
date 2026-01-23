import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useNavigate, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MidasPro
                    </Typography>
                    {isAuthenticated && (
                        <>
                            <Typography variant="subtitle1" sx={{ mr: 2 }}>
                                Hello, {username}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
