import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Alert } from "@mui/material";

function Login() {
    const fakeDatabase = [
        { id: 1, username: "john_doe", password: "password123" },
        { id: 2, username: "jane_smith", password: "securePass456" },
        { id: 3, username: "ahmed_dahdouh", password: "ahmedPass123" },
        { id: 4, username: "lucy_adams", password: "mySecret321" },
        { id: 5, username: "mike_johnson", password: "mikePass654" }
    ];

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [alert, setAlert] = useState({ message: "", severity: "" });

    function handelChange(e) {
        e.preventDefault();
        setAlert({ message: "", severity: "" })
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handelSubmit(e) {
        e.preventDefault();
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        const user = fakeDatabase.find(element => element.username === userData.username);
        if (!user) {
            setAlert({ message: "Cet utilisateur n'existe pas", severity: "error" });
        } else {
            if (userData.password === user.password) {
                setAlert({ message: "Connexion réussie", severity: "success" });
                setTimeout(() => window.location.href = "/booking", 1000);

            } else {
                setAlert({ message: "Mot de passe incorrect", severity: "warning" });
            }
        }
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
                <Typography
                    sx={{ fontSize: '30px', fontWeight: '900' }}
                    color="primary"
                >
                    Bienvenue sur SportConnect
                </Typography>
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
                    {/* Afficher une alerte si un message est défini */}
                    {alert.message && (
                        <Alert severity={alert.severity} sx={{ marginBottom: 2 }}>
                            {alert.message}
                        </Alert>
                    )}

                    <form action="" onSubmit={handelSubmit}>
                        <TextField
                            key="username"
                            required
                            type="text"
                            label="Nom d'utilisateur"
                            name="username"
                            value={formData.username}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="email"
                            required
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="password"
                            required
                            type="password"
                            label="Mot de passe"
                            name="password"
                            value={formData.password}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Valider
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
                                <a href="/booking">Mot de passe oublié</a>
                            </div>
                            <div>
                                <a href="">S'inscrire</a>
                            </div>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    );
}

export default Login;
