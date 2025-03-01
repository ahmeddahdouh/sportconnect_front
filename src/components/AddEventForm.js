import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { fieldsAddEvent } from "../data";
import EventIcon from '@mui/icons-material/Event'; // Icône pour événement
import SendIcon from '@mui/icons-material/Send'; // Icône pour soumettre

export default function AddEventForm() {
    const formFields = fieldsAddEvent;
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Affiche les données soumises
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)', // Ajuste pour la hauteur de l'AppBar
                padding: { xs: 2, md: 4 },
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', sm: '70%', md: '50%' },
                    p: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fond semi-transparent
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)', // Ombre moderne
                    animation: 'slideInUp 0.8s ease-out',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)', // Effet de surélévation
                    },
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 3,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        animation: 'fadeInDown 0.6s ease-out',
                    }}
                >
                    <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Ajouter un événement
                </Typography>

                <form onSubmit={handleSubmit}>
                    {formFields.map((field, index) => (
                        <TextField
                            key={field.name}
                            type={field.type}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`, // Animation décalée
                            }}
                        />
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        endIcon={<SendIcon />}
                        sx={{
                            mt: 3,
                            py: 1.5,
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
                </form>
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
}