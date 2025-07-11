import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import authService from "../../services/AuthService";
import EventService from "../../services/EventService";
import AlertDialog from "../utils_components/DialogAlert";
import {useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import EventEntity from "../../entities/EventEntity";
import SportService from "../../services/SportService";


export default function EventCard(props) {
    const BASE_URL_IMAGE = `${process.env.REACT_APP_BASE_URL}/auth/uploads/team_photos/`;
    const currentUser = authService.getCurrentUser();
    const myEvent = new EventEntity(props.event);
    const navigate = useNavigate();
    const resolveRef = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [sports, setSports] = React.useState(null);
    const [eventSport, seteventSport] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [alertData, setAlertData] = React.useState({});
    const isParticipating = myEvent.isUserParticipant(currentUser?.id);

    useEffect(() => {
        const fetchSports = async () => {
            try {
                setLoading(true);
                const rawSports = await SportService.getAllSports();
                // Transformation en entités avec validation
                const validSports = rawSports
                    .filter(sport => sport.isValid());
                // Utilise isValid() de SportEntity
                setSports(validSports);
            } catch (err) {
                setError(err.message || "Failed to load sports");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSports();

        // Nettoyage optionnel
        return () => {
            // Annule la requête si nécessaire
        };
    }, []);


    useEffect(() => {
            console.log(sports);
            seteventSport(sports?.find(sport => sport.id === myEvent?.id_sport));
        }, [sports]);

    const handleClose = () => setOpen(false);
    const openAlert = () => new Promise(resolve => {
        resolveRef.current = resolve;
        setOpen(true);
    });


    const showDetailClick = () => {

        navigate(`/details/${myEvent.id}`, {  state: {
                ...myEvent,
                events: props.eventIds,
            } });
    };

    return (
        <div className="relative">
            <Card className="overflow-hidden transition-all hover:shadow-md">
                <div className="relative h-48 w-full">
                    <img
                        src={myEvent.getImageUrl(BASE_URL_IMAGE)}
                        className="h-full w-full object-cover"
                        alt="event"
                    />
                </div>

                <CardContent className="p-4 flex flex-col h-auto">
                    {isParticipating && (
                        <div className="absolute top-1 left-1">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Inscrit
                            </span>
                        </div>
                    )}

                    <div className="absolute top-1 right-1">
                            <span className="bg-blue-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                 {sports?.find(sport => sport.id === myEvent?.id_sport).sport_nom}
                            </span>
                    </div>


                    <h3 className="font-bold text-lg line-clamp-1">{myEvent.event_name}</h3>

                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <CalendarMonthIcon className="mr-2 h-4 w-4" />
                            <div className="flex flex-row space-x-2">
                                <span className="font-medium">{myEvent.getFormattedDate()}</span>
                                <span className="text-gray-600 font-thin">{myEvent.getTimeRange()}</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <LocationOnIcon className="mr-2 h-4 w-4" />
                            <span className="line-clamp-1">{myEvent.event_ville}</span>
                        </div>
                        <div className="flex items-center">
                            <GroupIcon className="mr-2 h-4 w-4" />
                            <span>{myEvent.getParticipantCount()} participants</span>
                        </div>
                    </div>
                </CardContent>

                <CardActions className="flex justify-center gap-2">
                    <button
                        className="bg-blue-600 text-sm font-bold py-2 text-white w-full rounded hover:bg-blue-700 transition"
                        onClick={showDetailClick}
                    >
                        Voir les détails
                    </button>
                </CardActions>

                <AlertDialog
                    open={open}
                    onClose={handleClose}
                    resolveRef={resolveRef}
                    alertData={alertData}
                />
            </Card>
        </div>
    );
}
