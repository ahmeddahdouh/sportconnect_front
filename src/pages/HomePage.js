import ButtonAppBar from "../components/navBarComponent";
import {Pagination, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/CardComponent";
import {useEffect, useState} from "react";
import apiService from "../services/AuthService";
import axios from "axios";
import * as React from "react";
import SearchComponent from "../components/SearchComponent";
import FiltersComponent from "../components/FiltersComponent";

export default function HomePage({BackendApilink}) {
    const [decoded, setDecoded] = useState(null);
    const [events, setEvents] = useState(
        []
    );
    const [originalEvents, setOriginalEvents] = useState([]);
    const token = localStorage.getItem("access_token");


    useEffect(() => {
        setDecoded(apiService.get_current_user());
        get_events();
    }, []);

    const cities = [...new Set(originalEvents.map(event => event.event_ville.toLowerCase()))];
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };


    async function get_events() {
        axios.get(BackendApilink ? BackendApilink:"http://localhost:5000/event/booking", { headers: headers })
            .then(response => {
                setEvents(response.data);
                setOriginalEvents(response.data);
            }).catch(error => {
            console.error(error);
        })
    }

    const filterEvents = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return (
                event.event_name.toLowerCase().includes(searchTerm) ||
                event.event_description.toLowerCase().includes(searchTerm) ||
                event.event_ville.toLowerCase().includes(searchTerm) ||
                event.event_Items.toLowerCase().includes(searchTerm)
            );
        });
        setEvents(filtered);
    };

    const onBlurAgeFilter = (event)=>{
        const age = event.target.value;
        if (age === "")
        {
            setEvents(originalEvents);
            return;
        }
        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return (
                Number(event.event_age_max) >= Number(age) &&
                Number(event.event_age_min) <= Number(age)
            );
        });
        setEvents(filtered);
    };

    const onBlurVilleFilter = (event)=>{
        const ville = event.target.value;
        if (ville === "Aucune ville")
        {
            setEvents(originalEvents);
            return;
        }
        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return (
                event.event_ville.toLowerCase().includes(ville)
            );
        });
        setEvents(filtered);
    };

    const OnBlureDateFilter = (date) => {
        if(!date){
            setEvents(originalEvents);
            return;
        }
        // Créer une date sans l'heure à partir de la date reçue en paramètre
        const dateSansHeure = new Date(date?.getFullYear(), date?.getMonth(), date?.getDate());

        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            // Vérifier si event.event_date est déjà un objet Date, sinon le convertir
            const eventDate = new Date(event.event_date);

            // Créer une date sans l'heure à partir de la date de l'événement
            const eventDateSansHeure = new Date(eventDate?.getFullYear(), eventDate?.getMonth(), eventDate.getDate());

            // Comparer les deux dates sans tenir compte de l'heure
            return eventDateSansHeure.getTime() === dateSansHeure.getTime();
        });

        setEvents(filtered);
    };

    return (
        <div>
            {decoded && <ButtonAppBar/>}
            <Stack direction="column"
                   justifyContent="center"
                   alignItems="center" paddingTop="20px">
                <SearchComponent filterEvents={filterEvents}/>
                <FiltersComponent
                    citie={cities}
                    OnBlureDateFilter = {OnBlureDateFilter}
                    onBlurAgeFilter = {onBlurAgeFilter}
                    onBlurVilleFilter={onBlurVilleFilter}
                >
                </FiltersComponent>

            </Stack>
                { events.length > 0 ?
                <Grid container spacing={4} justifyContent="center" paddingX="100px" paddingY="20px">
                    {events.map((event, index) => (
                        <Grid item xs={12} sm={10} md={5} lg={4} key={index}>
                            <BasicCard event={event}/>
                        </Grid>
                    ))}
                </Grid>:
                    <Typography variant="h6" color="textSecondary" textAlign="center"
                    marginTop={"10%"}
                    >
                        Aucun événement disponible pour le moment selon les critères définis. Veuillez ajuster vos filtres ou réessayer plus tard.
                    </Typography>


                }

            <Pagination style={{width:"fit-content",paddingBlock:"20px",margin:"auto"}} count={10} variant="outlined" shape="rounded" />
        </div>
    )
}