import React, { useState } from 'react';
import Box from "@mui/material/Box";
import {
    Button,
    TextField,
    Typography,
    Alert,
    useMediaQuery,
    Container,
    Paper,
    InputAdornment,
    IconButton,
    Divider,
    Link
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import authService from "../services/AuthService";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        e.preventDefault();
        setAlert({ message: "", severity: "" });
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        try {
            const response = await authService.login(userData);

            if (response && response.access_token) {
                setAlert({ message: "Connexion réussie", severity: "success" });
                setTimeout(() => window.location.href = "/landingPage", 1000);
            } else {
                setAlert({ message: "Mot de passe incorrect", severity: "warning" });
            }
        } catch (error) {
            if (error?.response?.status >= 400 && error?.response?.status < 500) {
                setAlert({ message: error.response.data.message, severity: "warning" });
            } else {
                setAlert({ message: error.message || "Erreur inconnue", severity: "error" });
            }
        } finally {
            setLoading(false);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Fonction pour personnaliser l'icône d'alerte en fonction de la gravité
    const getAlertIcon = (severity) => {
        switch (severity) {
            case 'success':
                return <CheckCircleOutlineIcon />;
            case 'warning':
                return <WarningIcon />;
            case 'error':
                return <ErrorIcon />;
            default:
                return undefined;
        }
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', md: 'row' },
                    py: 4,
                    gap: { xs: 4, md: 8 }
                }}
            >
                {/* Logo côté gauche */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: { xs: '0 0 auto', md: '1 0 40%' }
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Logo SportConnect"
                        style={{
                            width: isMobile ? '160px' : '280px',
                            height: isMobile ? '90px' : '160px',
                            objectFit: 'contain'
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            mt: 2,
                            display: { xs: 'none', md: 'block' },
                            textAlign: 'center',
                            color: 'text.secondary'
                        }}
                    >
                        Connectez-vous et rejoignez la communauté sportive
                    </Typography>
                </Box>

                {/* Formulaire de connexion côté droit */}
                <Box
                    sx={{
                        flex: { xs: '0 0 90%', sm: '0 0 80%', md: '1 0 50%' },
                        maxWidth: { xs: '100%', md: '500px' }
                    }}
                >
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Typography variant="h4" fontWeight="700">
                                Connexion
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Accédez à votre espace personnel
                            </Typography>
                        </Box>

                        <Box sx={{ p: 3 }}>
                            {/* Afficher une alerte si un message est défini */}
                            {alert.message && (
                                <Alert
                                    severity={alert.severity}
                                    sx={{ mb: 3 }}
                                    icon={getAlertIcon(alert.severity)}
                                >
                                    {alert.message}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    key="username"
                                    required
                                    type="text"
                                    label="Nom d'utilisateur"
                                    name="username"
                                    value={formData?.username}
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
                                />

                                <TextField
                                    key="password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    label="Mot de passe"
                                    name="password"
                                    value={formData?.password}
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
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={loading}
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        fontWeight: 600
                                    }}
                                >
                                    {loading ? "Connexion en cours..." : "Se connecter"}
                                </Button>

                                <Divider sx={{ my: 3 }} />

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: { xs: "column", sm: "row" },
                                        alignItems: "center",
                                        gap: 2
                                    }}
                                >
                                    <Link
                                        href="/ForgotPassword"
                                        underline="hover"
                                        color="primary"
                                        sx={{
                                            fontWeight: 500,
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Mot de passe oublié ?
                                    </Link>

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href="/Register"
                                        sx={{
                                            minWidth: '120px'
                                        }}
                                    >
                                        S'inscrire
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;