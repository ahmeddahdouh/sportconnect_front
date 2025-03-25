import {jwtDecode} from "jwt-decode";
import UserEntity from "../entities/UserEntity";
import axios from "axios";
import {createContext} from "react";




class ApiService {
    currentUser = null;
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
            this.currentUser =  JSON.parse(decodedJwt.sub);
            return this.capitalizeFirstLetter(this.currentUser);
        }

    }

    set_user(newUser) {
        this.user = newUser;
    }

    capitalizeFirstLetter(currentUser) {
        const username = currentUser.username;
        currentUser.username= username.charAt(0).toUpperCase() + username.slice(1);
        this.addLinkImage(currentUser);
        return currentUser;
    }

    addLinkImage(currentUser) {
        debugger;
        const profileImage = currentUser.profileImage;
        currentUser.profileImage = `http://localhost:5000/auth/uploads/${profileImage}`;
    }

    async getUserById() {
        if(this.currentUser.id){
            const response  = await axios.get(`http://localhost:5000/auth/users/${this.currentUser.id}`);
            return response.data;
        }
    }
}


const apiService = new ApiService();
export const userContext = createContext(apiService.get_current_user());
export default apiService;
