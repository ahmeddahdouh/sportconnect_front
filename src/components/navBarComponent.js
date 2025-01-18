import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
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
                    </Typography>
                    <Button color="inherit"  component={Link} to="/booking">Trouvez un Evenement</Button>
                    <Button color="inherit" component={Link} to="/">Organiser un Evenement</Button>
                    <Button color="inherit" >Contactez Nous</Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to ='/login'
                        sx={{ fontSize: '1.1rem', fontWeight: 'bold', ml: 2 }} // Taille plus grande, texte gras
                    >
                        Se Connecter
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
