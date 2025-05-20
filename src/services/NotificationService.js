import apiClient from './ApiClient';
import TokenService from './TokenService';

const NOTIFICATION_API_URL = process.env.REACT_APP_BASE_URL + '/notification';

class NotificationService {
    async getNotifications(unreadOnly = false) {
        try {
            const token = TokenService.getAccessToken();
            const response = await apiClient.get(NOTIFICATION_API_URL, {
                params: { unread_only: unreadOnly },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    async markAsRead(notificationId) {
        try {
            const token = TokenService.getAccessToken();
            const response = await apiClient.put(`${NOTIFICATION_API_URL}/${notificationId}/read`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }
}

export default new NotificationService(); 