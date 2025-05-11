// src/services/ChannelService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_CHAT_BASE_URL || 'http://localhost:5000/channel';

class ChannelService {
    /**
     * Crée un canal pour un événement.
     * @param {Object} channelData - { name, eventId, adminId }
     */
    async createChannel(channelData) {
        try {
            const response = await axios.post(`${BASE_URL}/create`, channelData);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création du canal :", error);
            throw error;
        }
    }

    /**
     * Ajoute un utilisateur au canal associé à un événement.
     * @param {number} eventId
     * @param {number} userId
     */
    async addMemberToChannel(eventId, userId) {
        try {
            const response = await axios.post(`${BASE_URL}/addMember`, {
                eventId,
                userId
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du membre au canal :", error);
            throw error;
        }
    }

    /**
     * Envoie un message dans le canal.
     * @param {Object} data - { eventId, message }
     */
    async sendMessage({ eventId, message }) {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.post(`${BASE_URL}/message`, {
                eventId,
                message
            }, { headers });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            throw error;
        }
    }

    /**
     * Récupère tous les messages du canal lié à un événement.
     * @param {number} eventId
     */
    async getMessagesByEventId(eventId) {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.get(`${BASE_URL}/messages/${eventId}`, {
                headers
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des messages :", error);
            throw error;
        }
    }
}

export default new ChannelService();
