import logo from './logo.svg';
import './App.css';
import {ThemeProvider} from "@mui/material/styles";
import first_theme from "./themes/first_theme";
import {useState} from "react";
import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppBar from "@mui/material/AppBar";
import AddEventPage from "./pages/AddEventPage";
import Login from "./pages/login";
import Register from "./pages/register";
import SportsSelection from "./pages/sports_selection";
import LocationRequest from "./pages/LocationRequest";
import ProtectedRoutes from "./utils/ProtectedRoutes"; // Import du composant Grid de Material-UI
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

function App() {
    const [events, setEvents] = useState(
        [
            {
                name: "Match de Football - Équipe A vs Équipe B",
                category: "Football",
                date: "20 Janvier 2025",
                description: "Un match excitant entre l'équipe A et l'équipe B, deux équipes locales qui s'affrontent pour la première place.",
            },
            {
                name: "Marathon International",
                category: "Course",
                date: "15 Février 2025",
                description: "Un marathon de 42 km ouvert aux coureurs de tous niveaux, traversant la ville avec un parcours pittoresque.",
            },
            {
                name: "Tournoi de Tennis - Finales",
                category: "Tennis",
                date: "10 Mars 2025",
                description: "Les meilleures joueuses et joueurs s'affrontent pour décrocher le titre du tournoi national de tennis.",
            },
            {
                name: "Championnat de Basketball",
                category: "Basketball",
                date: "5 Avril 2025",
                description: "Les équipes de basketball les plus compétitives du pays se rencontrent pour déterminer le champion national.",
            },
            {
                name: "Compétition de Cyclisme - Course de Cote",
                category: "Cyclisme",
                date: "18 Mai 2025",
                description: "Une compétition intense où les cyclistes s'affrontent dans une montée difficile pour atteindre le sommet.",
            },
            {
                name: "Compétition de Natation - Championnat National",
                category: "Natation",
                date: "25 Juin 2025",
                description: "Les meilleurs nageurs du pays se retrouvent pour la compétition nationale de natation avec des épreuves de style libre et de brasse.",
            },
            {
                name: "Tournoi de Rugby - Sélections Régionales",
                category: "Rugby",
                date: "30 Juillet 2025",
                description: "Les meilleures équipes de rugby régionales s'affrontent pour se qualifier pour le tournoi national.",
            },
            {
                name: "Événement de Yoga en Plein Air",
                category: "Yoga",
                date: "12 Août 2025",
                description: "Un événement de relaxation et de méditation en plein air, accessible à tous les niveaux de pratique.",
            },
            {
                name: "Festival de Sports Extrêmes",
                category: "Sports Extrêmes",
                date: "5 Septembre 2025",
                description: "Un festival où les amateurs de sports extrêmes peuvent participer à des compétitions de skate, BMX, et autres sports audacieux.",
            },
            {
                name: "Course de Dragsters - Grand Prix",
                category: "Automobile",
                date: "20 Octobre 2025",
                description: "Les pilotes de dragsters les plus rapides se mesurent lors d'une course palpitante à travers une piste de dragsters professionnelle.",
            }
        ]
    );



    return (
        <ThemeProvider theme={first_theme}>
        <div className="App">

            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route element={<ProtectedRoutes/>}>
                <Route path="/SportsSelection" element={<SportsSelection/>} />
                <Route path="/LocationRequest" element={<LocationRequest/>} />
                <Route path="/booking" element={<HomePage events={events} />} />
                <Route path="/" element={<AddEventPage/>} />
                </Route>
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;
