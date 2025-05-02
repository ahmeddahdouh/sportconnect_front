// TokenService.js
import { jwtDecode } from 'jwt-decode';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TokenService = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },

    decodeToken() {
        const token = this.getAccessToken();
        return token ? jwtDecode(token) : null;
    },

    getUserFromToken() {
        const decoded = this.decodeToken();
        if (!decoded || !decoded.sub) return null;

        try {
            const user = JSON.parse(decoded.sub);
            if (user.profileImage) {
                user.profileImage = `${BASE_URL}/auth/uploads/${user.profileImage}`;
            }
            return user;
        } catch (e) {
            console.error('Erreur lors du parsing du token :', e);
            return null;
        }
    }

};

export default TokenService;
