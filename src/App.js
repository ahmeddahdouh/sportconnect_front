import './App.css';
import {ThemeProvider} from "@mui/material/styles";
import first_theme from "./themes/first_theme";
import {Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddEventPage from "./pages/AddEventPage";
import Login from "./pages/login";
import Register from "./pages/register";
import SportsSelection from "./pages/sports_selection";
import LocationRequest from "./pages/LocationRequest";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PersonalInformationRegister from "./pages/PersonalInformationsRegister";
import MyEventPage from "./pages/MyEventPage";
import UserProfilePage from "./pages/UserProfilePage";
import {userContext} from "./services/AuthService";
import {UserProvider} from "./context/UserContext";
const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

function App() {

    return (
        <UserProvider>
        <ThemeProvider theme={first_theme}>
        <div className="App mt-16" >
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route element={<ProtectedRoutes/>}>

                <Route path="/LocationRequest" element={<LocationRequest/>} />
                <Route path="/booking" element={<HomePage/>} />
                <Route path="/myEvents" element={<MyEventPage/>} />
                <Route path="/myProfile" element={<UserProfilePage/>} />
                <Route path="/" element={<AddEventPage/>} />

                </Route>
                <Route path="/register" element={<Register/>} />
                <Route path="/personalInfo" element={<PersonalInformationRegister/>} />
                <Route path="/SportsSelection" element={<SportsSelection/>} />
            </Routes>
        </div>
        </ThemeProvider>
        </UserProvider>
    );
}

export default App;
