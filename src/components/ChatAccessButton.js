// src/components/ChatAccessButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import { Button } from '@mui/material';

const ChatAccessButton = ({ eventId }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/chat/${eventId}`);
    };

    return (
        <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleNavigate}
            startIcon={<ForumIcon />}
        >
            Accéder au canal de discussion
        </Button>
    );
};

export default ChatAccessButton;
