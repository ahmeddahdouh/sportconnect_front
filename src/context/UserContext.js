import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/AuthService";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
   debugger;

    const [user, setUser] = useState({ ...apiService.user });

    const updateUser = (formData) => {
        setUser({ ...formData });
    };

    useEffect(() => {
        debugger;
        console.log("User updated:", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
