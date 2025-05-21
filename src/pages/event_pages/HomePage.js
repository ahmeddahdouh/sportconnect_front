import ButtonAppBar from "../../components/utils_components/navBarComponent";
import { Alert, Button, Pagination, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import BasicCard from "../../components/event_components/CardComponent";
import { useEffect, useState } from "react";
import apiService from "../../services/AuthService";
import * as React from "react";
import SearchComponent from "../../components/utils_components/SearchComponent";
import FiltersComponent from "../../components/search_components/FiltersComponent";
import eventService from "../../services/EventService";
import EventEntity from "../../entities/EventEntity";
import CalendarView from "../../components/event_components/CalendarView";

export default function HomePage({ BackendApilink }) {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const [decoded, setDecoded] = useState(null);
    const [alert, setAlert] = useState({ message: "", severity: "" });
    const [events, setEvents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [originalEvents, setOriginalEvents] = useState([]);
    const token = localStorage.getItem("access_token");
    const [viewMode, setViewMode] = useState("kanban");
    const [location, setLocation] = useState(null);
    const startIndex = (page - 1) * rowsPerPage;
    const SelectedEvents = events.slice(startIndex, startIndex + rowsPerPage);
    const cities = [...new Set(originalEvents.map(event => event.event_ville.toLowerCase().split(",")[0]))];
    const [error, setError] = useState(null);

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const multiplesOfFour = (number) => Array.from({ length: Math.floor(number / 4) }, (_, i) => (i + 1) * 4);

    const ParentsetAlert = (AlertMessage) => {
        setAlert(AlertMessage);
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('La géolocalisation n’est pas supportée par ce navigateur.');
            return;
        }
        debugger;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                debugger;
                const {latitude, longitude} = position.coords;
                setLocation({latitude, longitude});
                setError(null);

            },
            (err) => {
                debugger;
                setError('Erreur lors de la récupération de la position : ' + err.message);
            }
        );
        setDecoded(apiService.getCurrentUser());
    }, []);

    useEffect(() => {
        if (!token) {
            debugger
            get_all_events()
        }else{
            get_events();
        }
    },[location])


    async function get_events() {
        try {
            const response = await eventService.getEvents(BackendApilink, headers);
            setEvents(response.map(event => new EventEntity(event)));
            setOriginalEvents(response);
        } catch (e) {
            console.error(e);
        }
    }


    async function get_all_events() {
        try {
            debugger;
            const response = await eventService.getEventSortedByDate(location,true);
            setEvents(response.map(event => new EventEntity(event)));
            setOriginalEvents(response);
        } catch (e) {
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



    const onBlurSportFilter = (event) => {
        debugger;
        const sport = event.target.value;
        if (sport === "Aucun sport") {
            setEvents(originalEvents);
            return;
        }
        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return (
                event.id_sport.toLowerCase().includes(sport)
            );
        });
        setEvents(filtered);
    };





    const handleReset = () => {
        setEvents(originalEvents);
    };

    const OnBlureDateFilter = (date) => {
        if (!date) {
            setEvents(originalEvents);
            return;
        }

        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return event.event_date.startsWith(date);
        });

        setEvents(filtered);
    };

    function HandleChangeElementPerPage(e) {
        setRowsPerPage(e.target.value);
        setPage(1);
    }

    return (
        <div className="py-10 px-5 bg-gradient-to-l from-blue-50 to-white">
            <div className="flex justify-center items-center gap-4 py-4">
                <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 rounded font-semibold ${viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    Vue Calendrier
                </button>
                <button
                    onClick={() => setViewMode("kanban")}
                    className={`px-4 py-2 rounded font-semibold ${viewMode === "kanban" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    Vue Kanban
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-3 items-start md:items-center justify-between">
                <SearchComponent filterEvents={filterEvents} />
                <a href="/public" className="w-full bg-blue-600 rounded-md font-bold text-white py-2 md:w-1/2 text-center">
                    Créer un événement
                </a>
            </div>

            <button
                onClick={() => setShowFilters(prev => !prev)}
                className="text-gray-600 ml-3 mt-3 hover:text-gray-800 transition-colors font-medium flex items-center gap-1"
                aria-pressed={showFilters}
            >
                <span>Filtrer</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {showFilters && (
                <FiltersComponent
                    citie={cities}
                    handleReset={handleReset}
                    OnBlureDateFilter={OnBlureDateFilter}
                    onBlurAgeFilter={onBlurAgeFilter}
                    onBlurVilleFilter={onBlurVilleFilter}
                    onBlurSportFilter={onBlurSportFilter}
                />
            )}


            {viewMode === "calendar" ? (
                <CalendarView
                    eventService={eventService}
                    apiService={apiService}
                    SelectedEvents = {SelectedEvents}
                    BackendApilink={BackendApilink}
                    headers={headers}
                />
            ) : (
                <div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl font-bold">Événements</h1>
                        <p className="text-muted-foreground">
                            Découvrez et rejoignez des événements sportifs près de chez vous
                        </p>
                    </div>

                    {alert.message && (
                        <Alert severity={alert.severity} id="error-message" className="my-4 w-1/2 mx-auto">
                            {alert.message}
                        </Alert>
                    )}

                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 justify-center">
                            {SelectedEvents.map((event, index) => (


                                <BasicCard
                                    key={index}
                                    decoded={decoded}
                                    headers={headers}
                                    eventService={eventService}
                                    apiService={apiService}
                                    event={event}
                                    eventIds ={SelectedEvents.map(event => Number(event.id))}
                                    myevents={!!BackendApilink}
                                    ParentsetAlert={ParentsetAlert}
                                />

                            ))}
                        </div>
                    ) : (
                        <Typography
                            variant="h6"
                            color="textSecondary"
                            textAlign="center"
                            marginTop={"10%"}
                        >
                            Aucun événement disponible pour le moment selon les critères définis. Veuillez ajuster vos filtres ou réessayer plus tard.
                        </Typography>
                    )}
                    {events.length > 0 &&
                    <div className="flex flex-row items-center justify-center gap-x-4 text-center">
                        <Pagination
                            style={{ width: "fit-content", paddingBlock: "20px" }}
                            count={Math.ceil(events.length / rowsPerPage)}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />

                        <select
                            name="select"
                            id="select"
                            className="h-10 px-3 border rounded"
                            onChange={HandleChangeElementPerPage}
                        >
                            {multiplesOfFour(events.length + 4).map((number, index) => (
                                <option key={index} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </div>}
                </div>
            )}
        </div>
    );
}