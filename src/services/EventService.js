import axios from 'axios';
import ChannelService from './ChannelService';

const BaseService = process.env.REACT_APP_EVENT_BASE_URL;

class EventService {
    async deleteEvent(id) {
        const response = await axios.delete(`${BaseService}/${id}`);
        return response.data;
    }

    async participate(formData) {
        try {
            const response = await axios.post(`${BaseService}/participate`, formData);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async unsubscribe(event_id, headers) {
        try {
            const response = await axios.delete(`${BaseService}/unparticipate/${event_id}`, { headers });
            // Tenter de supprimer l'utilisateur du canal
            const userId = JSON.parse(atob(headers.Authorization.split('.')[1])).id; // Extraire l'userId du token JWT
            try {
                await ChannelService.removeMember({ eventId: event_id, userId });
            } catch (error) {
                console.warn('Impossible de supprimer l\'utilisateur du canal:', error.response?.data?.error || error.message);
            }
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async insertEvenet(eventData, file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(eventData));

            const response = await axios.post(`${BaseService}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Créer un canal pour l'événement
            await ChannelService.createChannel({
                name: `Canal ${eventData.event_name}`,
                eventId: response.data.event_id, // Utiliser event_id
                adminId: eventData.id_gestionnaire
            });

            return response;
        } catch (e) {
            throw e;
        }
    }

    async getEvents(BackendApilink, headers) {
        try {
            const response = await axios.get(BackendApilink ? BackendApilink : `${BaseService}/booking`, { headers });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async getEventById(headers, id) {
        try {
            const response = await axios.get(`${BaseService}/${id}`, { headers });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async getEventSortedByDate(location) {
        try {
            const response = await axios.get(`${BaseService}/sortedEvents`, {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default new EventService();