import axios from 'axios';
import authService from "./AuthService";

const BaseService = 'http://localhost:5000/event';

class EventService {
    async deleteEvent(id) {
        const response = await axios.delete(BaseService + `/${id}`);
        return response.data;
    }

    async participate(formData) {
        try {
            const response = await axios.post(BaseService + `/participate`, formData);
            return response.data;
        } catch (e) {
            throw (e);
        }
    }

    async unsubscribe(event_id, headers) {
        try {
            const response = await axios.delete(`http://localhost:5000/event/unparticipate/${event_id}`, {headers: headers});
            return response.data;
        } catch (e) {
            throw (e)
        }
    }

    async insertEvenet(formData) {
        try {
            const response =  await axios.post("http://localhost:5000/event/", formData);
            return response.data;

        } catch (e) {
            throw (e)
        }

    }

   async getEvents(BackendApilink, headers) {
        try{
           const response= await axios.get(BackendApilink ? BackendApilink : "http://localhost:5000/event/booking", {headers: headers})
            return response.data;
        }catch (e) {
            throw (e);
        }
    }
}

export default new EventService();
