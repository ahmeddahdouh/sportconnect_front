// UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import TokenService from '../services/TokenService';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = TokenService.getUserFromToken();
        setCurrentUser(user);
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
