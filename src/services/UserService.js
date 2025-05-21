import apiClient from './ApiClient';
import TokenService from './TokenService';
const AUTH_API_URL = process.env.REACT_APP_BASE_URL + '/auth';
const EVENT_INVITATION_API_URL = process.env.REACT_APP_BASE_URL + '/event-invitation';

const UserService = {
    async getCurrentUserInfo() {
        const user = TokenService.getUserFromToken();
        if (!user?.id) return null;

        const res = await apiClient.get(`${AUTH_API_URL}/users/${user.id}`);
        return res.data;
    },

    async updateUser(data) {
        const user = TokenService.getUserFromToken();
        return apiClient.put(`${AUTH_API_URL}/users/${user.id}`, data);
    },

    async updateImage(formData, headers) {
        const res = await apiClient.put(`${AUTH_API_URL}/users/profile`, formData, { headers });
        return res.data;
    },

    async searchUserByPhone(phone) {
        try {
            const token = TokenService.getAccessToken();
            const phoneString = String(phone).trim();
            const response = await apiClient.get(`${AUTH_API_URL}/users/phone`, {
                params: { phone: phoneString },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching user:', error);
            throw error;
        }
    },

    async inviteUserToEvent(eventId, userId) {
        try {
            const token = TokenService.getAccessToken();
            const response = await apiClient.post(
                `${EVENT_INVITATION_API_URL}/event/${eventId}/invite/${userId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error inviting user:', error);
            throw error;
        }
    }
};

export default UserService;
