import Box from "@mui/material/Box";
import {Alert, Button, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import UserEntity from "../entities/UserEntity";
import apiService from "../services/AuthService";
import {UserContext} from "../context/UserContext";

function Register() {

    const { user, updateUser } = useContext(UserContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [alert, setAlert] = useState({message: "", severity: ""});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(
        user
    );


    function handelChange(e) {
        if(formData.password !== formData.confirmPassword) {
            setAlert({message: "password do not match", severity: "warning"});
        }
        else
        {setAlert({message: '',severity: ""});}
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    async function handelSubmit(e) {
        updateUser(formData);
        console.log("nouvel valeur de user", user);
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setAlert({message: "La confirmation de mot de passe doit etre identique au mo de passe ",
                severity: "warning"});
        }
        const response = await fetch("http://localhost:5000/auth/register",{
            method: "POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        if (response.ok) {
            setAlert({message: "Inscription réussie", severity: "success"});
            setTimeout(window.location.href = "/SportsSelection", 3000);
        }
        else{
               setAlert({message:data.message, severity: "warning"});
        }



    }

    return (
        <div>
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
                            <TextField
                                key="confirmPassword"
                                required
                                type="password"
                                label="Confirmer votre mot de passe"
                                name="confirmPassword"
                                value={formData.confirmPassword}
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
                </Box>
            </div>
        </div>
    )
}

export default Register;