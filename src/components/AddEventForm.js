import React, { useState } from 'react';
import { TextField, Button, Box, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { fieldsAddEvent } from "../data";
import '../App.css';
import axios from 'axios';
import Swal from "sweetalert2";

export default function AddEventForm() {
    const formFields = fieldsAddEvent;

    const initForm = ()=>{
       return formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.type === "checkbox" ? false : '' }), {})

    }

    const [formData, setFormData] = useState(
        initForm()
           );

    // Renommage de Alert en alertState
    const [alertState, setAlertState] = useState({ message: "", severity: "" });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/event/", formData);
            setAlertState({ message: response.data.message, severity: "success" });
            debugger;
            Alert('Votre evenement a bien été enregistré','success',"Bravo !","oK");
        } catch (error) {
            setAlertState({ message: "Erreur lors de l'ajout de l'événement", severity: "error" });
        }
    }

    function Alert(message,icon,text,confirmButtonText){
        Swal.fire({
            title: message ? message : "Êtes-vous sûr?",
            text: text ?text : "Cette action est irréversible!",
            icon: icon ? icon :"warning",
            showCancelButton: true,
            confirmButtonText:confirmButtonText ? confirmButtonText :"Oui, supprimer!",
        }).then((result) => {
            if (result.isConfirmed) {
                setFormData(initForm());
                setAlertState({ message: "", severity: "" });
            }
        });
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2 }}>
            <Box sx={{ width: '70%', padding: 2 }}>
                <h1>Ajouter Votre Propre Événement</h1>

                {/* Affichage de l'alerte si un message est défini */}
                {alertState.message && <Alert severity={alertState.severity}>{alertState.message}</Alert>}

                <form onSubmit={handleSubmit}>
                    {formFields.reduce((rows, field, index) => {
                        if (index % 2 === 0) rows.push([]);
                        rows[rows.length - 1].push(field);
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
                                            inputProps={field.type === "number" ? { min: 0 } : {}}
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
