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

    async insertEvenet(eventData, file) {
        debugger;
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(eventData));  // on stringify les données JSON

            const response = await axios.post("http://localhost:5000/event/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;

        } catch (e) {
            throw e;
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

    async getEventSortedByDate() {
        try{
            const response= await axios.get( "http://localhost:5000/event/sortedEvents")
            return response.data;
        }catch (e) {
            throw (e);
        }
    }


}

export default new EventService();
