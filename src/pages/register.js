import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";
import React from "react";

function Register({ formData, setFormData, alert, setAlert, loading, onNext }) {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

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

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: 2,
            }}
        >
            <Typography sx={{ fontSize: "30px", fontWeight: "900" }} color="primary">
                Bienvenue sur SportConnect
            </Typography>

            {alert.message && (
                <Alert severity={alert.severity} sx={{ mt: 2, mb: 2 }}>
                    {alert.message}
                </Alert>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: { xs: "90%", sm: "60%", md: "40%" } }}
            >
                <TextField
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={formData?.email || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="Nom d'utilisateur"
                    name="username"
                    value={formData?.username || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="Mot de passe"
                    name="password"
                    type="password"
                    value={formData?.password || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    required
                    label="Confirmer votre mot de passe"
                    name="confirmPassword"
                    type="password"
                    value={formData?.confirmPassword || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" type="submit" fullWidth disabled={loading}>
                    Étape suivante
                </Button>
            </Box>
        </Box>
    );
}

export default Register;