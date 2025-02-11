import React, { useState } from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel} from '@mui/material';
import {fieldsAddEvent} from "../data";
import '../App.css';


export default function AddEventForm() {
    const formFields = fieldsAddEvent
    // Initialisez l'état avec toutes les clés nécessaires
    const [formData, setFormData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    // Gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Fonction pour soumettre le formulaire
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
                minHeight: '100vh', // Prend toute la hauteur de la fenêtre
                padding: 2,
            }}
        >
            <Box sx={{ width: '70%', padding: 2 }}>
                <h1>Ajouter Votre Propre Événement</h1>
                <form onSubmit={handleSubmit}>
                    {formFields.reduce((rows, field, index) => {
                        if (index % 2 === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(field);
                        debugger;
                        console.log(rows)
                        return rows;

                    }, []).map((row, rowIndex) => (
                        <Box key={rowIndex} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                            {row.map((field) => (
                                <Box key={field.name} sx={{ flex: 1 }}>
                                    {field.type === 'checkbox' ? (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData[field.name] || false}
                                                    onChange={handleChange}
                                                    name={field.name}
                                                />
                                            }
                                            label={field.label}
                                        />
                                    ) : (
                                        <TextField
                                            type={field.type}
                                            label={field.label}
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    ))}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
