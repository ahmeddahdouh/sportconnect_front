import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { Map, Marker } from "pigeon-maps";
import axios from "axios";
import authService from "../services/AuthService";
import EventService from "../services/EventService";
import AlertDialog from "./DialogAlert";
import ShowEventComponent from "./ShowEventComponent";
import { useRef } from "react";

export default function EventCard(props) {
  const token = localStorage.getItem("access_token");
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const [formData] = React.useState({
    user_id: authService.currentUser.id,
    event_id: props?.event.id
  });
  const resolveRef = useRef(null);
  const [inscription, setInscription] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const BaseService = 'http://localhost:5000';
  const handleClose = () => setOpen(false);
  const handleCloseEvent = () => setOpenEvent(false);
  const openAlert = () => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setOpen(true);
    });
  };

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
      try {
        const response = await EventService.participate(formData);
        props.ParentsetAlert({message: response.message,
          severity: "success",});
        props.event.members.push({"id":authService.currentUser.id,"firstname":authService.currentUser.username})
        setInscription(!inscription)
        setTimeout(()=>{
          props.ParentsetAlert({message: "",
            severity: "",});
        },1000);

      }catch (e) {
        props.ParentsetAlert({message: e.message,
          severity: "error"});
        setTimeout(()=>{
          props.ParentsetAlert({message: "",
            severity: "",});
        },2000)

      }

    }

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

  async function hundelClickUnsubscribe(event_id) {
    try {
      const response = await EventService.unsubscribe(event_id,headers);
      const index = props.event.members.findIndex(element=>element.id == authService.currentUser.id)
      props.event.members.splice(index,1);
      setInscription(!inscription)
    } catch (e){
      if (e.message){
        props.ParentsetAlert({message: e.response.data.error,
          severity: "error"});
      } else{
        console.error(e);
      }
    }



  }

  const handleOnClick = async () => {
    setAlertData({
      "message": ""
    });
    await openAlert();
  };

  const isParticipating = props.event.members.some(element => element.id === formData.user_id);
  const isManager = Number(props.event.id_gestionnaire) === formData.user_id;
  const isFull = props.event.members.length >= props.event.event_max_utilisateur;

  return (
      <div className="relative">
        <Card className="w-full max-w-md mx-auto shadow-lg rounded-xl overflow-hidden bg-white">
          <div className="  p-2">
            <Typography className="text-white text-sm font-semibold">
            </Typography>
          </div>
          <CardContent className="p-4 flex flex-col h-auto">
            <Typography variant="h5" className="font-bold text-gray-800 line-clamp-1">
              {props.event.event_name}
            </Typography>
            <Typography className="text-gray-600 text-sm mt-1">
              {props.event.event_date}
            </Typography>
            <Typography className="text-gray-700 mt-2">
              Âge: {props.event.event_age_min} - {props.event.event_age_max} ans
            </Typography>
            <div className="mt-3 space-y-2">
              <Typography
                  className="font-semibold text-blue-600 cursor-pointer hover:underline"
                  onClick={handleOnClick}
              >
                {props.event.username}
              </Typography>
              <Button
                  startIcon={<LocationOnIcon />}
                  className="text-blue-500 hover:text-blue-700 normal-case w-full   overflow-auto "
                  onClick={async () => {
                    setAlertData({
                      "title": props.event.event_ville,
                      "message": (
                          <Map
                              height={300}
                              defaultCenter={[Number(props.event.longitude), Number(props.event.latitude)]}
                              defaultZoom={11}
                          >
                            <Marker
                                width={50}
                                anchor={[Number(props.event.longitude), Number(props.event.latitude)]}
                            />
                          </Map>
                      ),
                    });
                    await openAlert();
                  }}
              >
                {props.event.event_ville.length > 30 ? `${props.event.event_ville.slice(0, 20)}...` : props.event.event_ville}

              </Button>

            </div>
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <PeopleIcon className="text-gray-500" />
                <Typography className="text-sm text-gray-600">
                  {props.event.members.length}/{props.event.event_max_utilisateur}
                </Typography>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(props.event.members.length / props.event.event_max_utilisateur) * 100}%`
                    }}
                />
              </div>
            </div>
            {isParticipating && (
                <div className="absolute top-1 right-1">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Inscrit
              </span>
                </div>
            )}
          </CardContent>
          <CardActions className="p-4 pt-0 flex justify-center gap-2 border-t">
            <Button
                size="small"
                className="text-blue-600"
                onClick={() => setOpenEvent(true)}
            >
              Détails
            </Button>
            {!isParticipating && !isManager && !isFull && (
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
                    startIcon={<DeleteIcon />}
                    onClick={() => hundelClickDelete(props.event.id)}
                >
                  Supprimer
                </Button>
            )}
            {isParticipating && !isManager && (
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color='error'
                    onClick={() => hundelClickUnsubscribe(props.event.id)}
                >
                  Se retirer
                </Button>
            )}
          </CardActions>
          <AlertDialog
              open={open}
              onClose={handleClose}
              resolveRef={resolveRef}
              alertData={alertData}
          />
          <ShowEventComponent
              open={openEvent}
              onClose={handleCloseEvent}
              event={props.event}
          />
        </Card>
      </div>
  );
}