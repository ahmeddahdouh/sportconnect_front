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
import authService, {userContext} from "../services/AuthService";
import {UserContextTest} from "../context/UserContext";

export default function ButtonAppBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    let username;
    username =  useContext(userContext).username;
    let imageLink = authService.currentUser.profileImage
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(45deg, #f77f16 10%, #42a5f5 90%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1999,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Menu Mobile */}
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              display: { xs: 'block', md: 'none' },
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Link to="/booking" className="flex items-center">
              <img
                src="logo.png"
                alt="SportConnect logo"
                className="w-20 mr-2 transition-transform hover:scale-110"
              />

            </Link>
          </Typography>

          {/* Navigation Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {[
              { text: 'Trouver', icon: <SearchIcon />, to: '/booking' },
              { text: 'Organiser', icon: <AddIcon />, to: '/' },
              { text: 'Mes Événements', icon: <EmojiEventsIcon />, to: '/myEvents' },
            ].map((item, index) => (
              <Button
                key={index}
                component={Link}
                to={item.to}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {/* Avatar et Logout */}
            {username && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  alt={username}
                  src={imageLink}
                  component={Link}
                  to="/MyProfile"
                  sx={{
                    border: '2px solid white',
                    '&:hover': { transform: 'scale(1.1)', transition: 'all 0.3s ease' }
                  }}
                />
                <Button
                  onClick={bundleLogout}
                  endIcon={<LogoutIcon />}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Déconnexion
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          }
        }}
      >
        {drawerList}
      </Drawer>
    </Box>
  );
}
