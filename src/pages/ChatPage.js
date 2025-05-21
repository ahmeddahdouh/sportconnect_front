import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChannelService from '../services/ChannelService';
import {
  Box, TextField, Button, Typography, Paper, Divider,
  Avatar, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';

const ChatPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const messagesEndRef = useRef(null);

  // 🔐 Remplacer ceci par l'utilisateur connecté (ex: via contexte)
  const currentUsername = 'JohnDoe';

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
  }, [eventId]);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
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
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Retour">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" fontWeight="bold">💬 Canal - Événement #{eventId}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Message zone */}
      <Paper
        elevation={3}
        sx={{
          height: 440,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#f1f1f1',
          borderRadius: 3,
          border: '1px solid #ddd',
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
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => {
              const isOwnMessage = msg.username === currentUsername;
              return (
                <motion.div
                  key={msg.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={isOwnMessage ? 'flex-end' : 'flex-start'}
                    mb={2}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: isOwnMessage ? 'row-reverse' : 'row',
                        alignItems: 'flex-start',
                        gap: 1,
                        maxWidth: '80%',
                      }}
                    >
                      <Avatar>{(msg.username || '?')[0].toUpperCase()}</Avatar>
                      <Box
                        sx={{
                          backgroundColor: isOwnMessage ? '#1976d2' : '#ffffff',
                          color: isOwnMessage ? '#fff' : '#000',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          boxShadow: 1,
                          minWidth: 'fit-content',
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ color: isOwnMessage ? '#bbdefb' : '#1976d2' }}
                          >
                            {msg.username || 'Utilisateur'}
                          </Typography>
                          <Typography variant="caption" ml={1} color="text.secondary">
                            {formatTime(msg.created_at)}
                          </Typography>
                        </Box>
                        <Typography variant="body2">{msg.content}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Input */}
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
