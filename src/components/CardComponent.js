import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function EventCard({ event }) {
    if (!event) {
        return null;
    }

    return (
        <Card sx={{ minWidth: 275, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {event.category}
                </Typography>
                <Typography variant="h5" component="div">
                    {event.event_name}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {event.event_date}
                </Typography>
                <Typography variant="body2">
                    {event.event_description}
                    <br />
                    Entre: {event.event_age_min} ans - {event.event_age_max} ans
                </Typography>
                <Typography variant="body1" fontWeight="bold" sx={{ mt: 'auto' }}>
                    {event.username}
                </Typography>
                <Button
                    variant="body2"
                    fontWeight="bold"
                    color="primary"
                    startIcon={<LocationOnIcon />}
                >
                    {event.event_ville}
                </Button>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                }}
            >
                <Button size="small">Voir les détails</Button>
                <Button size="small" variant="contained">Participer</Button>
            </CardActions>
        </Card>

    );
}
