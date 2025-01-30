import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Button, TextField, Typography, Alert} from "@mui/material";

function Login() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [alert, setAlert] = useState({message: "", severity: ""});

    function handelChange(e) {
        e.preventDefault();
        setAlert({message: "", severity: ""})
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handelSubmit(e) {
        e.preventDefault();
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        const response = await fetch("http://localhost:5000/auth/login",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers:
                    {
                        "Content-type": "application/json"
                    }
            }
        )

        const data = await response.json();
        if (response.ok) {
            if (data.access_token) {
                setAlert({message: "Connexion réussie", severity: "success"});
                localStorage.setItem("access_token", data.access_token);
                setTimeout(() => window.location.href = "/booking", 1000);

            } else {
                setAlert({message: "Mot de passe incorrect", severity: "warning"});
            }
        } else{
            if  (response.status === 401){
                setAlert({message:data.message, severity: "warning"});
            }
            else {
                setAlert({ message: data.message, severity: "error" });

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
                        style={{width: '160px', height: '90px'}}
                    />
                    <Typography
                        sx={{fontSize: '30px', fontWeight: '900'}}
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
                            <Alert severity={alert.severity} sx={{marginBottom: 2}}>
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
                                    <a href="/register">S'inscrire</a>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Box>
            </div>
        );
    }

    export default Login;
