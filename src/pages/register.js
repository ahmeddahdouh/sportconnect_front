import Box from "@mui/material/Box";
import {Alert, Button, CircularProgress, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {UserContextTest} from "../context/UserContext";
import {useNavigate} from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const {user, updateUser} = useContext(UserContextTest);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [alert, setAlert] = useState({message: "", severity: ""});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(
        {}
    );
    const [loading, setLoading] = useState(false);


    function handelChange(e) {
        if (formData.password !== formData.confirmPassword) {
            setAlert({message: "password do not match", severity: "warning"});
        } else {
            setAlert({message: '', severity: ""});
        }
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    async function handelSubmit(e) {
        updateUser(formData);
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setAlert({
                message: "La confirmation de mot de passe doit etre identique au mo de passe ",
                severity: "warning"
            });
        }
        setAlert({message: "Etape 1/2 ", severity: "success"});
        setLoading(true);
        setTimeout(()=>{navigate("/personalInfo", {state: formData}) ;
            setLoading(false);}, 1000);

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
                    { !loading ?
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
                    </Box>:
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>

                    }
                </Box>
            </div>

        </div>
    )
}

export default Register;