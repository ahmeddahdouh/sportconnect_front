import {Outlet,Navigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import apiService from "../services/AuthService";



const ProtectedRoutes = () => {
    const [decoded, setDecoded] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDecoded(apiService.get_current_user())
        setLoading(false)

    }, []);

    if (loading) return <CircularProgress className="flex items-center justify-center h-screen bg-gray-100"/>

    return decoded?.username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

