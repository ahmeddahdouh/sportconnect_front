import ButtonAppBar from "../components/navBarComponent";
import AddEventForm from "../components/AddEventForm";
import { useEffect, useState } from "react";
import apiService from "../services/AuthService";
import { Box } from '@mui/material';

export default function AddEventPage() {
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        setDecoded(apiService.get_current_user());
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
                animation: 'fadeIn 1s ease-in-out',
            }}
        >
            <ButtonAppBar username={decoded?.sub} />
            <AddEventForm />
        </Box>
    );
}