import axios from 'axios';
import SportEntity from "../entities/SportEntity";


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

class SportService {
    async getAllSports() {
        try {
            const response = await axios.get(`${API_BASE_URL}/sport`);
            const sports =  response.data.map(sport => new SportEntity(sport));
            return sports;

        } catch (error) {
            console.error('Error fetching sports:', error);
            throw new Error('Failed to load sports data');
        }
    }

    async getSportById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/sport/${id}`);
            return new SportEntity(response.data);
        } catch (error) {
            console.error(`Error fetching sport ${id}:`, error);
            throw new Error(`Sport ${id} not found`);
        }
    }
}


export default new SportService();