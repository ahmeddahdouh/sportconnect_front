import Box from "@mui/material/Box";
import {Alert, Button, CircularProgress, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import { format } from 'date-fns';



function PersonalInformationRegister() {
    debugger;
    const base_url_auth = process.env.REACT_APP_AUTH_BASE_URL;
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [formData, setFormData] = useState({
        ...data,
        firstname: "",
        familyname: "",
        date_of_birth:null,
        city: "",
        phone: "",

    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleChangeBirth(newValue){
        setFormData({ ...formData, date_of_birth: newValue});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const birthDay = formData['date_of_birth']
        const formattedDate = birthDay ? format(birthDay, 'yyyy-MM-dd') : '';
        formData['date_of_birth'] = formattedDate;
        delete formData.confirmPassword;
        console.log(formData)
        const response = await fetch(`${base_url_auth}/register`, {
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
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
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
                            <DatePicker
                                className="w-full"
                                label="Date de naissance"
                                value={formData.date_of_birth}
                                onChange={handleChangeBirth}
                                required
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        margin="normal"
                                        name="date_of_birth"
                                        variant="outlined"
                                        required/>
                                )}
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




                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Enregistrer
                        </Button>
                        </LocalizationProvider>
                    </form>

                </Box>
            </Box>
        </div>
    );
}

export default PersonalInformationRegister;
