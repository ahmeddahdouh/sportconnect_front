import './styles/App.css';
import { ThemeProvider } from "@mui/material/styles";
import first_theme from "./themes/first_theme";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddEventPage from "./pages/event_pages/AddEventPage";
import Login from "./pages/login";
import Register from "./pages/register";
import SportsSelection from "./pages/sports_selection";
import LocationRequest from "./utils/LocationRequest";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PersonalInformationRegister from "./pages/PersonalInformationsRegister";
import MyEventPage from "./pages/event_pages/MyEventPage";
import { UserProvider } from "./context/UserContext";
import LocationSearch from "./components/event_components/LocationSearch";
import LandingPage from "./pages/LandingPage";
import ButtonAppBar from "./components/utils_components/navBarComponent";
import Footer from "./components/utils_components/footer";
import DatailsEventPage from "./pages/event_pages/DatailsEventPage";
import CreatePage from "./pages/event_pages/createPage";
import RegisterWizard from "./components/login_components/RegisterWizard";
import UserProfilePage from "./pages/UserProfilePage";


function App() {
    const location = useLocation();

    // Liste des routes où la barre de navigation ne doit pas apparaître
    const hiddenNavRoutes = [
        "/login",
        "/register",
        "/MapInput",
        "/personalInfo",
        "/SportsSelection"
    ];

    const shouldShowNavBar = !hiddenNavRoutes.includes(location.pathname);

    return (
        <UserProvider>

            <ThemeProvider theme={first_theme}>
                <div className="w-full">
                    {shouldShowNavBar && <ButtonAppBar className="fixed w-full"  />}
                    <div className="mt-16 w-full"></div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/LocationRequest" element={<LocationRequest />} />
                            <Route path="/booking" element={<HomePage />} />
                            <Route path="/myEvents" element={<MyEventPage />} />
                            <Route path="/myProfile" element={<UserProfilePage />} />
                            <Route path="/" element={<CreatePage/>} />
                            <Route path="/create" element={<AddEventPage/>} />
                            <Route path="/landingPage" element={<LandingPage/>} />
                            <Route path="/details/:id" element={<DatailsEventPage/>} />
                        </Route>
                        <Route path="/register" element={<RegisterWizard/>} />
                        <Route path="/MapInput" element={<LocationSearch />} />
                        <Route path="/personalInfo" element={<PersonalInformationRegister />} />
                        <Route path="/SportsSelection" element={<SportsSelection />} />
                    </Routes>
                    {shouldShowNavBar && <Footer />}
                </div>
            </ThemeProvider>

        </UserProvider>
    );
}

export default App;
