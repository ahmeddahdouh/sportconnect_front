import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import authService from "../services/AuthService";


export default function EventCard({ event }) {
    const [formData, setFormData] = React.useState({
        user_id:authService.currentUser.sub.id,
        event_id: event.id
    })
    const [inscription,setInscription] = React.useState(false)
    console.log(formData)
    const BaseService = 'http://localhost:5000';

    async function  hundelClickParticipate()
    {
        const response = await axios.post(BaseService +`/event/participate`,
            formData
            );
        debugger;
        if (response.status === 201) {
            event.members.push({"id":authService.currentUser.sub.id,})
            setInscription(true)
        }
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
                { !event.members.some(element=>element.id == formData["user_id"]) ? <Button size="small" variant="contained"
                onClick={()=>{hundelClickParticipate(event.id)}}
                >Participer</Button>:null}
            </CardActions>
        </Card>

    );
}
