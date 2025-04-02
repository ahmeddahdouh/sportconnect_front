import React, {useEffect, useState} from 'react';
import {TextField, Button, Box, Checkbox, FormControlLabel, Alert} from '@mui/material';
import {fieldsAddEvent} from "../data/data";
import '../App.css';
import axios from 'axios';
import Swal from "sweetalert2";
import SportService from "../services/SportService";
import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import LocationSearch from "../pages/LocationSearch";


export default function AddEventFormComponent(props) {

    const [sports, setSports] = useState([])
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState(null);
    const [alertState, setAlertState] = useState({message: "", severity: ""});
    const formFields = fieldsAddEvent;
    const [formData, setFormData] = useState(initForm());


    const handleLocationSelect = (coordinates) => {
        setLocation(coordinates);
    };

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


    function initForm (){
        return formFields.reduce((acc, field) =>
            ({...acc, [field.name]: field.type === "checkbox" ? false : ''}), {});
    }

    const handleChange = (e) => {
        if (e.label==null){
            const {name, type, checked, value} = e.target;
            let newValue = type === "checkbox" ? checked : value;
            setFormData({
                ...formData,
                id_gestionnaire: props.id,
                [name]: newValue,
            });
        }
        else {
            setFormData({
                ...formData,
                "event_ville": e?.label,
                "longitude": Number(e?.value[0]),
                "latitude":Number(e?.value[2])
            });
        }

    };

    const handleBlure = (e) => {

        const { name, type, checked, value } = e.target;
        let newValue = type === "checkbox" ? checked : value;
        // Convertir en nombre si c'est un champ numérique
        if (name === "event_age_min" || name === "event_age_max" || name==="nombre_utilisateur_min" || name === "event_max_utilisateur") {
            newValue = Number(newValue);
        }
        // Initialisation des erreurs
        let errorMsg = "";

        // Vérification : max_participant >= min_participant
        if (name === "event_age_max" && newValue < formData.event_age_min) {
            errorMsg = "L'âge maximum ne peut pas être inférieur à l'âge minimum.";
        }

        if (name === "event_age_min" && newValue > formData.event_age_max) {
            errorMsg = "L'âge minimum ne peut pas être supérieur à l'âge maximum.";
        }
        // Vérification : max_participant >= min_participant
        if (name === "event_max_utilisateur" && newValue < formData.nombre_utilisateur_min) {
            errorMsg = "Le nombre d'utilisateur maximum ne peut pas être inférieur au nombre d'utilisateur minimum.";
        }

        if (name === "nombre_utilisateur_min" && newValue > formData.event_max_utilisateur) {
            errorMsg = "Le nombre d'utilisateur ne peut pas être supérieur au nombre d'utilisateur maximum.";
        }

        // Validation du champ requis
        if (!newValue && name !=="" ) {
            errorMsg = "Ce champ est requis.";
        }

        // Mise à jour des erreurs
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMsg
        }));

    };

    async function handleSubmit(e) {
        e.preventDefault();
        const hasErrors = Object.values(errors).some(value => value !== "");

        if (hasErrors)  {
            alert("Veuillez remplir correctement le formulaire");
            return;
        }
        e.preventDefault();
        setFormData({...formData, id_gestionnaire: props.id});
        try {
            const response = await axios.post("http://localhost:5000/event/", formData);
            setAlertState({message: response.data.message, severity: "success"});
            Alert_personalised('Votre evenement a bien été enregistré', 'success',
                "Bravo !", "Créer un autre");
        } catch (error) {
            console.error(error)
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

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2}}>
            <Box sx={{width: '70%', padding: 2}}>
                <p className="text-2xl mb-6 font-bold" >Ajouter Votre Propre Événement</p>

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
                                                    onBlur={handleBlure}
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
                                                    onBlur={handleBlure}
                                                    rows="5"
                                                    cols="50"
                                                    maxLength={200}
                                                    className="border border-gray-300 rounded-md p-2"
                                                    placeholder="Décrivez votre événement ici..."
                                                    value={field.name == "id_gestionnaire" ? props.id : formData[field.name] || ""}
                                                    style={{
                                                        WebkitBoxSizing: '',
                                                        MozBoxSizing: 'border-box',
                                                        boxSizing: 'border-box',
                                                        width: '100%',
                                                    }}
                                                    onChange={handleChange}
                                                    required
                                                />

                                                        <LocationSearch onLocationSelect={handleLocationSelect} name="event_ville" handleBlure={handleBlure} change={handleChange}
                                                        className="w-1/2"
                                                        />


                                            </Box>

                                            ) : (field.name !== 'id_sport' ?
                                                <TextField
                                                    type={field.type}
                                                    label={field.label}
                                                    name={field.name}
                                                    value={formData[field.name] || ""}
                                                    onChange={handleChange}
                                                    onBlur={handleBlure}
                                                    fullWidth
                                                    variant="outlined"
                                                    inputProps={field.type === "number" ? {min: 0} : {}}
                                                    required={true}
                                                    error={Boolean(errors[field.name])}
                                                    helperText={errors[field.name]}
                                                />

                                                :(field.type =='datetime-local'?
                                                    <div>test</div>:
                                                <FormControl fullWidth>
                                                    <InputLabel
                                                        id={`select-label-${field.name}`}>{field.label}</InputLabel>
                                                    <Select
                                                        labelId={`select-label-${field.name}`}
                                                        name={field.name}
                                                        value={formData[field.name] || ""}
                                                        label={field.label}
                                                        onChange={handleChange}
                                                        onBlur={handleBlure}
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
                                                </FormControl>))
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