import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Button, TextField, Typography, Alert, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/joy";

function Login() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [formData, setFormData] = useState({
        username: "",
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
                setTimeout(() => window.location.href = "/landingPage", 1000);

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
            <div >
                <Box

                    sx={{
                        height: '100vh',
                        display: 'flex',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        justifyContent: { xs: 'center', sm: 'space-around' },                        alignItems: 'center',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{
                            width: isMobile ? '160px' : '280px',
                            height: isMobile ? '90px' : '160px'
                        }}
                    />

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
                        <Typography
                            sx={{fontSize: '30px', fontWeight: '900'}}
                            color="primary"
                        >
                            Bienvenue sur SportConnect
                        </Typography>
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
                                    <a href="/Register">S'inscrire</a>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Box>
            </div>
        );
    }

    export default Login;
