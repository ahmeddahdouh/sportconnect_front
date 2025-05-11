import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import IosShareIcon from '@mui/icons-material/IosShare';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from '@mui/material/Tooltip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Alert, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { Map, Marker } from "pigeon-maps";
import EventService from "../services/EventService";
import authService from "../services/AuthService";
import * as React from "react";
import AlertDialog from "../components/DialogAlert";
import Avatar from "@mui/material/Avatar";
import EventEntity from "../entities/EventEntity";
import DeleteIcon from '@mui/icons-material/Delete';
import ChannelService from "../services/ChannelService";
import ChatAccessButton from '../components/ChatAccessButton';

const DatailsEventPage = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();
    const resolveRef = useRef(null);
    const [event, setEvent] = useState(null);
    const [alertData, setAlertData] = useState({});
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [inscription, setInscription] = useState(false);

    const token = localStorage.getItem("access_token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        const eventId = Number(id);
        if (eventId) getEventById(eventId);
    }, [inscription]);

    async function getEventById(id) {
        try {
            const response = await EventService.getEventById(headers, id);
            setEvent(new EventEntity(response));
        } catch (e) {
            console.error(e);
        }
    }

    const handleClose = () => setOpen(false);
    const openAlert = () => new Promise(resolve => {
        resolveRef.current = resolve;
        setOpen(true);
    });

    const formData = {
        user_id: authService.getCurrentUser()?.id,
        event_id: id
    };

    async function handleDelete(id) {
        setAlertData({
            title: "Êtes-vous sûr de vouloir supprimer cet évènement ?",
            message: "Cela entraînera l'annulation de toutes les participations. Cette action est définitive.",
            buttonMessage: "Supprimer",
            buttonColor: "error"
        });
        const userResponse = await openAlert();
        if (userResponse) {
            try {
                await EventService.deleteEvent(id);
                window.location.href = "/myEvents";
            } catch (e) {
                setAlert({ message: e?.response?.data?.error || e.message, severity: "error" });
            }
        }
    }

    async function handleParticipate() {
        setAlertData({
            title: "Confirmation d'inscription à l'événement",
            message: "Souhaitez-vous confirmer votre inscription ?",
            buttonMessage: "Confirmer",
            buttonColor: "primary"
        });
        const userResponse = await openAlert();
        if (userResponse) {
            try {
                const response = await EventService.participate(formData);
                await ChannelService.addMemberToChannel(id, formData.user_id);
                setAlert({ message: response.message, severity: "success" });
                setInscription(!inscription);
            } catch (e) {
                setAlert({ message: e?.response?.data?.error || e.message, severity: "error" });
            }
        }
    }

    async function handleUnsubscribe() {
        try {
            await EventService.unsubscribe(id, headers);
            setInscription(!inscription);
        } catch (e) {
            setAlert({ message: e?.response?.data?.error || e.message, severity: "error" });
        }
    }

    const isParticipating = event?.members?.some(m => m.id === formData.user_id);
    const isManager = Number(event?.id_gestionnaire) === formData.user_id;
    const isFull = event?.members?.length >= event?.event_max_utilisateur;

    const getProfileImageUrl = (img) => `${BASE_URL}/auth/uploads/${img}`;

    if (!event) {
        return <div className="text-center py-20 text-gray-500">Chargement de l'événement...</div>;
    }

    return (
        <div className="container py-10 shadow">
            {alert.message && (
                <Alert severity={alert.severity} className="my-4 w-1/2 mx-auto">{alert.message}</Alert>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Link to="/booking" className="text-sm text-muted-foreground hover:text-blue-600">Événements</Link>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-sm">{event.event_name}</span>
                        </div>
                        <div className="relative">
                            <img
                                src={event.event_image && event.event_image !== "None"
                                    ? `${BASE_URL}/auth/uploads/team_photos/${event.event_image}`
                                    : "/cover.jpg"}
                                alt={event.event_name}
                                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                            />
                            <Badge className="absolute top-4 right-4 text-sm">{}</Badge>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <CalendarMonthIcon className="mr-2 text-blue-600" />
                                <div>
                                    <p className="font-medium">{event.getFormattedDate()}</p>
                                    <span className="text-gray-600 font-thin">{event.getTimeRange()}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <LocationOnIcon className="mr-2 text-blue-600" />
                                <div>
                                    <p className="font-medium">{event.event_ville}</p>
                                </div>
                            </div>
                        </div>
                        <Divider className="my-6" />
                        <h2 className="text-xl font-semibold">À propos de cet événement</h2>
                        <p className="text-muted-foreground">{event.event_description}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <GroupIcon className="mr-2 text-primary" />
                                    <span className="font-medium">{event.members.length} participants</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {event.event_max_utilisateur - event.members.length} places restantes
                                </span>
                            </div>

                            <div className="flex flex-col gap-4">
                                {!isParticipating && !isManager && !isFull && (
                                    <Button variant="contained" onClick={handleParticipate} fullWidth>S'inscrire</Button>
                                )}
                                {isParticipating && !isManager && (
                                    <Button variant="contained" color="error" onClick={handleUnsubscribe} fullWidth>Se désinscrire</Button>
                                )}
                                {isManager && (
                                    <Button variant="outlined" color="error" onClick={() => handleDelete(event.id)} fullWidth>
                                        <DeleteIcon className="mr-2" /> Supprimer
                                    </Button>
                                )}
                                <ChatAccessButton eventId={event.id} />
                                <Button variant="outlined" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")} fullWidth>
                                    <IosShareIcon className="mr-2" />Partager
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                                <LocationOnIcon className="mr-2 text-primary" />
                                <h3 className="font-medium">Lieu</h3>
                            </div>
                            <Map height={300} defaultCenter={[Number(event.longitude), Number(event.latitude)]} defaultZoom={11}>
                                <Marker width={50} anchor={[Number(event.longitude), Number(event.latitude)]} />
                            </Map>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <AlertDialog open={open} onClose={handleClose} resolveRef={resolveRef} alertData={alertData} />
        </div>
    );
};

export default DatailsEventPage;
