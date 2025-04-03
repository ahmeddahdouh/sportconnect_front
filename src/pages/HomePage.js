import ButtonAppBar from "../components/navBarComponent";
import {Alert,Pagination, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/CardComponent";
import {useEffect, useState} from "react";
import apiService from "../services/AuthService";
import * as React from "react";
import SearchComponent from "../components/SearchComponent";
import FiltersComponent from "../components/FiltersComponent";
import eventService from "../services/EventService";

export default function HomePage({BackendApilink}) {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [decoded, setDecoded] = useState(null);
    const [alert, setAlert] = useState({message: "", severity: ""});
    const [events, setEvents] = useState([]);
    const [originalEvents, setOriginalEvents] = useState([]);
    const token = localStorage.getItem("access_token");
    const startIndex = (page - 1) * rowsPerPage;
    const SelectedEvents = events.slice(startIndex, startIndex + rowsPerPage);
    const cities = [...new Set(originalEvents.map(event => event.event_ville.toLowerCase().split(",")[0]))];
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    let multiplesOfFive = (nombre) => Array.from({length: Math.floor(nombre / 5)}, (_, i) => (i + 1) * 5);

    const ParentsetAlert = (AlertMessage) => {
        setAlert(AlertMessage)
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        setDecoded(apiService.get_current_user());
        get_events();
    }, []);

    async function get_events() {
        try {
            const response = await eventService.getEvents(BackendApilink,headers);
            setEvents(response);
            setOriginalEvents(response);
        }catch(e) {
            console.error(e);
        }

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

    const onBlurAgeFilter = (event) => {
        const age = event.target.value;
        if (age === "") {
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

    const onBlurVilleFilter = (event) => {
        const ville = event.target.value;
        if (ville === "Aucune ville") {
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
        if (!date) {
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

    function HandleChangeElementPerPage(e) {
        setRowsPerPage(e.target.value);
        setPage(1);
    }

    return (
        <div>
            {decoded && <ButtonAppBar/>}
            <Stack direction="column"
                   justifyContent="center"
                   alignItems="center" paddingTop="20px">
                <SearchComponent filterEvents={filterEvents}/>
                <FiltersComponent
                    citie={cities}
                    OnBlureDateFilter={OnBlureDateFilter}
                    onBlurAgeFilter={onBlurAgeFilter}
                    onBlurVilleFilter={onBlurVilleFilter}
                >
                </FiltersComponent>

            </Stack>
            {alert.message && (
                <Alert severity={alert.severity} id="error-message" className="my-4 w-1/2 mx-auto">
                    {alert.message}
                </Alert>
            )}
            {events.length > 0 ?
                <Grid container spacing={4}  justifyContent="center" paddingX="100px" paddingY="20px">
                    {SelectedEvents.map((event, index) => (
                        <Grid item  sm={10} md={5} lg={4} key={index} >
                            <BasicCard event={event}
                                       myevents={!!BackendApilink}
                                       ParentsetAlert={ParentsetAlert}
                            />
                        </Grid>
                    ))}
                </Grid> :
                <Typography variant="h6" color="textSecondary" textAlign="center"
                            marginTop={"10%"}
                >
                    Aucun événement disponible pour le moment selon les critères définis. Veuillez ajuster vos filtres
                    ou réessayer plus tard.
                </Typography>


            }
            <div className="flex flex-row items-center justify-center gap-x-4 text-center">
                <Pagination style={{width: "fit-content", paddingBlock: "20px"}}
                            count={Math.ceil(events.length / rowsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                            variant="outlined" shape="rounded"/>

                <select name="select" id="select" className="h-10 px-3 border rounded"
                        onChange={HandleChangeElementPerPage}>
                    {multiplesOfFive(events.length + 4).map((number, index) => (
                        <option key={index} value={number}>{number}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}