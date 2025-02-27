import {useState} from "react";
import {jwtDecode} from "jwt-decode";
import UserEntity from "../entities/UserEntity";

class ApiService {
    static instance = null; // Stocke l'instance unique
    user = new UserEntity(
        "",
        "",
        "",
        "",
        "John",
        "Doe",
        "Paris",
        "0123456789",
        30
    )

    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    get_current_user() {
        const token = localStorage.getItem("access_token");
        if (token) {
            return jwtDecode(token);
        }

    }

    set_user(newUser) {
        this.user = newUser;
    }
}
const apiService = new ApiService();
export default apiService;
