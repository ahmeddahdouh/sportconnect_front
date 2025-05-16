import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';

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

            setTimeout(window.location.href = '/login' , 3000);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Demandez votre localisation
                </Typography>
                {!manualInput ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleGetLocation}
                            sx={{ mt: 2, width: '100%' }}
                        >
                            Obtenir automatiquement
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleManualInputToggle}
                            sx={{ mt: 2, width: '100%' }}
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
                            sx={{ mt: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleManualInputSubmit}
                            sx={{ mt: 2, width: '100%' }}
                        >
                            Soumettre
                        </Button>
                    </>
                )}
                {message && (
                    <Alert
                        severity={manualInput ? 'info' : 'success'}
                        sx={{ mt: 2 }}
                    >
                        {message}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default LocationRequest;
