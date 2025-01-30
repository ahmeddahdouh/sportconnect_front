import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import {useEffect} from "react";


export default function ButtonAppBar(props) {
    useEffect(() => {
    }, []);

    function bundleLogout() {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.username}
                    </Typography>
                    <Button color="inherit"  component={Link} to="/booking">Trouvez un Evenement</Button>
                    <Button color="inherit" component={Link} to="/">Organiser un Evenement</Button>
                    <Button color="inherit" >Contactez Nous</Button>
                    { props.username?<Button
                        color="inherit"
                        onClick={bundleLogout}
                        sx={{ fontSize: '1.1rem', fontWeight: 'bold', ml: 2 }} // Taille plus grande, texte gras
                    >
                        Se deconnecter
                    </Button> : null }

                </Toolbar>
            </AppBar>
        </Box>
    );
}
