import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChannelService from '../services/ChannelService';
import {
  Box, TextField, Button, Typography, Paper, Divider,
  Avatar, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await ChannelService.getMessagesByEventId(eventId);
      setMessages(response);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des messages :", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      await ChannelService.sendMessage({ eventId, message });
      setMessage('');
      fetchMessages(); 
    } catch (err) {
      console.error("Erreur envoi :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    setFetching(false);
  }, [eventId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); 

    return () => clearInterval(interval); 
  }, [eventId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, px: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Retour">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h5">💬 Canal - Événement #{eventId}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Paper
        elevation={2}
        sx={{
          height: 420,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        {fetching ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center">
            Aucun message pour l’instant.
          </Typography>
        ) : (
          messages.map((msg, idx) => (
            <Box key={idx} mb={2} display="flex" gap={2}>
              <Avatar>{(msg.username || '?')[0].toUpperCase()}</Avatar>
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {msg.username || 'Utilisateur'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(msg.created_at)}
                  </Typography>
                </Box>
                <Typography variant="body2">{msg.content}</Typography>
              </Box>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <Box mt={2} display="flex" gap={1}>
        <TextField
          fullWidth
          placeholder="Écrivez un message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading}
          variant="outlined"
          size="small"
        />
        <Button
          onClick={handleSend}
          variant="contained"
          disabled={loading || !message.trim()}
          startIcon={<SendIcon />}
        >
          Envoyer
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
