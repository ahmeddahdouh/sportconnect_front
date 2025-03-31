import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import authService from "../services/AuthService";
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from "./DialogAlert";
import {useRef} from "react";
import EventService from "../services/EventService";
import ShowEventComponent from "./ShowEventComponent";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';


export default function EventCard(props) {
    const token = localStorage.getItem("access_token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const [formData, setFormData] = React.useState({
        user_id:authService.currentUser.id,
        event_id: props?.event.id
    })
    const resolveRef = useRef(null);
    const [inscription,setInscription] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [openEvent,setOpenEvent] = React.useState(false);
    const [alertData , setAlertData] = React.useState({});
    const [alert , setAlert] = React.useState({message: "",
        severity: ""});

    const handleClose = () => setOpen(false);
    const handleCloseEvent = () => setOpenEvent(false);

    const BaseService = 'http://localhost:5000';


    const openAlert = () => {
        return new Promise((resolve) => {
            resolveRef.current = resolve;
            setOpen(true);
        })
    }


    async function  hundelClickParticipate()
    {
        setAlertData(
            {
                "title":"Confirmation d'inscription à l'événement",
                "message":"Votre inscription à l'événement sera immédiatement confirmée.\n" +
                "                    Veuillez noter que cette action est définitive et que votre participation sera visible publiquement.\n" +
                    "                    Souhaitez-vous confirmer votre inscription ?",
                "buttonMessage":"Confirmer",
                "buttonColor":"primary"
            }
        )

        const userResponse = await openAlert();

        if (userResponse){
            const response = await axios.post(BaseService +`/event/participate`,
                formData
            );
            if (response.status === 201) {
                props.event.members.push({"id":authService.currentUser.id,"firstname":authService.currentUser.username})
                setInscription(true)
            }

        }else
        {return;}

    }

    async function hundelClickDelete(id) {

        setAlertData(
            {
                "title":"Est vous sur de vouloir supprimer cet evenement ! ",
                "message":"La suppression de cet événement entraînera l'annulation de toutes les participations et notifiera tous les inscrits.\n" +
                    "Veuillez noter que cette action est définitive et ne pourra pas être annulée.\n" +
                    "Souhaitez-vous confirmer la suppression de l'événement ?",
                "buttonMessage":"Supprimer",
                "buttonColor":"error"
            }
        )

        const userResponse = await openAlert();
        if (userResponse){
            try {
                const response = await EventService.deleteEvent(props.event.id);
                window.location.reload();
            }catch (e) {
                props.ParentsetAlert({message: e.response.data.error,
                    severity: "error"});
            }
            }

    }

    function openShowEventDialog() {
        setOpenEvent(true);
    }

    async function hundelClickUnsubscribe(event_id) {
        try {
            const response = await
                axios.delete(`http://localhost:5000/event/unparticipate/${event_id}`,
                    {headers:headers}
                    );
            console.log(props.event.members)
            const index = props.event.members.findIndex(element=>element.id == authService.currentUser.id)
            props.event.members.splice(index,1);
            setInscription(!inscription)
        } catch (e){
            console.error(e);
        }

    }

    return (
<div>

    <Card sx={{ minWidth: 275, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

        <CardContent sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            { (props.event.members.some(element => element.id == formData["user_id"])) ?
            <Badge badgeContent={"déja inscrit"}  className=" text-blue-400 absolute top-0 right-6 mb-1">
            </Badge>
                :null}
            <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                {props.event.category}
            </Typography>
            <Typography variant="h5" component="div">
                {props.event.event_name}
            </Typography>
            <Typography sx={{color: 'text.secondary', mb: 1.5}}>
                {props.event.event_date}
            </Typography>
            <Typography variant="body2">
                {props.event.event_description}
                <br/>
                Entre: {props.event.event_age_min} ans - {props.event.event_age_max} ans
            </Typography>
            <Typography variant="body1" fontWeight="bold" sx={{mt: 'auto'}}>
                {props.event.username}
            </Typography>
            <Button
                variant="body2"
                fontWeight="bold"
                color="primary"
                startIcon={<LocationOnIcon/>}
            >
                {props.event.event_ville}
            </Button>

            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                    className="bg-blue-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    title={`Nombre de participants : ${props.event.members.length} sur ${props.event.event_max_utilisateur}`}
                    style={{width: `${(props.event.members.length / Number(props.event.event_max_utilisateur)) * 100}%`}}>
                    {props.event.members.length}/{props.event.event_max_utilisateur}
                </div>
            </div>


        </CardContent>
        <CardActions
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
            }}
        >

            <Button size="small"
                    onClick={openShowEventDialog}
            >Voir les détails</Button>

            {
                (!props.event.members.some(element => element.id == formData["user_id"]))
                &&
                (props.event.id_gestionnaire != formData["user_id"])
                &&
                props.event.members.length < props.event.event_max_utilisateur

                    ? <Button size="small" variant="contained"
                              onClick={() => {
                                  hundelClickParticipate(props.event.id)
                              }}
                    >
                        Participer
                    </Button> : null}

            {(props.event.id_gestionnaire == formData["user_id"]) ?
                <Button size="small" variant="contained"
                        startIcon={<DeleteIcon/>}
                        color="error"
                        onClick={() => {
                            hundelClickDelete(props.event.id)
                        }}

                >Supprimer</Button> :
                null
            }

            {(props.event.members.some(element => element.id == formData["user_id"]))  ?
                <Button size="small" variant="outlined"
                        startIcon={<DeleteIcon/>}
                        color="error"
                        onClick={() => {
                            hundelClickUnsubscribe(props.event.id)
                        }}

                >Se retirer</Button> :
                null
            }


            <AlertDialog open={open}
                         onClose={handleClose}
                         resolveRef={resolveRef}
                         alertData={alertData}
            />

            <ShowEventComponent
             open={openEvent}
             onClose={handleCloseEvent}
             event={props.event}
            />
        </CardActions>
    </Card>


</div>

    );
}
