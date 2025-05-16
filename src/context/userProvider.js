import React, { createContext, useState, useEffect } from "react";
import apiService from "../services/AuthService";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = apiService.get_current_user();
        setUser(currentUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
