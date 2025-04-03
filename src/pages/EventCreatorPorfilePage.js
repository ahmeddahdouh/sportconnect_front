import { useState } from "react";
import ButtonAppBar from "../components/navBarComponent";
import Avatar from '@mui/material/Avatar';

const EventCreatorProfilePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <box >
         {/* Photo de couverture */}
         <div className="cover-photo">
           <img src="/cover.jpg" alt="Photo de couverture" />
         </div>

         {/* Photo de profil */}
         <div className="profile-photo m-auto ">
             <Avatar
              alt="{userInfo?.firstname}"
              sx={{ width: {xs: 80, md: 150},
                  height: {xs: 80, md: 150},
                                           }}
              className="m-auto  -mt-12 lg:-mt-24 rounded-full ring-4 ring-gray-200"
              src=""
              />
         </div>

         {/* Informations du profil */}
         <div className="profile-info">
           <h1>Nom de l'utilisateur </h1>
           <p><strong>Sport préféré :</strong> Football</p>
           <p><strong>Nombre d'événements :</strong> 4</p>
           <p><strong>Participation :</strong> 3</p>
         </div>
       </box>
     );
};

export default EventCreatorProfilePage;
