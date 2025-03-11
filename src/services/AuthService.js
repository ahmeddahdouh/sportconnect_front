import {useState} from "react";
import {jwtDecode} from "jwt-decode";
import UserEntity from "../entities/UserEntity";

class ApiService {
    currentUser = null;
    token = localStorage.getItem("access_token");
    debugger;
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
           decodedJwt.sub = JSON.parse(decodedJwt.sub);
           this.currentUser = decodedJwt;
           return decodedJwt;
        }

    }

    set_user(newUser) {
        this.user = newUser;
    }
}
const apiService = new ApiService();
export default apiService;
