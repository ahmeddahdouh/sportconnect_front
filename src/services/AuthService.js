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

        if (this.token) {
           const decodedJwt = jwtDecode(this.token);
            this.currentUser = JSON.parse(decodedJwt.sub);

           return this.currentUser;
        }

    }

    set_user(newUser) {
        this.user = newUser;
    }
}
const apiService = new ApiService();
export default apiService;
