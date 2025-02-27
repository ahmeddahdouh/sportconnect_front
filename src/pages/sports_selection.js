import React, {useContext, useEffect, useState} from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Button, Box, Alert } from '@mui/material';
import authService from "../services/AuthService";
import {UserContext} from "../context/UserContext";
import {useLocation} from "react-router-dom";


const sportsList = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Natation', 'Athlétisme', 'Cyclisme'];

const SportsSelection = () => {
    const [selectedSports, setSelectedSports] = useState([]);
    const [message, setMessage] = useState('');
    const { user, updateUser } = useContext(UserContext);

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
            setTimeout(window.location.href="/LocationRequest",3000)
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
                    Sélectionnez vos sports
                </Typography>
                <FormGroup>
                    {sportsList.map((sport) => (
                        <FormControlLabel
                            key={sport}
                            control={
                                <Checkbox
                                    checked={selectedSports.includes(sport)}
                                    onChange={() => handleToggle(sport)}
                                />
                            }
                            label={sport}
                        />
                    ))}
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Suivant
                </Button>
                {message && (
                    <Alert severity={selectedSports.length === 0 ? 'warning' : 'success'} sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default SportsSelection;
