import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Button, Box, Alert } from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'; // Icône générique pour les sports
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Icône pour "Suivant"

const sportsList = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Natation', 'Athlétisme', 'Cyclisme'];

const SportsSelection = () => {
    const [selectedSports, setSelectedSports] = useState([]);
    const [message, setMessage] = useState('');

    const handleToggle = (sport) => {
        setSelectedSports((prev) =>
            prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
        );
    };

    const handleSubmit = () => {
        if (selectedSports.length === 0) {
            setMessage('Vous n’avez sélectionné aucun sport. Veuillez en choisir au moins un.');
        } else {
            setMessage(`Vous avez sélectionné : ${selectedSports.join(', ')}`);
            setTimeout(() => (window.location.href = "/LocationRequest"), 3000);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)', // Gradient sportif
                animation: 'fadeIn 1s ease-in-out',
            }}
        >
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fond semi-transparent
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', // Ombre moderne
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 450, // Plus large pour confort
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)', // Effet de surélévation
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
                    Sélectionnez vos sports
                </Typography>

                <FormGroup
                    sx={{
                        mt: 2,
                        maxHeight: 300, // Limite la hauteur pour éviter un débordement
                        overflowY: 'auto', // Défilement si trop de sports
                        padding: 1,
                        borderRadius: 2,
                        backgroundColor: 'rgba(245, 245, 245, 0.8)', // Fond léger pour les checkboxes
                    }}
                >
                    {sportsList.map((sport, index) => (
                        <FormControlLabel
                            key={sport}
                            control={
                                <Checkbox
                                    checked={selectedSports.includes(sport)}
                                    onChange={() => handleToggle(sport)}
                                    sx={{
                                        color: 'primary.main',
                                        '&.Mui-checked': {
                                            color: 'primary.main',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    sx={{
                                        fontSize: '1.1rem',
                                        transition: 'color 0.3s ease',
                                        color: selectedSports.includes(sport) ? 'primary.main' : 'text.primary',
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`, // Animation décalée
                                    }}
                                >
                                    {sport}
                                </Typography>
                            }
                            sx={{
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)', // Effet au survol
                                },
                            }}
                        />
                    ))}
                </FormGroup>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    endIcon={<ArrowForwardIcon />}
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
                    Suivant
                </Button>

                {message && (
                    <Alert
                        severity={selectedSports.length === 0 ? 'warning' : 'success'}
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

export default SportsSelection;