import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00e5ff', // Cyan accent
        },
        secondary: {
            main: '#7c4dff', // Deep Purple
        },
        background: {
            default: '#0a1929', // Deep Blue/Black
            paper: '#132f4c',   // Lighter Blue/Black
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3cde0',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 600,
            letterSpacing: '0.5px',
        },
        h4: {
            fontWeight: 700,
            background: 'linear-gradient(45deg, #00e5ff 30%, #7c4dff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)',
                    },
                },
                text: {
                    background: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                        transform: 'none',
                        boxShadow: 'none',
                        background: 'rgba(255, 255, 255, 0.08)'
                    }
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundImage: 'none', // Remove default overlay
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.5)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});
