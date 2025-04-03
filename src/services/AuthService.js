import {jwtDecode} from "jwt-decode";
import UserEntity from "../entities/UserEntity";
import axios from "axios";
import {createContext} from "react";


class ApiService {
    currentUser = null;
    currentUserInfo = null;
    token = localStorage.getItem("access_token");
    static instance = null; // Stocke l'instance unique
    user = new UserEntity(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null
    )

    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    get_current_user() {
        if (this.token) {
            const decodedJwt = jwtDecode(this.token);
            this.currentUser = JSON.parse(decodedJwt.sub);
            return this.capitalizeFirstLetter(this.currentUser);
        }

    }

    set_user(newUser) {
        this.user = newUser;
    }

    capitalizeFirstLetter(currentUser) {
        const username = currentUser.username;
        currentUser.username = username.charAt(0).toUpperCase() + username.slice(1);
        this.addLinkImage(currentUser);
        return currentUser;
    }

    addLinkImage(currentUser) {
        const profileImage = currentUser.profileImage;
        currentUser.profileImage = `http://localhost:5000/auth/uploads/${profileImage}`;
    }


    async updateUser(updateUserInfo) {
        try {
            const response = await axios.put(
                `http://localhost:5000/auth/users/${this.currentUser?.id}`,
                updateUserInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',  // assure que le serveur attend des données JSON
                    }

                }
            );
            return (response)

        } catch (e) {
            throw e;
        }
    }

    async getUserById() {
        if (this.currentUser.id) {
            const response = await axios.get(`http://localhost:5000/auth/users/${this.currentUser.id}`);
            this.currentUserInfo = response.data;
            return response.data;
        }
    }

    async updateImage(formImageData, headers) {
        try {
            debugger;
            const response = await
                axios.put('http://localhost:5000/auth/users/profile', formImageData,
                    {headers: headers});
            this.currentUser.profileImage = `http://localhost:5000/auth/uploads/${response.data.image}`;
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}


const apiService = new ApiService();
export const userContext = createContext(apiService.get_current_user());
export default apiService;
