import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { Button, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../context/UserContext";
import UserEntity from "../entities/UserEntity";
import userService from "../services/UserService";
import EventBarChart from "../components/EventsBarChart";
import ProfileTabs from "../components/ProfileTabs";
import ProfileInterests from "../components/ProfileInterests";

const UserProfilePage = () => {
    const base_url_auth = process.env.REACT_APP_AUTH_BASE_URL;
    const { user, updateUser } = useUser();
    const [userInfo, setUserInfo] = useState(null);
    const [updateUserInfo, setUpdateUserInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState("Profil");
    const [selectedImage, setSelectedImage] = useState("");

    const token = localStorage.getItem("access_token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setSelectedImage(URL.createObjectURL(file));
        const formImageData = new FormData();
        formImageData.append("file", file);

        try {
            await userService.updateImage(formImageData, headers);
            updateUser({
                ...userInfo,
                profileImage: userInfo?.getProfileImageUrl()
            });
        } catch (e) {
            console.error("Erreur lors de l'upload :", e);
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await userService.getCurrentUserInfo();
                setUserInfo(new UserEntity(response));
            } catch (e) {
                console.error(e);
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo?.profileImage) {
            setSelectedImage(`${base_url_auth}/uploads/${userInfo.profileImage}`);
        }
    }, [userInfo, base_url_auth]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));

        setUpdateUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateuser = async () => {
        setLoading(true);
        try {
            await userService.updateUser(updateUserInfo);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error("Erreur du serveur :", error.response.status, error.response.data);
            } else if (error.message) {
                console.error("Erreur inattendue :", error.message);
            } else if (error.request) {
                console.error("Pas de réponse du serveur :", error.request);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateuser();
    }

    if (!userInfo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="w-full p-4">
            <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === "Profil" && (
                <div className="md:flex md:flex-row gap-4">
                    <div className="md:w-1/3 border rounded-xl p-4 shadow">
                        <div className="relative w-[120px] h-[120px] m-auto">
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-upload"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="avatar-upload" className="cursor-pointer block w-full h-full">
                                <Avatar
                                    alt="avatar"
                                    src={selectedImage}
                                    sx={{ width: 120, height: 120 }}
                                    className="ring-4 ring-gray-200"
                                />
                                <EditIcon
                                    fontSize="small"
                                    className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow"
                                />
                            </label>
                        </div>
                        <h2 className="mt-2 font-bold text-lg text-center">{userInfo.firstname} {userInfo.familyname}</h2>
                        <p className="text-center text-gray-500">@{userInfo.username}</p>
                        <p className="text-center">📧 {userInfo.email}</p>
                        <p className="text-center">📞 {userInfo.phone}</p>
                        <p className="text-center">📍 {userInfo.city}</p>
                        <p className="text-center">👤 Membre depuis {new Date(userInfo.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                        <ProfileInterests interests={userInfo.interests} />
                    </div>

                    <div className="md:w-2/3 border rounded-xl p-6 shadow">
                        <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="firstname" placeholder="Nom" value={userInfo.firstname || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <input type="text" name="familyname" placeholder="Prénom" value={userInfo.familyname || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <input type="email" name="email" placeholder="Email" value={userInfo.email || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <input type="text" name="phone" placeholder="Téléphone" value={userInfo.phone || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <input type="text" name="city" placeholder="Ville" value={userInfo.city || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <textarea name="bio" placeholder="Biographie" value={userInfo.bio || ''} onChange={handleChange} className="w-full p-2 border rounded" />
                            <textarea
                                name="interests"
                                placeholder="Centres d'intérêt (ex: Natation, Tennis)"
                                value={userInfo.interests?.join(', ') || ''}
                                onChange={(e) => {
                                    const value = e.target.value.split(',').map(item => item.trim());
                                    setUserInfo(prev => ({ ...prev, interests: value }));
                                    setUpdateUserInfo(prev => ({ ...prev, interests: value }));
                                }}
                                className="w-full p-2 border rounded"
                            />

                            <Button type="submit" variant="contained" fullWidth disabled={loading}>
                                {loading ? <CircularProgress size={25} /> : "Enregistrer les modifications"}
                            </Button>
                        </form>

                        <div className="mt-10">
                            <h2 className="text-xl font-bold mb-2">Activité</h2>
                            <EventBarChart />
                        </div>
                    </div>
                </div>
            )}

            {currentTab === "Mes Événements" && (
                <div>
                    <p>Contenu de "Mes Événements" à venir...</p>
                </div>
            )}

            {currentTab === "Paramètres" && (
                <div>
                    <p>Contenu de "Paramètres" à venir...</p>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;