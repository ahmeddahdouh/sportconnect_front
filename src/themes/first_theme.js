    import { createTheme } from '@mui/material/styles';

    const first_theme = createTheme({
        palette: {
            primary: {
                main: '#2563eb',
                light: '#63a4ff',
                dark: '#004ba0',
            },
            secondary: {
                main: '#9c27b0', // Couleur secondaire
            },
            background: {
                default: '#f4f6f8', // Couleur de fond par défaut
                paper: '#ffffff', // Couleur de fond des éléments type "papier"
            },
            text: {
                primary: '#333333', // Couleur principale du texte
                secondary: '#757575', // Texte secondaire
            },
        },
    });

    export default first_theme