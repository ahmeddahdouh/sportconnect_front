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
import {UserProvider} from "./context/UserContext";
import LocationSearch from "./pages/LocationSearch";
import AdminDashboard from "./pages/AdminPage";
import EventListAdmin from './pages/EventListAdmin';
import UserListAdmin from './pages/UserListAdmin';  
import AdminLogin from './pages/LoginAdmin';
import AdminList from './pages/AdminListAdmin';
import AddAdmin from './pages/AddAdmin';


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
                <Route path="/MapInput" element={<LocationSearch/>} />
                <Route path="/personalInfo" element={<PersonalInformationRegister/>} />
                <Route path="/SportsSelection" element={<SportsSelection/>} />

             
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/listUserAdmin" element={<UserListAdmin/>} />
                <Route path="/listEventAdmin" element={<EventListAdmin/>} />
                <Route path="/listAdminAdmin" element={<AdminList/>} />
                <Route path="/AdminLogin" element={<AdminLogin/>} />
                <Route path="/addAdmin" element={<AddAdmin/>} />



            </Routes>
        </div>
        </ThemeProvider>
        </UserProvider>
    );
}

export default App;
