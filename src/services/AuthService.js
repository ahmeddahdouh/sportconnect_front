import apiClient from './ApiClient';
import TokenService from './TokenService';

const  AUTH_API_URL = process.env.REACT_APP_AUTH_BASE_URL;

const AuthService = {
    async login(credentials) {
        const response = await apiClient.post(`${AUTH_API_URL}/login`, credentials);
        const { access_token } = response.data;

        if (access_token) {
            localStorage.setItem('access_token', access_token);
        }

        return response.data;
    },

    logout() {
        localStorage.removeItem('access_token');
    },

    isAuthenticated() {
        return !!TokenService.getAccessToken();
    },

    getCurrentUser() {
        return TokenService.getUserFromToken();
    }
};

export default AuthService;
