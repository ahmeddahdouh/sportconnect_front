import './App.css';
import {ThemeProvider} from "@mui/material/styles";
import first_theme from "./themes/first_theme";
import {useEffect, useState} from "react";
import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddEventPage from "./pages/AddEventPage";
import Login from "./pages/login";
import Register from "./pages/register";
import SportsSelection from "./pages/sports_selection";
import LocationRequest from "./pages/LocationRequest";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import axios from "axios";
import PersonalInformationRegister from "./pages/PersonalInformationsRegister";
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

function App() {

    return (
        <ThemeProvider theme={first_theme}>
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route element={<ProtectedRoutes/>}>

                <Route path="/LocationRequest" element={<LocationRequest/>} />

                <Route path="/booking" element={<HomePage/>} />
                <Route path="/" element={<AddEventPage/>} />
                </Route>
                <Route path="/register" element={<Register/>} />
                <Route path="/personalInfo" element={<PersonalInformationRegister/>} />
                <Route path="/SportsSelection" element={<SportsSelection/>} />
            </Routes>
        </div>
        </ThemeProvider>
    );
}

export default App;
