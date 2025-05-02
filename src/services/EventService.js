import axios from 'axios';
import authService from "./AuthService";

const BaseService = process.env.REACT_APP_EVENT_BASE_URL;

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
            const response = await axios.delete(`${BaseService}/unparticipate/${event_id}`, {headers: headers});
            return response.data;
        } catch (e) {
            throw (e)
        }
    }

    async insertEvenet(eventData, file) {
        ;
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(eventData));  // on stringify les données JSON

            const response = await axios.post(`${BaseService}`, formData, {
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
           const response= await axios.get(BackendApilink ? BackendApilink : `${BaseService}/booking`, {headers: headers})
            return response.data;
        }catch (e) {
            throw (e);
        }
    }

    async getEventSortedByDate() {
        try{
            const response= await axios.get( `${BaseService}/sortedEvents`)
            return response.data;
        }catch (e) {
            throw (e);
        }
    }


}

export default new EventService();
