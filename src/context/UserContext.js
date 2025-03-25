import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../services/AuthService";

const UserContextTest = createContext(null);

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(apiService.currentUser);

    const updateUser = (currentUser) => {
        setUser(currentUser);
    };

    return (
        <UserContextTest.Provider value={{ user, updateUser }}>
            {children}
        </UserContextTest.Provider>
    );
};

export {UserContextTest, UserProvider };
