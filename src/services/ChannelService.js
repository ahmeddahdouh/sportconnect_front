import axios from 'axios';

const BASE_URL = 'http://localhost:5000/chat';
const token = localStorage.getItem('access_token');
   const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };


class ChannelService {
  async sendMessage({ eventId, message }) {
  try {
    const response = await axios.post(
      `${BASE_URL}/message`,
      { event_id: Number(eventId), message: message },
      { headers } 
    );
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error.response?.data || error.message);
    throw error;
  }
}


  async getMessagesByEventId(eventId) {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${BASE_URL}/message/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des messages :', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new ChannelService();
