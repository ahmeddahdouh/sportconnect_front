import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Typography,
    Autocomplete
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import frLocale from "date-fns/locale/fr";
import { format } from "date-fns";

function PersonalInformationRegister({ formData, setFormData, alert, setAlert, loading, setLoading, onBack }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [addressOptions, setAddressOptions] = useState([]);
    const [addressInputValue, setAddressInputValue] = useState("");
    const [addressSearchLoading, setAddressSearchLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fonction pour rechercher des adresses avec l'API Adresse
    useEffect(() => {
        const searchAddress = async () => {
            if (addressInputValue.length < 3) {
                setAddressOptions([]);
                return;
            }

            setAddressSearchLoading(true);
            try {
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(addressInputValue)}&limit=5`);
                const data = await response.json();

                const formattedAddresses = data.features.map(item => ({
                    label: item.properties.label,
                    city: item.properties.city,
                    postcode: item.properties.postcode,
                    street: item.properties.name
                }));

                setAddressOptions(formattedAddresses);
            } catch (error) {
                console.error("Erreur lors de la recherche d'adresse:", error);
            } finally {
                setAddressSearchLoading(false);
            }
        };

        // Ajouter un délai pour éviter trop de requêtes pendant la saisie
        const timeoutId = setTimeout(() => {
            if (addressInputValue) {
                searchAddress();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [addressInputValue]);

    const handleDateChange = (date) => {
        setFormData({ ...formData, date_of_birth: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            date_of_birth: formData.date_of_birth
                ? format(formData.date_of_birth, "yyyy-MM-dd")
                : "",
        };

        delete payload.confirmPassword;

        try {
            const response = await fetch(`${process.env.REACT_APP_AUTH_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                setAlert({ message: "Inscription réussie", severity: "success" });
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                if (response.status === 409) {
                    setErrorMessage("Ce nom d'utilisateur ou cet email existe déjà");
                } else {
                    setErrorMessage(result.message || "Erreur lors de l'inscription");
                }
            }
        } catch (error) {
            console.error("Erreur API :", error);
            setErrorMessage("Erreur serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,

            }}
        >
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }} color="primary">
                Informations personnelles
            </Typography>

            {alert.message && (
                <Alert severity={alert.severity} sx={{ mt: 2, mb: 2 }}>
                    {alert.message}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: { xs: "90%", sm: "60%", md: "40%" } }}
            >
                <TextField
                    required
                    label="Prénom"
                    name="firstname"
                    value={formData.firstname || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="Nom de famille"
                    name="familyname"
                    value={formData.familyname || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                    <DatePicker
                        label="Date de naissance"
                        value={formData.date_of_birth || null}
                        onChange={handleDateChange}
                        className={"w-full"}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth margin="normal" required />
                        )}
                    />
                </LocalizationProvider>
                <Autocomplete
                    id="address-autocomplete"
                    options={addressOptions}
                    loading={addressSearchLoading}
                    inputValue={addressInputValue}
                    onInputChange={(event, newInputValue) => {
                        setAddressInputValue(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setFormData({
                                ...formData,
                                city: newValue.city,
                                address: newValue.street,
                                postal_code: newValue.postcode
                            });
                        }
                    }}
                    getOptionLabel={(option) => option.label || ""}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Rechercher une adresse"
                            fullWidth
                            margin="normal"
                        />
                    )}
                />

                <TextField
                    required
                    label="Adresse"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <div className="flex flex-row justify-between space-x-2">

                <TextField
                    required
                    label="Code postal"
                    name="postal_code"
                    value={formData.postal_code || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    required
                    label="Ville"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />
                </div>
                <TextField
                    required
                    label="Téléphone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "S'inscrire"}
                </Button>

                <Button
                    variant="outlined"
                    onClick={onBack}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Précédent
                </Button>
            </Box>
        </Box>
    );
}

export default PersonalInformationRegister;