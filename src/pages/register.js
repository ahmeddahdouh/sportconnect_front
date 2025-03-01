import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Alert, Button, TextField, Typography } from "@mui/material";

function Register() {
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handelChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.name);
    }

    async function handelSubmit(e) {
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
            setAlert({ message: "Inscription réussie", severity: "success" });
            setTimeout(() => window.location.href = "/SportsSelection", 3000);
        } else {
            setAlert({ message: data.message, severity: "warning" });
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: { xs: 2, md: 4 },
                animation: 'fadeIn 1s ease-in-out'
            }}
        >
            {/* Logo Section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    animation: 'slideInLeft 0.8s ease-out'
                }}
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                        width: '200px',
                        height: '112px',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                />
            </Box>

            {/* Form Section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: 'slideInRight 0.8s ease-out'
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '70%' },
                        background: 'white',
                        borderRadius: 2,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        padding: 4,
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)' }
                    }}
                >
                    {alert.message && (
                        <Alert
                            severity={alert.severity}
                            sx={{
                                mb: 2,
                                animation: 'fadeIn 0.5s ease-in'
                            }}
                        >
                            {alert.message}
                        </Alert>
                    )}

                    <form onSubmit={handelSubmit}>
                        <TextField
                            required
                            type="text"
                            label="Nom d'utilisateur"
                            name="username"
                            value={formData.username}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main'
                                    }
                                }
                            }}
                        />
                        <TextField
                            required
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main'
                                    }
                                }
                            }}
                        />
                        <TextField
                            required
                            type="password"
                            label="Mot de passe"
                            name="password"
                            value={formData.password}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main'
                                    }
                                }
                            }}
                        />
                        <TextField
                            required
                            type="password"
                            label="Confirmer votre mot de passe"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handelChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main'
                                    }
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            S'inscrire
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2
                            }}
                        >
                            <Typography
                                component="a"
                                href="/booking"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: 'primary.dark'
                                    }
                                }}
                            >
                                {/* Empty link placeholder */}
                            </Typography>
                            <Typography
                                component="a"
                                href="/login"
                                sx={{
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                        color: 'primary.dark'
                                    }
                                }}
                            >
                                Se connecter
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Box>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </Box>
    );
}

export default Register;