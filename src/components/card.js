import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Composant de la carte qui reçoit un événement sportif en prop
export default function EventCard({ event }) {
    if (!event) {
        return null; // Si aucun événement n'est passé, ne rien afficher
    }

    return (
        <Card sx={{ minWidth: 275, height: 300, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {event.category} {/* Catégorie de l'événement */}
                </Typography>
                <Typography variant="h5" component="div">
                    {event.name} {/* Nom de l'événement */}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {event.date} {/* Date de l'événement */}
                </Typography>
                <Typography variant="body2">
                    {event.description} {/* Description de l'événement */}
                    <br />
                    {'"Détails supplémentaires ici"'}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                <Button size="small">Voir les détails</Button>
                <Button size="small" variant='contained'>Participer</Button>
            </CardActions>
        </Card>
    );
}
