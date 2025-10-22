import {createTheme, Theme} from '@mui/material/styles';

export const createAppTheme = (direction: 'ltr' | 'rtl'): Theme => {
    return createTheme({
        direction,
        palette: {
            primary: {
                main: '#1976d2',
                light: '#42a5f5',
                dark: '#1565c0',
                contrastText: '#fff'
            },
            secondary: {
                main: '#9c27b0',
                light: '#ba68c8',
                dark: '#7b1fa2',
                contrastText: '#fff'
            },
            success: {
                main: '#2e7d32',
                light: '#4caf50',
                dark: '#1b5e20'
            },
            error: {
                main: '#d32f2f',
                light: '#ef5350',
                dark: '#c62828'
            },
            background: {
                default: '#f5f5f5',
                paper: '#ffffff'
            }
        },
        typography: {
            fontFamily: direction === 'rtl'
                ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif'
                : '"Roboto", "Helvetica", "Arial", sans-serif',
            h4: {
                fontWeight: 600,
                fontSize: '2rem',
                lineHeight: 1.2
            },
            h5: {
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.3
            },
            h6: {
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.4
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.5
            },
            button: {
                textTransform: 'none',
                fontWeight: 500
            }
        },
        shape: {
            borderRadius: 8
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '10px 24px',
                        fontSize: '1rem'
                    },
                    contained: {
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                        }
                    }
                }
            },
            // MuiSelect: {
            //     styleOverrides: {
            //         icon: ({ theme }) => ({
            //             right: theme.direction === 'rtl' ? 'auto' : 8,
            //             left: theme.direction === 'rtl' ? 8 : 'auto',
            //         }),
            //     },
            // },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8
                        }
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: 12
                    },
                    elevation1: {
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)'
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)'
                    }
                }
            },
            MuiStepper: {
                styleOverrides: {
                    root: {
                        padding: '24px 0'
                    }
                }
            }
        }
    });
};
