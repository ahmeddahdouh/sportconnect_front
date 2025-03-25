import ButtonAppBar from "../components/navBarComponent";
import Avatar from '@mui/material/Avatar';
import {useContext, useEffect, useState} from "react";
import authService, {ThemeContext, userContext} from "../services/AuthService";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EventBarChart from "../components/EventsBarChart";
import axios from "axios"
import {Button, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {UserContextTest} from "../context/UserContext";



const UserProfilePage = () => {
    const [currentUser, setCurrentUser] = useState(useContext(userContext));
    const {updateUser,user} = useContext(UserContextTest);
    const [userInfo, setUserInfo] = useState(null);
    const [updateUserInfo, setUpdateUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("access_token");
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    };

    const [selectedImage, setSelectedImage] = useState(``);
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setSelectedImage(URL.createObjectURL(file));
        const formImageData = new FormData();
        formImageData.append("file", file);

        try {
            const response = await axios.put('http://localhost:5000/auth/users/profile', formImageData, { headers:headers });
            console.log("Réponse du serveur :", response.data);
            debugger;
            updateUser({...user  ,profileImage : "test"})
        } catch (e) {
            console.error("Erreur lors de l'upload :", e);
        }

    };


    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await authService.getUserById();
                setUserInfo(response);
            } catch (e) {
                console.log(e);
            }
        };
        getUserInfo();
    }, [currentUser]);

    useEffect(() => {
        setSelectedImage(`http://localhost:5000/auth/uploads/${userInfo?.profileImage}`);

        }, [userInfo]);

    // Détecter les changements
    const handleChange = (e) => {
        setUserInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setUpdateUserInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:5000/auth/users/${currentUser?.id}`,
                updateUserInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',  // assure que le serveur attend des données JSON
                    }
                }
            );
            console.log("Utilisateur mis à jour :", response.data);
            window.location.reload();
        } catch (e) {
            console.log(`Une erreur est survenue : ${e}`);
        } finally {
            setLoading(false);  // Met le loading à false après la fin de l'appel
        }

    }



    return (
        <div>
            <ButtonAppBar/>
            <div className="md:w-3/4 m-auto shadow">
                <img src="/cover.jpg" className="w-full h-28 object-cover lg:h-80" alt="cover"/>
                <div className="md:flex md:flex-row py-4">

                    <input
                        accept="image/*"
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        onChange={handleImageChange}
                    />

                    <label htmlFor="avatar-upload">
                        <IconButton component="span">
                            <Avatar
                                alt={userInfo?.firstname}
                                sx={{
                                    width: { xs: 80, md: 150 },
                                    height: { xs: 80, md: 150 },
                                }}
                                className="m-auto md:ml-4 -mt-12 lg:-mt-24 rounded-full ring-4 ring-gray-200"
                                src={selectedImage}
                            />
                        </IconButton>
                        <EditIcon className="-ml-5" />
                    </label>


                    <div className="mx-8 mt-2 font-bold">
                        {userInfo?.firstname + " " + userInfo?.familyname}
                        <div className="text-gray-500 font-light">{userInfo?.city}</div>
                    </div>
                    <div className="grid grid-cols-3 flex-grow">
                        <div className="mx-8 mt-2 font-bold text-center">
                            Sport Préféré
                            <div className="text-gray-500 font-light">Football</div>
                        </div>
                        <div className="mt-2 font-bold text-center">
                            Nombre d'événements
                            <div className="text-gray-500 font-light">{userInfo?.events?.length}</div>
                        </div>
                        <div className="mt-2 font-bold text-center">
                            Participations
                            <div className="text-gray-500 font-light">
                                {userInfo?.events?.filter(event => event.event_age_min <= userInfo.age && event.event_age_max >= userInfo.age).length}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:grid grid-cols-2 gap-2">
                    <div className="border self-start m-auto md:w-4/5 my-10 rounded-3xl shadow sm: p-5 md:p-7 text-left ">
                        <form  onSubmit={handleSubmit}>
                            <h2 className="text-lg font-bold mb-2 text-center">Information du compte :</h2>
                            <ul className=" ml-4 ">

                                <li key="nom" className="mb-1 "><PermIdentityIcon/> <b>Nom</b> : <input
                                    onChange={handleChange}
                                    name="firstname"
                                    type="text" value={userInfo?.firstname}/></li>
                                <li key="prenom" className="mb-1"><PermIdentityIcon/> <b>Prénom : </b> <input
                                    onChange={handleChange}
                                    name="familyname"
                                    type="text" value={userInfo?.familyname}/></li>
                                <li key="age" className="mb-1"><AppsOutageIcon/> <b>Age : </b> <input
                                    onChange={handleChange}
                                    name="age"
                                    type="number" value={userInfo?.age}/></li>
                                <li key="city" className="mb-1"><LocationCityIcon/> <b>Ville : </b> <input
                                    onChange={handleChange}
                                    name="city"
                                    type="text" value={userInfo?.city}/></li>
                                <li key="email" className="mb-1 flex gap-1 "><AlternateEmailIcon/><b> Email : </b> <input
                                    className="flex-grow"
                                    onChange={handleChange}
                                    name="email"
                                    type="text" value={userInfo?.email}/></li>
                                <li key="phone" className="mb-1"><CallIcon/> <b>Téléphone : </b> <input
                                    onChange={handleChange}
                                    name="phone"
                                    type="text" value={userInfo?.phone}/></li>
                            </ul>
                            <br/>
                            <Button type={"submit"} disabled={updateUserInfo === null || loading} variant='contained' className={"w-full mt-16 "}>
                                {!loading? "Modifier" :  <CircularProgress size={25} />}</Button>
                        </form>
                    </div>

                    <div className="md:grid grid-flow-col grid-rows-2 gap-1">
                        <div className="border m-2  rounded-3xl shadow sm: p-5 md:p-7 text-left">Demande d'adhésion
                        </div>
                        <div className="border m-2 rounded-3xl shadow sm: p-5 md:p-7 text-left">
                            <EventBarChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
