import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { Button, CircularProgress, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { useUser } from "../context/UserContext";
import UserEntity from "../entities/UserEntity";
import userService from "../services/UserService";
import EventBarChart from "../components/EventsBarChart";
import ProfileTabs from "../components/ProfileTabs";
import ProfileInterests from "../components/ProfileInterests";
import {
    Cake as CakeIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon,
    Event as MemberSinceIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import MyEventPage from "./MyEventPage";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserProfilePage = () => {
    const { currentUser, setCurrentUser } = useUser();
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

    const calculateAge = (birthDate) => {
        if (!birthDate) return null;
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    const formatBirthDate = (dateString) => {
        if (!dateString) return "Non renseignée";
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const handleImageChange = async (event) => {

        const file = event.target.files[0];
        if (!file) return;
        setSelectedImage(URL.createObjectURL(file));
        const formImageData = new FormData();
        formImageData.append("file", file);

        try {
            const imagelink = await userService.updateImage(formImageData, headers);

            const competeImgeLink = `${base_url_auth}/uploads/${imagelink?.image}`
            setCurrentUser({
                ...currentUser,
                profileImage: competeImgeLink
            });

        } catch (e) {
            console.error("Erreur lors de l'upload :", e);
        }
    };

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await userService.getCurrentUserInfo();
                const userEntity = new UserEntity(response);
                if (userEntity.date_of_birth) {
                    userEntity.age = calculateAge(userEntity.date_of_birth);
                }
                debugger;
                setUserInfo(userEntity);
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

        if (name === "date_of_birth") {
            const age = calculateAge(value);
            setUserInfo((prev) => ({
                ...prev,
                [name]: value,
                age: age
            }));

            setUpdateUserInfo((prev) => ({
                ...prev,
                [name]: value,
                age: age
            }));
        } else {
            setUserInfo((prev) => ({
                ...prev,
                [name]: value,
            }));

            setUpdateUserInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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
                                    src={selectedImage?selectedImage : userInfo.getProfileImageUrl()}
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

                        <div className="mt-4 space-y-3">
                            <div className="flex items-center">
                                <EmailIcon className="mr-2 text-gray-500" />
                                <span>{userInfo.email}</span>
                            </div>

                            <div className="flex items-center">
                                <PhoneIcon className="mr-2 text-gray-500" />
                                <span>{userInfo.phone || "Non renseigné"}</span>
                            </div>

                            <div className="flex items-center">
                                <LocationIcon className="mr-2 text-gray-500" />
                                <span>{userInfo.city || "Non renseignée"}</span>
                            </div>

                            <div className="flex items-center">
                                <CakeIcon className="mr-2 text-gray-500" />
                                <div>
                                    {userInfo.date_of_birth ? (
                                        <>
                                            <span>{formatBirthDate(userInfo.date_of_birth)}</span>
                                            {userInfo.age && (
                                                <Chip
                                                    label={`${userInfo.age} ans`}
                                                    size="small"
                                                    className="ml-2 bg-blue-100 text-blue-800"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <span>Date de naissance non renseignée</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <MemberSinceIcon className="mr-2 text-gray-500" />
                                <span>Membre depuis {new Date(userInfo.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>

                        <ProfileInterests interests={userInfo.interests} />
                    </div>

                    <div className="md:w-2/3 border rounded-xl p-6 shadow">
                        <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center">
                                <PersonIcon className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="Nom"
                                    value={userInfo.firstname || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex items-center">
                                <PersonIcon className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="familyname"
                                    placeholder="Prénom"
                                    value={userInfo.familyname || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex items-center">
                                <EmailIcon className="mr-2 text-gray-500" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={userInfo.email || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex items-center">
                                <PhoneIcon className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Téléphone"
                                    value={userInfo.phone || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex items-center">
                                <LocationIcon className="mr-2 text-gray-500" />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ville"
                                    value={userInfo.city || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="flex items-center">
                                <CakeIcon className="mr-2 text-gray-500" />
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={userInfo.date_of_birth || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                {userInfo.age !== null && (
                                    <Chip
                                        label={`${userInfo.age} ans`}
                                        size="small"
                                        className="ml-2 bg-blue-100 text-blue-800"
                                        icon={<CakeIcon fontSize="small" />}
                                    />
                                )}
                            </div>

                            <textarea
                                name="bibliography"
                                placeholder="Biographie"
                                value={userInfo.bibliography || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />

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
                                rows={3}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                startIcon={!loading && <EditIcon />}
                            >
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
                <div className=" m-auto shadow-2xl rounded-2xl">
                    <MyEventPage />
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