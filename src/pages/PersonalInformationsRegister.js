import Box from "@mui/material/Box";
import {Alert, Button, CircularProgress, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";


function PersonalInformationRegister() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [formData, setFormData] = useState({
        ...data,
        firstname: "",
        familyname: "",
        city: "",
        phone: "",
        date_of_birth: ""
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if (response.ok) {
            setLoading(true);
            setAlert({ message: "Inscription réussie", severity: "success" });
            setTimeout(() => {navigate("/", { state: formData }); setLoading(false);}, 3000);
        } else {
            setAlert({ message: data.message, severity: "warning" });
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
                <Typography
                    sx={{ fontSize: '30px', fontWeight: '900' }}
                    color="primary"
                >
                    Enregistrement des Informations Personnelles
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

                    {alert.message && (
                        <div>
                        <Alert severity={alert.severity} sx={{ marginBottom: 2 }}>
                            {alert.message}
                        </Alert>
                            <CircularProgress />
                        </div>

                    )

                    }

                    <form onSubmit={handleSubmit}>
                        <TextField
                            key="firstname"
                            required
                            type="text"
                            label="Prénom"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="familyname"
                            required
                            type="text"
                            label="Nom de famille"
                            name="familyname"
                            value={formData.familyname}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="city"
                            required
                            type="text"
                            label="Ville"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="phone"
                            required
                            type="tel"
                            label="Téléphone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            key="date_of_birth"
                            required
                            type="date"
                            label="Date de naissance"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Enregistrer
                        </Button>
                    </form>
                </Box>
            </Box>
        </div>
    );
}

export default PersonalInformationRegister;
