import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Typography,
    Autocomplete,
    Paper,
    Divider,
    Stepper,
    Step,
    StepLabel,
    Container,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { subYears } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import frLocale from "date-fns/locale/fr";
import { format } from "date-fns";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

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
            date_of_birth: formData?.date_of_birth
                ? format(formData?.date_of_birth, "yyyy-MM-dd")
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

    // Étapes du processus d'inscription
    const steps = ['Compte', 'Informations personnelles', 'Confirmation'];

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                {/* Stepper pour montrer la progression */}
                <Stepper activeStep={1} alternativeLabel sx={{ mb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        p: 3,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h4" fontWeight="700">
                            Informations personnelles
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Veuillez compléter vos informations pour finaliser votre inscription
                        </Typography>
                    </Box>

                    {/* Alertes */}
                    <Box sx={{ p: 3 }}>
                        {alert.message && (
                            <Alert
                                severity={alert.severity}
                                sx={{ mb: 3 }}
                                icon={alert.severity === 'success' ? <CheckIcon /> : undefined}
                            >
                                {alert.message}
                            </Alert>
                        )}

                        {errorMessage && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {errorMessage}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                                Identité
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        label="Prénom"
                                        name="firstname"
                                        value={formData?.firstname || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        label="Nom de famille"
                                        name="familyname"
                                        value={formData?.familyname || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                        <DatePicker
                                            label="Date de naissance"
                                            value={formData?.date_of_birth || null}
                                            onChange={handleDateChange}
                                            maxDate={subYears(new Date(), 12)}
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                    fullWidth: true,
                                                    variant: "outlined",
                                                    InputProps: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CalendarTodayIcon color="primary" />
                                                            </InputAdornment>
                                                        ),
                                                    }
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        label="Téléphone"
                                        name="phone"
                                        value={formData?.phone || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        placeholder="06 12 34 56 78"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" fontWeight="600" sx={{ mt: 4, mb: 2 }}>
                                Adresse
                            </Typography>

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
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        label="Adresse"
                                        name="address"
                                        value={formData?.address || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HomeIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        label="Code postal"
                                        name="postal_code"
                                        value={formData?.postal_code || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        required
                                        label="Ville"
                                        name="city"
                                        value={formData?.city || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData?.consent || false}
                                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                            required
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography fontWeight="500">
                                            J'accepte les conditions d'utilisation
                                        </Typography>
                                    }
                                />
                                <FormHelperText sx={{ ml: 4 }}>
                                    En cochant cette case, vous acceptez que vos données soient traitées selon notre politique de confidentialité (RGPD).
                                </FormHelperText>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="outlined"
                                        onClick={onBack}
                                        fullWidth
                                        size="large"
                                        startIcon={<ArrowBackIcon />}
                                        sx={{ py: 1.5 }}
                                    >
                                        Précédent
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        disabled={loading}
                                        size="large"
                                        sx={{ py: 1.5 }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            "S'inscrire"
                                        )}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default PersonalInformationRegister;