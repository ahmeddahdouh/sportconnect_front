import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ButtonAppBar(props) {
    const [mobileOpen, setMobileOpen] = useState(false);

    function bundleLogout() {
        localStorage.clear();
        window.location.href = "/login";
    }
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobileOpen(open);
    };

    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem button component={Link} to="/booking">
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary="Trouver un événement" />
                </ListItem>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText primary="Organiser un événement" />
                </ListItem>
                <ListItem button component={Link} to="/myEvents" >
                    <ListItemIcon><EmojiEventsIcon/></ListItemIcon>
                    <ListItemText primary="Mes Evenement" />
                </ListItem>
                {props.username && (
                    <ListItem button onClick={bundleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Se déconnecter" />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{ display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Nom d'utilisateur ou Nom du site */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: 'primary.main',
                            fontWeight: 'bold',
                            textAlign: { xs: 'center', md: 'left' },
                        }}
                    >
                        {props.username || 'SportConnect'}
                    </Typography>

                    {/* Boutons de navigation sur desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button color="primary" component={Link} to="/booking" startIcon={<SearchIcon />}>
                            Trouver un événement
                        </Button>
                        <Button color="primary" component={Link} to="/" startIcon={<AddIcon />}>
                            Organiser un événement
                        </Button>
                        <Button color="primary" startIcon={<EmojiEventsIcon />} component={Link} to="/myEvents" >
                           Mes Evenements
                        </Button>
                        {props.username && (
                            <Button color="primary" onClick={bundleLogout} endIcon={<LogoutIcon />}>
                                Se déconnecter
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer pour mobile */}
            <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </Box>
    );
}
