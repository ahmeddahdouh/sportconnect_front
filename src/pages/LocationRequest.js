import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icône pour localisation auto
import EditIcon from '@mui/icons-material/Edit'; // Icône pour saisie manuelle
import SendIcon from '@mui/icons-material/Send'; // Icône pour soumettre

const LocationRequest = () => {
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [manualInput, setManualInput] = useState(false);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setMessage('La géolocalisation n’est pas supportée par votre navigateur.');
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    setMessage('Localisation obtenue automatiquement.');
                },
                () => {
                    setMessage('Impossible d’obtenir la localisation.');
                }
            );
        }
    };

    const handleManualInputToggle = () => {
        setManualInput(true);
        setMessage('');
    };

    const handleManualInputSubmit = () => {
        if (location.trim() === '') {
            setMessage('Veuillez saisir une localisation valide.');
        } else {
            setMessage(`Localisation saisie manuellement : ${location}`);
            setTimeout(() => (window.location.href = '/login'), 3000);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)', // Gradient moderne
                animation: 'fadeIn 1s ease-in-out',
            }}
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fond blanc semi-transparent
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', // Ombre plus prononcée
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 450, // Légèrement plus large pour plus de confort
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)', // Effet de surélévation au hover
                    },
                    animation: 'slideInUp 0.8s ease-out',
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        animation: 'fadeInDown 0.6s ease-out',
                    }}
                >
                    Demandez votre localisation
                </Typography>

                {!manualInput ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGetLocation}
                            startIcon={<LocationOnIcon />}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                width: '100%',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            Obtenir automatiquement
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleManualInputToggle}
                            startIcon={<EditIcon />}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                width: '100%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    backgroundColor: 'secondary.light',
                                    color: 'white',
                                },
                            }}
                        >
                            Saisir manuellement
                        </Button>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Entrez votre localisation"
                            variant="outlined"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            sx={{
                                mt: 3,
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                animation: 'fadeIn 0.5s ease-in',
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleManualInputSubmit}
                            endIcon={<SendIcon />}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                width: '100%',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            Soumettre
                        </Button>
                    </>
                )}

                {message && (
                    <Alert
                        severity={
                            message.includes('Impossible') || message.includes('valide')
                                ? 'error'
                                : 'success'
                        }
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            animation: 'fadeInUp 0.5s ease-in',
                        }}
                    >
                        {message}
                    </Alert>
                )}
            </Box>

            {/* Animations CSS */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideInUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </Box>
    );
};

export default LocationRequest;