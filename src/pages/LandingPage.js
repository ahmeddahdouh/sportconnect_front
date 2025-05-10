import {LocationOn, Search, TrendingUp} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BasicCard from "../components/CardComponent";
import {Link} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import eventService from "../services/EventService";

const LandingPage = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [originalEvents, setOriginalEvents] = useState([]);

    // 1. Récupérer la localisation au montage
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('La géolocalisation n’est pas supportée par ce navigateur.');
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
    }, []); // vide = s'exécute une seule fois au montage

    // 2. Une fois la localisation dispo, charger les événements
    useEffect(() => {
        if (location) {
            getEventsSorted(location);
        }
    }, [location]);

    async function getEventsSorted(location) {
        try {
            const response = await eventService.getEventSortedByDate(location);
            setOriginalEvents(response);
        } catch (e) {
            console.error("Erreur lors de la récupération des événements :", e);
        }
    }

    return (
        <div>
            <main className="flex-1">
                {/* ... reste du JSX inchangé ... */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Événements Autour de Vous
                                </h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Explorez les rencontres sportives près de chez vous et réservez votre place en un clin d'œil !
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
                            {originalEvents.map((event, idx) => (
                                <BasicCard key={idx} event={event}/>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <a href="/booking"
                               className="bg-blue-600 text-md font-bold text-white px-8 py-2 rounded hover:bg-blue-700 transition">
                                Voir tous les événements
                            </a>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
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
                    </div>
                </section>

            </main>


        </div>
    )
}

export default LandingPage;
