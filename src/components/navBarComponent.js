import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'; // Icône pour "Trouver"
import AddIcon from '@mui/icons-material/Add'; // Icône pour "Organiser"
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Icône pour "Contactez-nous"
import LogoutIcon from '@mui/icons-material/Logout'; // Icône pour "Se déconnecter"
import { Link } from 'react-router-dom';
import { useEffect } from "react";

export default function ButtonAppBar(props) {
    useEffect(() => {}, []);

    function bundleLogout() {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fond blanc semi-transparent
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // Ombre subtile
                    animation: 'slideInDown 0.6s ease-out', // Animation d'entrée
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Menu Icon */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{
                            mr: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'rotate(90deg)', // Rotation au survol
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Username */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'primary.main',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            animation: 'fadeIn 0.8s ease-in',
                        }}
                    >
                        {props.username || 'SportConnect'} {/* Fallback si pas de username */}
                    </Typography>

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Button
                            color="primary"
                            component={Link}
                            to="/booking"
                            startIcon={<SearchIcon />}
                            sx={{
                                fontWeight: 'medium',
                                textTransform: 'none', // Pas de majuscules forcées
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    color: 'primary.dark',
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                        >
                            Trouver un événement
                        </Button>
                        <Button
                            color="primary"
                            component={Link}
                            to="/"
                            startIcon={<AddIcon />}
                            sx={{
                                fontWeight: 'medium',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    color: 'primary.dark',
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                        >
                            Organiser un événement
                        </Button>
                        <Button
                            color="primary"
                            startIcon={<ContactMailIcon />}
                            sx={{
                                fontWeight: 'medium',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    color: 'primary.dark',
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                        >
                            Contactez-nous
                        </Button>
                        {props.username && (
                            <Button
                                color="primary"
                                onClick={bundleLogout}
                                endIcon={<LogoutIcon />}
                                sx={{
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        color: 'secondary.main',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    },
                                }}
                            >
                                Se déconnecter
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Animations CSS */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </Box>
    );
}