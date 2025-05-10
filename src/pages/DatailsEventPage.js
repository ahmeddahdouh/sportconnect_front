import {useLocation, useParams} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import IosShareIcon from '@mui/icons-material/IosShare';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Tooltip from '@mui/material/Tooltip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Alert, Button} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import {Map, Marker} from "pigeon-maps"
import EventService from "../services/EventService";
import authService from "../services/AuthService";
import * as React from "react";
import AlertDialog from "../components/DialogAlert";
import Avatar from "@mui/material/Avatar";
import EventEntity from "../entities/EventEntity";
import DeleteIcon from '@mui/icons-material/Delete';


const DatailsEventPage = () => {
    let BASE_URL = process.env.REACT_APP_BASE_URL;
  const { id } = useParams();
    const resolveRef = useRef(null);
    const [originalEvents, setOriginalEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [alertData, setAlertData] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = useState({message: "", severity: ""});
    const [inscription,setInscription] = useState(false);
    const token = localStorage.getItem("access_token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        debugger;
        const eventId = Number(id);
        if (eventId) {
            getEventById(eventId);
        } else {
            // Rediriger ou afficher une erreur
            console.warn("Aucun ID d'événement fourni.");
        }
    }, []);

    async function getEventById(id) {
        debugger
        try {
            const response = await EventService.getEventById(headers,id);
            setEvent(new EventEntity(response));
        } catch (e) {
            console.error(e);
        }
    }

    const currentUrl = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

    const handleShare = () => {
        window.open(facebookUrl, "_blank", "width=600,height=400");
    };

    const handleClose = () => setOpen(false);
    const openAlert = () => {
        return new Promise((resolve) => {
            resolveRef.current = resolve;
            setOpen(true);
        });
    };

    const [formData] = React.useState({
        user_id: authService.getCurrentUser().id,
        event_id:id
    });


    async function hundelClickDelete(id) {
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
                setAlert({
                    message: e.response.data.error,
                    severity: "error"
                });
            }
        }
    }

    const isParticipating = event?.members.some(element => element.id === formData.user_id);
    const isManager = Number(event?.id_gestionnaire) === formData.user_id;
    const isFull = event?.members.length >= event?.event_max_utilisateur;

    async function hundelClickParticipate() {

        setAlertData(
            {
                "title": "Confirmation d'inscription à l'événement",
                "message": "Votre inscription à l'événement sera immédiatement confirmée.\n" +
                    "                    Veuillez noter que cette action est définitive et que votre participation sera visible publiquement.\n" +
                    "                    Souhaitez-vous confirmer votre inscription ?",
                "buttonMessage": "Confirmer",
                "buttonColor": "primary"
            }
        )

        const userResponse = await openAlert();
        if (userResponse) {
            try {
                const response = await EventService.participate(formData);
                setAlert({
                    message: response.message,
                    severity: "success",
                });
                event?.members.push({
                    "id": authService.getCurrentUser().id,
                    "firstname": authService.getCurrentUser().username
                })
                setInscription(!inscription)
                setTimeout(() => {
                    setAlert({
                        message: "",
                        severity: "",
                    });
                }, 1000);

            } catch (e) {
               setAlert({
                    message: e.message,
                    severity: "error"
                });
                setTimeout(() => {
                   setAlert({
                        message: "",
                        severity: "",
                    });
                }, 2000)

            }

        }

    }


    async function hundelClickUnsubscribe(event_id) {
        try {
            const response = await EventService.unsubscribe(event_id, headers);
            const index = event?.members.findIndex(element => element.id == authService.getCurrentUser().id)
            event?.members.splice(index, 1);
            setInscription(!inscription)
        } catch (e) {
            if (e.message) {
               setAlert({
                    message: e.response.data.error,
                    severity: "error"
                });
            } else {
                console.error(e);
            }
        }


    }

    function getProfileImageUrl(profileImage) {
        return `${BASE_URL}/auth/uploads/${profileImage}`;
    }

    return (

        <div className="container py-10  shadow">
            {alert.message && (
                <Alert severity={alert.severity} id="error-message" className="my-4 w-1/2 mx-auto">
                    {alert.message}
                </Alert>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Link to="/booking" className="text-sm text-muted-foreground hover:text-blue-600">
                                Événements
                            </Link>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-sm">{event?.event_name}</span>
                        </div>
                        <div className="relative">
                            <img
                                src={event?.event_image !== "None" ? `${BASE_URL}/auth/uploads/team_photos/${event?.event_image}` : "/cover.jpg"}

                                alt={event?.event_name}
                                className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                            />
                            <Badge className="absolute top-4 right-4 text-sm">{}</Badge>
                        </div>
                    </div>


                    <div>
                        <h1 className="text-3xl font-bold mb-4">{event?.event_name}</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <CalendarMonthIcon className="h-5 w-5 mr-2 text-blue-600"/>
                                <div>
                                    <p className="font-medium">
                                        {event?.getFormattedDate()}
                                    </p>
                                  <span className="text-gray-600 font-thin"> {event?.getTimeRange()}</span>

                                <p className="text-sm text-muted-foreground">

                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <LocationOnIcon className="h-5 w-5 mr-2 text-blue-600"/>
                                <div>
                                    <p className="font-medium">{event?.event_ville}</p>
                                    <p className="text-sm text-muted-foreground">{event?.event_ville}</p>
                                </div>
                            </div>
                        </div>


                        <Divider className="my-6"/>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">À propos de cet événement</h2>
                            <p className="text-muted-foreground">{event?.event_description}</p>
                        </div>

                        <Divider className="my-6"/>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Informations importantes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                { event?.price > 0 && <div>
                                    <h3 className="font-medium">Prix</h3>
                                    <p className="text-muted-foreground">{event?.price} $</p>
                                </div>}
                                { event?.date_limite_inscription > 0 &&
                                <div>

                                    <h3 className="font-medium">Date limite d'inscription</h3>
                                    <p className="text-muted-foreground">{event?.date_limite_inscription}</p>
                                </div>}
                                <div>
                                    <h3 className="font-medium">Conditions de participation</h3>
                                    <p className="text-muted-foreground">{event?.event_commande_participation}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium">Commodités</h3>
                                    <ul className="text-muted-foreground">
                                        <li>
                                            {event?.commodites}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <GroupIcon className="h-5 w-5 mr-2 text-primary"/>
                                    <span className="font-medium">{event?.members.length} participants</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                  {event?.event_max_utilisateur - event?.members.length} places restantes
                </span>
                            </div>

                            <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{width: `${(event?.participants / event?.maxParticipants) * 100}%`}}
                                ></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {!isParticipating && !isManager && !isFull && (
                                <Button variant="contained" color="primary"
                                        onClick={() => hundelClickParticipate(event?.id)}
                                      disabled={new Date(event?.event_date) < new Date()}
                                        fullWidth>
                                    S'inscrire à l'événement
                                </Button> )}
                                {isParticipating && !isManager &&
                                <Button variant="contained" color="error"
                                        onClick={() => hundelClickUnsubscribe(event?.id)}
                                        disabled={new Date(event?.event_date) < new Date() || new Date(event?.date_limite_inscription) < new Date()}
                                        fullWidth>
                                    Se désinscrire de l'événement
                                </Button> }
                                {isManager &&
                                <Button variant="outlined" color="error" fullWidth onClick={()=>{hundelClickDelete(event?.id)}}>
                                    <DeleteIcon className="h-4 w-4 mr-2"/>
                                    Supprimer
                                </Button>}

                                <Button variant="outlined" color="primary" fullWidth onClick={handleShare}>
                                    <IosShareIcon className="h-4 w-4 mr-2"/>
                                    Partager
                                </Button>
                            </div>

                            <Divider/>

                            <div>
                                <div className="flex items-center mb-4">
                                    <PersonIcon className="h-5 w-5 mr-2 text-primary"/>
                                    <h3 className="font-medium">Organisateur</h3>
                                </div>
                                <Link href={`/organizers/${event?.username}`}
                                      className="flex items-center hover:text-primary">
                                    <div
                                        className="w-10 h-10 rounded-full bg-blue-200 text-blue-600 flex items-center justify-center mr-2">
                                        <PersonIcon className="h-6 w-6"/>
                                    </div>
                                    <span>{event?.username}</span>
                                </Link>
                            </div>

                            <Divider/>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <GroupIcon className="h-5 w-5 mr-2 text-primary"/>
                                        <h3 className="font-medium">Participants</h3>


                                    </div>
                                    <Link href=""
                                          className="text-sm text-primary">
                                        Voir tous
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {event?.members.map((participant) => (
                                        <Link
                                            href=""
                                            className="flex items-center hover:text-primary"
                                        >
                                            <Tooltip title={participant.firstname}>
                                            {participant.profileImage ? (
                                                <Avatar alt={participant.firstname} src={getProfileImageUrl(participant.profileImage)} sx={{width: 32, height: 32}}/>
                                            ) : (
                                                <Avatar sx={{width: 32, height: 32, bgcolor: '#e5e7eb', color: '#4b5563'}}>
                                                    {participant.firstname.slice(0, 1).toUpperCase()}
                                                </Avatar>
                                            )}
                                            </Tooltip>
                                        </Link>
                                    ))}
                                    <div
                                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">

                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                                <LocationOnIcon className="h-5 w-5 mr-2 text-primary"/>
                                <h3 className="font-medium">Lieu</h3>
                            </div>
                            <div className="aspect-video bg-muted rounded-md mb-2 overflow-hidden">
                                <Map height={300} defaultCenter={[Number(event?.longitude), Number(event?.latitude)]}
                                     defaultZoom={11}>
                                    <Marker width={50} anchor={[Number(event?.longitude), Number(event?.latitude)]}/>
                                </Map>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{event?.address}</p>
                            <Button variant="contained" className="w-full"
                                    onClick={() =>
                                        window.open(`https://www.google.com/maps?q=${Number(event?.longitude)},${Number(event?.latitude)}`, "_blank")
                                    }

                            >

                                Voir sur la carte
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <AlertDialog
                open={open}
                onClose={handleClose}
                resolveRef={resolveRef}
                alertData={alertData}
            />
        </div>
    )
}

export default DatailsEventPage;

