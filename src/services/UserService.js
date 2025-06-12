import apiClient from './ApiClient';
import TokenService from './TokenService';
const  AUTH_API_URL = process.env.REACT_APP_AUTH_BASE_URL;
const UserService = {
    async getCurrentUserInfo(id_gestionnaire) {

        const user = TokenService.getUserFromToken();
        if (!user?.id) return null;


        const res = await apiClient.get(id_gestionnaire?`${AUTH_API_URL}/users/${id_gestionnaire}`:`${AUTH_API_URL}/users/${user.id}`);
        return res.data;
    },

    async updateUser(data) {
        const user = TokenService.getUserFromToken();
        return apiClient.put(`${AUTH_API_URL}/users/${user.id}`, data);
    },

    async updateImage(formData,headers) {
        const res = await apiClient.put(`${AUTH_API_URL}/users/profile`, formData, { headers });
        return res.data;
    },
};

export default UserService;
