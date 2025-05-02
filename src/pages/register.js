import Box from "@mui/material/Box";
import { Alert, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    function handelChange(e) {
        const newFormData = { ...formData, [e.target.name]: e.target.value };
        setFormData(newFormData);

        if (newFormData.password && newFormData.confirmPassword && newFormData.password !== newFormData.confirmPassword) {
            setAlert({ message: "Les mots de passe ne correspondent pas", severity: "warning" });
        } else {
            setAlert({ message: "", severity: "" });
        }
    }

    async function handelSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setAlert({
                message: "La confirmation du mot de passe doit être identique au mot de passe",
                severity: "warning"
            });
            return;
        }

        setAlert({ message: "Étape 1/2", severity: "success" });
        setLoading(true);
        setTimeout(() => {
            navigate("/personalInfo", { state: formData });
            setLoading(false);
        }, 1000);
    }

    return (
        <div>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{ width: '160px', height: '90px' }}
                />
                <Typography sx={{ fontSize: '30px', fontWeight: '900' }} color="primary">
                    Bienvenue sur SportConnect
                </Typography>
                {!loading ? (
                    <Box
                        sx={{
                            width: {
                                xs: '90%',
                                sm: '80%',
                                md: '50%',
                                lg: '40%',
                                xl: '40%'
                            },
                            padding: 2,
                            marginTop: "-20px"
                        }}
                    >
                        {alert.message && (
                            <Alert severity={alert.severity} sx={{ marginBottom: 2 }}>
                                {alert.message}
                            </Alert>
                        )}

                        <form onSubmit={handelSubmit}>
                            <TextField
                                required
                                type="text"
                                label="Nom d'utilisateur"
                                name="username"
                                value={formData.username || ''}
                                onChange={handelChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handelChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                type="password"
                                label="Mot de passe"
                                name="password"
                                value={formData.password || ''}
                                onChange={handelChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                type="password"
                                label="Confirmer votre mot de passe"
                                name="confirmPassword"
                                value={formData.confirmPassword || ''}
                                onChange={handelChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                S'inscrire
                            </Button>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    marginTop: '10px'
                                }}
                            >
                                <div>
                                    <a href="/booking"></a>
                                </div>
                                <div>
                                    <a href="/login">Se connecter</a>
                                </div>
                            </div>
                        </form>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </div>
    );
}

export default Register;
