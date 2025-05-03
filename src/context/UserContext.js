import { createContext, useContext, useState, useEffect } from 'react';
import TokenService from '../services/TokenService';
import userService from "../services/UserService";
import UserEntity from "../entities/UserEntity";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getCurrentUserInfo();
                const user = new UserEntity(response);

                setCurrentUser(user);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
