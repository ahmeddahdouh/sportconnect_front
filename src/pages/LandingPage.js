import {LocationOn, Search, TrendingUp} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventCard from "../components/CardComponent";
import BasicCard from "../components/CardComponent";
import {Link} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import eventService from "../services/EventService";


const LandingPage = () => {

    const [originalEvents, setOriginalEvents] = useState([]);
    useEffect(() => {
        get_events_sorted()
    })

    async function get_events_sorted() {
        try {
            const response = await eventService.getEventSortedByDate();
            debugger;
            setOriginalEvents(response);
        }catch(e) {
            console.error(e);
        }

    }

    return(<div>
            <main className="flex-1">
                <section
                    className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-100 to-white dark:from-green-950/20 dark:to-background">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                    Trouvez et Créez des Événements Sportifs
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Rejoignez la communauté sportive, participez à des événements et organisez vos
                                    propres
                                    rencontres
                                    sportives.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-4 mt-8">
                                {/* Barre de recherche avec bouton */}
                                <div className="flex w-full max-w-xl gap-1">
                                    <div
                                        className="flex items-center border border-gray-300 rounded-l px-3 w-full bg-white">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                             strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"/>
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Rechercher des événements..."
                                            className="ml-2 w-full py-2 focus:outline-none "
                                        />

                                    </div>
                                    <button
                                        className="bg-blue-600 text-sm font-bold text-white px-4 py-2 rounded-r hover:bg-blue-700 transition">
                                        Rechercher
                                    </button>
                                </div>

                                {/* Boutons du dessous */}
                                <div className="flex gap-4">
                                    <a href="/"
                                       className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                        Créer un événement
                                    </a>
                                    <a href="/booking"
                                       className="border text-sm font-bold border-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-100 transition">
                                        Explorer les événements
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50  bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Événements à
                                    Venir</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Découvrez les prochains événements sportifs et réservez votre place dès maintenant.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 py-8">
                            {originalEvents.map((event) => (
                                <BasicCard
                                    event={event}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <a href="/booking" className="bg-blue-600 text-md font-bold text-white px-8 py-2 rounded hover:bg-blue-700 transition">
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
