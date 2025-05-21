import {LocationOn, Search, TrendingUp} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BasicCard from "../../components/event_components/CardComponent";
import {Link} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import eventService from "../../services/EventService";
import {useUser} from "../../context/UserContext";

const LandingPage = () => {
    const { currentUser } = useUser() ;
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [originalEvents, setOriginalEvents] = useState([]);
    const [featuredEvent, setFeaturedEvent] = useState(null);

    // 1. Récupérer la localisation au montage
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("La géolocalisation n'est pas supportée par ce navigateur.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setLocation({latitude, longitude});
                setError(null);
            },
            (err) => {
                setError('Erreur lors de la récupération de la position : ' + err.message);
            }
        );
    }, []);

    // 2. Une fois la localisation dispo, charger les événements
    useEffect(() => {
        if (location) {
            getEventsSorted(location);
        }
    }, [location]);

    async function getEventsSorted(location) {
        try {
            const response = await eventService.getEventSortedByDate(location, false);
            setOriginalEvents(response);

            // Sélectionner l'événement à la une (le premier événement à venir)
            if (response && response.length > 0) {
                setFeaturedEvent(response[0]);
            }
        } catch (e) {
            console.error("Erreur lors de la récupération des événements :", e);
        }
    }

    return (
        <div>
            <main className="flex-1">
                {!currentUser?.id &&
                    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
                        <div className="container px-4 md:px-6">
                            <div className="grid gap-6 lg:grid-cols-2 items-center">
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                                            Rejoignez la communauté Sport Connect
                                        </h1>
                                        <p className="max-w-[600px] text-gray-600 md:text-xl">
                                            Découvrez, participez et organisez des événements sportifs près de chez vous. Sport Connect vous connecte avec des passionnés de sport qui partagent vos intérêts.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link to="/booking" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
                                            Découvrir les événements
                                        </Link>
                                        <Link to="/register" className="inline-flex h-10 items-center justify-center rounded-md border border-blue-600 px-8 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500">
                                            Créer un compte
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="rounded-xl bg-gray-100 p-4 shadow-lg">
                                        <img
                                            alt="Sport Connect Community"
                                            className="aspect-video rounded-md object-cover"
                                            height="310"
                                            src="sportConnect_com.png"
                                            width="550"
                                            style={{ maxWidth: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                {/* Section Événements Autour de Vous */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Événements Autour de Vous
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Explorez les rencontres sportives près de chez vous et réservez votre place en un
                                    clin d'œil !
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
                            {originalEvents.map((event, idx) => (
                                <BasicCard key={idx} event={event}
                                           eventIds={originalEvents.map(event => Number(event.id))}/>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <Link to="/booking"
                                  className="bg-blue-600 text-md font-bold text-white px-8 py-2 rounded hover:bg-blue-700 transition">
                                Voir tous les événements
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Section Pourquoi choisir Sport Connect */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Pourquoi Choisir Sport Connect ?
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Notre plateforme vous offre tout ce dont vous avez besoin pour vivre pleinement votre passion sportive
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
                            <div
                                className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                                <div className="p-2 bg-blue-200 rounded-full">
                                    <GroupIcon className="h-6 w-6 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-bold">Communauté Active</h3>
                                <p className="text-center text-muted-foreground">
                                    Rejoignez des milliers de sportifs passionnés et partagez votre amour du sport.
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                                <div className="p-2 bg-blue-200 rounded-full">
                                    <LocationOn className="h-6 w-6 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-bold">Événements Locaux</h3>
                                <p className="text-center text-muted-foreground">
                                    Trouvez des événements près de chez vous et rencontrez des sportifs de votre région.
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                                <div className="p-2  bg-blue-200 rounded-full">
                                    <CalendarMonthIcon className="h-6 w-6 text-blue-600  "/>
                                </div>
                                <h3 className="text-xl font-bold">Organisation Facile</h3>
                                <p className="text-center text-muted-foreground">
                                    Créez et gérez vos propres événements sportifs en quelques clics.
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background shadow-sm">
                                <div className="p-2 bg-blue-200 rounded-full">
                                    <TrendingUp className="h-6 w-6 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-bold">Progression</h3>
                                <p className="text-center text-muted-foreground">
                                    Suivez vos performances et votre progression à travers les différents événements.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-10">
                            <Link to="/booking"
                                  className="bg-blue-600 text-md font-bold text-white px-8 py-3 rounded-md hover:bg-blue-700 transition shadow-md">
                                Découvrir les événements disponibles
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default LandingPage;