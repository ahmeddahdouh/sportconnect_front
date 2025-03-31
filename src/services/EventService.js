import axios from 'axios';

const BaseService = 'http://localhost:5000/event';

class EventService {
    async deleteEvent(id) {
        const response = await axios.delete(BaseService + `/${id}`);
        return response.data;
    }
}

export default new EventService();
