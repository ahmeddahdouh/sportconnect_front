import {Search} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import ButtonAppBar from "../components/navBarComponent";


const LandingPage = () => {

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

                <section
                    className="w-full py-12 md:py-24 lg:py-32  dark:from-green-950/20 dark:to-background">
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

            </main>


        </div>
    )
}

export default LandingPage;
