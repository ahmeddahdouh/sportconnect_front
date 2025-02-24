import React, {useEffect, useState} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel, Alert} from '@mui/material';
import {fieldsAddEvent} from "../data";
import '../App.css';
import axios from 'axios';
import Swal from "sweetalert2";
import SportService from "../services/SportService";
import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'


export default function AddEventForm(props) {
    //useEffect
    const [sports, setSports] = useState([])
    useEffect(() => {
        const fetchSports = async () => {
            try {
                const sportData = await SportService.getSport();
                setSports(sportData);
            } catch (e) {
                console.error("Error loading sports:", e);
            }
        }
        fetchSports();
    }, []);
    //declaration des etats
    const formFields = fieldsAddEvent;

    const initForm = () => {
        return formFields.reduce((acc, field) =>
            ({...acc, [field.name]: field.type === "checkbox" ? false : ''}), {});

    }
    const [formData, setFormData] = useState(
        initForm()
    );

    // Renommage de Alert en alertState
    const [alertState, setAlertState] = useState({message: "", severity: ""});

    //logique
    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setFormData({
            ...formData,
            id_gestionnaire: props.id,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    async function handleSubmit(e) {
        debugger;
        console.log(formData);
        e.preventDefault();
        setFormData({...formData, id_gestionnaire: props.id});
        try {
            const response = await axios.post("http://localhost:5000/event/", formData);
            setAlertState({message: response.data.message, severity: "success"});
            Alert_personalised('Votre evenement a bien été enregistré', 'success',
                "Bravo !", "Créer un autre");
        } catch (error) {
            console.log(error)
            setAlertState({
                message: `Erreur lors de l'ajout de l'événement (${error.response.data.message})`
                , severity: "error"
            });
        }
    }

    function Alert_personalised(message, icon, text, confirmButtonText) {
        Swal.fire({
            title: message ? message : "Êtes-vous sûr?",
            text: text ? text : "Cette action est irréversible!",
            icon: icon ? icon : "warning",
            showCancelButton: true,
            cancelButtonText: "List des évenements",
            confirmButtonText: confirmButtonText ? confirmButtonText : "Oui, supprimer!",
        }).then((result) => {
            if (result.isConfirmed) {
                setFormData(initForm());
                setAlertState({message: "", severity: ""});
            } else if (result.isDismissed) {
                window.location.href = "/booking";
            }
        });
    }

    // le rendu
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2}}>
            <Box sx={{width: '70%', padding: 2}}>
                <h2>Ajouter Votre Propre Événement</h2>

                {/* Affichage de l'alerte si un message est défini */}
                {alertState.message && <Alert severity={alertState.severity}>{alertState.message}</Alert>}

                <form onSubmit={handleSubmit}>
                    {formFields.reduce((rows, field, index) => {
                        if (index % 2 === 0) rows.push([]);
                        rows[rows.length - 1].push(field);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <Box key={rowIndex} sx={{display: 'flex', gap: 2, marginBottom: 2, flexWrap: 'wrap'}}>
                            {row.map((field) => (
                                <Box key={field.name} sx={{flex: field.type === 'TextArea' ? '1 1 100%' : 1}}>
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
                                    ) : (field.type === 'TextArea' ?
                                            (<Box>
                                                <textarea
                                                    id="event-description"
                                                    name={field.name}
                                                    rows="5"
                                                    cols="50"
                                                    maxLength={200}
                                                    placeholder="Décrivez votre événement ici..."
                                                    value={field.name == "id_gestionnaire" ? props.id : formData[field.name] || ""}
                                                    style={{
                                                        WebkitBoxSizing: 'border-box',
                                                        MozBoxSizing: 'border-box',
                                                        boxSizing: 'border-box',
                                                        width: '100%',
                                                    }}
                                                    onChange={handleChange}
                                                    required
                                                /></Box>) : (field.name !== 'id_sport' ?
                                                <TextField
                                                    type={field.type}
                                                    label={field.label}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    inputProps={field.type === "number" ? {min: 0} : {}}
                                                    required={true}
                                                /> :
                                                <FormControl fullWidth>
                                                    <InputLabel
                                                        id={`select-label-${field.name}`}>{field.label}</InputLabel>
                                                    <Select
                                                        labelId={`select-label-${field.name}`}
                                                        name={field.name}
                                                        value={formData[field.name] || ""}
                                                        label={field.label}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                        fullWidth
                                                    >
                                                        <MenuItem value="" disabled>{field.label}</MenuItem>
                                                        {sports?.map((sport, index) => (
                                                            <MenuItem key={index} value={sport.id}>
                                                                {sport.sport_nom}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>)
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