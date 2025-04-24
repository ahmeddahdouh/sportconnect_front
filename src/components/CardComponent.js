import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import authService from "../services/AuthService";
import EventService from "../services/EventService";
import AlertDialog from "./DialogAlert";
import ShowEventComponent from "./ShowEventComponent";
import {useRef} from "react";
import {useNavigate} from 'react-router-dom';

export default function EventCard(props) {

    const [formData] = React.useState({
        user_id: authService.currentUser.id,
        event_id: props?.event.id
    });
    const navigate = useNavigate();
    const resolveRef = useRef(null);
    const [inscription, setInscription] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const isParticipating = props.event?.members?.some(element => element.id === formData.user_id);
    const [alertData, setAlertData] = React.useState({});
    const BaseService = 'http://localhost:5000';
    const handleClose = () => setOpen(false);
    const openAlert = () => {
        return new Promise((resolve) => {
            resolveRef.current = resolve;
            setOpen(true);
        });
    };



    async function hundelClickDelete(id) {

        setAlertData(
            {
                "title": "Est vous sur de vouloir supprimer cet evenement ! ",
                "message": "La suppression de cet événement entraînera l'annulation de toutes les participations et notifiera tous les inscrits.\n" +
                    "Veuillez noter que cette action est définitive et ne pourra pas être annulée.\n" +
                    "Souhaitez-vous confirmer la suppression de l'événement ?",
                "buttonMessage": "Supprimer",
                "buttonColor": "error"
            }
        )

        const userResponse = await openAlert();
        if (userResponse) {
            try {
                const response = await EventService.deleteEvent(props.event.id);
                window.location.reload();
            } catch (e) {
                props.ParentsetAlert({
                    message: e.response.data.error,
                    severity: "error"
                });
            }
        }

    }



    const handleOnClick = async () => {
        setAlertData({
            "message": ""
        });
        await openAlert();
    };




    const showDetailClick = () => {
        const myEvent = props.event;
        navigate(`/details/${props.event.id}`, {state: myEvent});
    };


    return (
        <div className="relative">
            <Card className="overflow-hidden  transition-all hover:shadow-md">
                <div className="p-0">
                    <div className="relative h-48 w-full  ">
                        <img
                            src={props.event.event_image !== "None" ? `http://localhost:5000/auth/uploads/team_photos/${props.event.event_image}` : "/cover.jpg"}
                            className="h-full w-full object-cover"/>
                    </div>
                </div>

                <CardContent className="p-4 flex flex-col h-auto">
                    {isParticipating && (
                        <div className="absolute top-1 right-1">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Inscrit
              </span>
                        </div>
                    )}
                    <h3 className="font-bold text-lg line-clamp-1">{props.event.event_name}</h3>
                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <CalendarMonthIcon className="mr-2 h-4 w-4"/>
                            <span className="font-medium">
                                {new Date(props.event.event_date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <LocationOnIcon className="mr-2 h-4 w-4"/>
                            <span className="line-clamp-1">  {props.event.event_ville}</span>
                        </div>
                        <div className="flex items-center">
                            <GroupIcon className="mr-2 h-4 w-4"/>
                            <span>  {props.event?.members?.length} participants</span>
                        </div>
                    </div>


                </CardContent>
                <CardActions className=" flex justify-center gap-2">
                    <button
                        className="bg-blue-600 text-sm font-bold py-2 text-white w-full rounded hover:bg-blue-700 transition"
                        size="small"
                        onClick={showDetailClick}
                    >
                        Voir les détails
                    </button>
                    {/* {!isParticipating && !isManager && !isFull && (
                        <Button
                            size="small"
                            variant="contained"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => hundelClickParticipate(props.event.id)}
                        >
                            Participer
                        </Button>
                    )}
                    {isManager && (
                        <Button
                            size="small"
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon/>}
                            onClick={() => hundelClickDelete(props.event.id)}
                        >
                            Supprimer
                        </Button>
                    )}
                    {isParticipating && !isManager && (
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon/>}
                            color='error'
                            onClick={() => hundelClickUnsubscribe(props.event.id)}
                        >
                            Se retirer
                        </Button>
                    )}*/}
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