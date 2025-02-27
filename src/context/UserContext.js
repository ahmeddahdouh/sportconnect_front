import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/AuthService";

const UserContext = createContext({});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ ...apiService.user });

    const updateUser = (formData) => {
        setUser({ ...formData });
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
