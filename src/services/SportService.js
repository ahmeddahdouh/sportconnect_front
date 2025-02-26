import axios from 'axios';

const BaseService = 'http://localhost:5000';

class SportService {
    async getSport() {
        const response = await axios.get(BaseService + '/sport');
        return response.data;
    }
}

export default new SportService();
