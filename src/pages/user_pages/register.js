import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    InputAdornment,
    IconButton,
    Divider,
    Link
} from "@mui/material";
import React, { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

function Register({ formData, setFormData, alert, setAlert, loading, onNext }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Vérification des mots de passe
        if (
            e.target.name === "confirmPassword" ||
            e.target.name === "password"
        ) {
            if (
                e.target.name === "confirmPassword" &&
                formData?.password !== e.target.value
            ) {
                setAlert({
                    message: "Les mots de passe ne correspondent pas",
                    severity: "warning",
                });
            } else {
                setAlert({ message: "", severity: "" });
            }

            // Analyse basique de la force du mot de passe
            if (e.target.name === "password") {
                const password = e.target.value;
                let score = 0;
                let feedback = "";

                if (password.length >= 8) score += 1;
                if (/[A-Z]/.test(password)) score += 1;
                if (/[a-z]/.test(password)) score += 1;
                if (/[0-9]/.test(password)) score += 1;
                if (/[^A-Za-z0-9]/.test(password)) score += 1;

                if (score < 3) {
                    feedback = "Mot de passe faible";
                } else if (score < 5) {
                    feedback = "Mot de passe moyen";
                } else {
                    feedback = "Mot de passe fort";
                }

                setPasswordStrength({ score, feedback });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData?.password !== formData?.confirmPassword) {
            setAlert({
                message: "La confirmation du mot de passe doit être identique au mot de passe",
                severity: "warning",
            });
            return;
        }

        setAlert({ message: "", severity: "" });
        onNext();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Étapes du processus d'inscription
    const steps = ['Compte', 'Informations personnelles', 'Confirmation'];

    // Obtenir la couleur de l'indicateur de force du mot de passe
    const getPasswordStrengthColor = () => {
        if (passwordStrength.score < 3) return "error.main";
        if (passwordStrength.score < 5) return "warning.main";
        return "success.main";
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {/* Stepper pour montrer la progression */}
                <Stepper activeStep={0} alternativeLabel sx={{ mb: 5 }}>
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
                            Bienvenue sur SportConnect
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Créez votre compte pour accéder à toutes nos fonctionnalités
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        {alert.message && (
                            <Alert
                                severity={alert.severity}
                                sx={{ mb: 3 }}
                                icon={alert.severity === 'warning' ? <WarningIcon /> : undefined}
                            >
                                {alert.message}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={formData?.email || ""}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="exemple@email.com"
                                helperText="Nous ne partagerons jamais votre email"
                            />

                            <TextField
                                required
                                label="Nom d'utilisateur"
                                name="username"
                                value={formData?.username || ""}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                helperText="Choisissez un nom d'utilisateur unique"
                            />

                            <TextField
                                required
                                label="Mot de passe"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData?.password || ""}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                helperText={
                                    formData?.password ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    bgcolor: getPasswordStrengthColor(),
                                                    mr: 1
                                                }}
                                            />
                                            {passwordStrength.feedback}
                                        </Box>
                                    ) : "Minimum 8 caractères, incluant majuscules, chiffres et symboles"
                                }
                            />

                            <TextField
                                required
                                label="Confirmer votre mot de passe"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData?.confirmPassword || ""}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                helperText={
                                    formData?.confirmPassword && formData?.password === formData?.confirmPassword ? (
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                                            <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
                                            Les mots de passe correspondent
                                        </Box>
                                    ) : "Saisissez à nouveau votre mot de passe"
                                }
                            />

                            <Divider sx={{ my: 3 }} />

                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={loading}
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    py: 1.5,
                                    mt: 1
                                }}
                            >
                                Étape suivante
                            </Button>

                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Vous avez déjà un compte ?{' '}
                                    <Link href="/user_pages/login" underline="hover" fontWeight="500">
                                        Connectez-vous
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Register;