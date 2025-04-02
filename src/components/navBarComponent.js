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
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Avatar from '@mui/material/Avatar';
import {userContext} from "../services/AuthService";
import {UserContextTest} from "../context/UserContext";


export default function ButtonAppBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    let username;
    username =  useContext(userContext).username;
    let imageLink = useContext(UserContextTest).user.profileImage
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
                {username && (
                    <ListItem button onClick={bundleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Se déconnecter" />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }} className=" top-0 left-0 w-full">
            <AppBar
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1999,
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
                        <div className="flex flex-row  md:justify-start justify-center" >
                            <a href="/booking" >
                                <img src="logo.png" alt="sportConnect logo" className="w-16"/></a>
                        </div>

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
                        {username && (
                            <Button color="primary" onClick={bundleLogout} endIcon={<LogoutIcon />}>
                                Se déconnecter
                            </Button>
                        )}
                        {<Avatar alt={username}
                                 component={Link} to='/MyProfile'
                                 src={imageLink} /> ||
                            <Avatar alt="SportConnect" src="sportConnect.png" />}
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
