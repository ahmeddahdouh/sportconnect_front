import axios from 'axios';
import authService from "./AuthService";
import TokenService from "./TokenService";
import apiClient from "./ApiClient";

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
        try {
            const formData = new FormData();
            formData?.append("file", file);
            formData?.append("data", JSON.stringify(eventData));  // on stringify les données JSON

            const response = await axios.post(`${BaseService}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response;

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


    async getEventById(headers,id) {
        try{
            const response= await axios.get(`${BaseService}/${id}`, {headers: headers})
            return response.data;
        }catch (e) {
            throw (e);
        }
    }

    async updateEvent(eventId, eventData, token,file) {
        try {
            const formData = new FormData();
            if (file) {
                formData?.append("file", file);
            }
            formData?.append("data", JSON.stringify(eventData));

            const response = await axios.put(`${BaseService}/${eventId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response;

        } catch (e) {
            throw e;
        }
    }



    async getEventSortedByDate(location,all,user_id?) {
        try{
            const response = await axios.get(`${BaseService}/sortedEvents`, {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    all: all,
                    user_id: user_id,
                }
            });
            return response.data;
        }catch (e) {
            throw (e);
        }
    }


    async getAllEvents(BackendApilink) {

    }
}

export default new EventService();
