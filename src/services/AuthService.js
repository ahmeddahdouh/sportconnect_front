import {useState} from "react";
import {jwtDecode} from "jwt-decode";

class ApiService {
    static instance = null; // Stocke l'instance unique

    constructor() {
        if (!ApiService.instance) {
            ApiService.instance = this;
        }
        return ApiService.instance;
    }

    get_current_user() {
        const token = localStorage.getItem("access_token");
        if (token) {
            console.log(token);
            return jwtDecode(token);
        }

    }
}
const apiService = new ApiService();
export default apiService;
