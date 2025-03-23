import {jwtDecode} from "jwt-decode";
import UserEntity from "../entities/UserEntity";

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
        debugger;
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
        return currentUser;
    }

}
const apiService = new ApiService();
export default apiService;
