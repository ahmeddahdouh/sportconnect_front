import GeneralInformationEvent from "../../components/event_components/generalInformationEvent";
import {useEffect, useRef, useState} from "react";
import {fieldsAddEvent} from "../../data/data";
import authService from "../../services/AuthService";
import PlaceDateInfo from "../../components/event_components/PlaceDateInfo";
import ParticipationDetails from "../../components/event_components/ParticipationDetails";
import Swal from "sweetalert2";
import {Button} from "@mui/material";
import eventService from "../../services/EventService";
import SportEntity from "../../entities/SportEntity";
import {useLocation} from "react-router-dom";
import SportService from "../../services/SportService";



const CreatePage =()=>{

    const location = useLocation();
    const eventData = location.state;
    const formFields = fieldsAddEvent;
    const minUserInputRef = useRef(null);
    const maxUserInputRef = useRef(null);
    const [formData, setFormData] = useState(initForm());
    const [Imagefile, setImagefile] = useState(null);
    const [choosedSport, setChoosedSport] = useState(null);
    const token = localStorage.getItem("access_token");
    const [loading, setLoading] = useState(true);
    const [sports, setSports] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSports = async () => {
            try {
                setLoading(true);
                const rawSports = await SportService.getAllSports();
                // Transformation en entités avec validation
                const validSports = rawSports
                    .filter(sport => sport.isValid());
                // Utilise isValid() de SportEntity
                setSports(validSports);
            } catch (err) {
                setError(err.message || "Failed to load sports");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSports();

        // Nettoyage optionnel
        return () => {
            // Annule la requête si nécessaire
        };
    }, []);

    useEffect(() => {
        if (eventData) {
            const { members, event_id, ...eventDataWithoutMembers } = eventData;

            const convertToBoolean = (value) => {
                if (typeof value === 'boolean') return value;
                if (typeof value === 'string') return value.toLowerCase() === 'true';
                return false;
            };

            const processedData = {
                ...eventDataWithoutMembers,
                is_private: convertToBoolean(eventDataWithoutMembers.is_private),
                is_paid: convertToBoolean(eventDataWithoutMembers.is_paid),
                is_team_vs_team: convertToBoolean(eventDataWithoutMembers.is_team_vs_team),
            };

            setFormData(processedData);
        }
    }, [eventData]);



    function initForm() {
        return formFields.reduce((acc, field) =>
            ({...acc, [field.name]: field.type === "checkbox" ? false : ''}), {});
    }

    function handleSportSelection(value) {

        const sport_value = sports.find(sport => sport.id === value);
        const selectedSport = sport_value;
        setChoosedSport(selectedSport);

        if (minUserInputRef.current) {
            minUserInputRef.current.value = selectedSport.nbr_joueur_max;
        }
        if (maxUserInputRef.current) {
            maxUserInputRef.current.value = selectedSport.nbr_joueur_max;
        }

        return {
            id_sport: Number(selectedSport.id),
            nombre_utilisateur_min: selectedSport.nbr_joueur_max,
            event_max_utilisateur: selectedSport.nbr_joueur_max,
        };
    }

    const handleChange = (e, source) => {
        if (!source) {
            const { name, type, checked, value } = e.target;

            let newFormData = {
                ...formData,
                id_gestionnaire: authService.getCurrentUser().id,
            };

            if (name === "id_sport") {
                const updatedValues = handleSportSelection(value);
                newFormData = {
                    ...newFormData,
                    ...updatedValues,
                };
            } else {
                const newValue = type === "checkbox" ? checked : value;
                newFormData[name] = newValue;
            }

            setFormData(newFormData);
        } else {
            // Source spécifique (e.g. "is_paid")
            const newValue = source === "is_paid" ? e.target.checked : e;
            setFormData({
                ...formData,
                [source]: newValue,
            });
        }
    };


    const onLocationSelect = (position,formatedAddres?)=>{
        setFormData({
            ...formData,
            "event_ville": formatedAddres,
            "longitude": Number(position["lat"]),
            "latitude": Number(position["lng"]),
        });
    }

    async function insertEvent() {

        let response = null;
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            if (formData?.id) {
                 response = await eventService.updateEvent(formData?.id,formData,token,Imagefile);
                if (response.status >=200 && response.status < 300) {
                    // Succès
                    Alert_personalised('Votre évènement a bien été modifiée', 'success', "", "Créer un autre");
                return;
                } else {
                    // Erreur retournée par le serveur
                    const errorData = await response.json();
                    Alert_personalised(
                        errorData.message || 'Erreur lors de la modification de l’événement',
                        'error'
                    );
                }
            }

            else    {
                 response = await eventService.insertEvenet(formData, Imagefile);
                if (response.status === 201 && response.statusText === "CREATED") {
                    // Succès
                    Alert_personalised('Votre évènement a bien été enregistré', 'success', "", "Créer un autre");
                } else {
                    // Erreur retournée par le serveur
                    const errorData = await response.json();
                    Alert_personalised(
                        errorData.message || 'Erreur lors de l’enregistrement de l’événement',
                        'error'
                    );
                }
            }


            if (response.status === 201 && response.statusText === "CREATED") {
                // Succès
                Alert_personalised('Votre évènement a bien été enregistré', 'success', "", "Créer un autre");
            } else {
                // Erreur retournée par le serveur
                const errorData = await response.json();
                Alert_personalised(
                    errorData.message || 'Erreur lors de l’enregistrement de l’événement',
                    'error'
                );
            }
        } catch (error) {
            // Erreur réseau ou inattendue
            console.error(error);
            Alert_personalised(
                error.response?.data.error || error.message||'Une erreur est survenue. Veuillez réessayer plus tard.',
                'error'
            );
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        e.preventDefault();
        setFormData({...formData, id_gestionnaire: authService.getCurrentUser().id});
        insertEvent()
    }


    function Alert_personalised(message, icon, text, confirmButtonText) {
        Swal.fire({
            title: message ? message : "Êtes-vous sûr?",
            text: text ? text : "Cette action est irréversible!",
            icon: icon ? icon : "warning",
            showCancelButton: true,
            cancelButtonText: "List des évenements",
            confirmButtonColor: "#0052cc",
            confirmButtonText: confirmButtonText ? confirmButtonText : "Oui, supprimer!",
        }).then((result) => {
            if (result.isConfirmed) {
                //setFormData(initForm());
                //window.location.reload();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Action uniquement quand le bouton "Cancel" est cliqué
                window.location.href = "/booking";
            }
            // Les autres cas de fermeture (ESC, clic externe, etc.) ne déclencheront pas de redirection
        });
    }

    return (<div className="md:w-4/6 m-auto p-10">

        <span className="text-3xl font-bold font-sans w-full text-center mb-6" >Créer un événement</span>
        <div className="mt-3">
            <span
                className="   font-sans ">Remplissez le formulaire ci-dessous pour créer votre événement sportif</span>
        </div>
        <form onSubmit={handleSubmit}>
            <GeneralInformationEvent handleChange={handleChange}
                                     sports = {sports}
                                     choosedSport={choosedSport}
                                     setImagefile={setImagefile} formData={formData} />
            <PlaceDateInfo handleChange={handleChange}
                           onLocationSelect={onLocationSelect}
                           eventData={formData}
            />
            <ParticipationDetails handleChange={handleChange} is_paid={formData['is_paid']}
                                  minUserInputRef={minUserInputRef}
                                  formData={formData}
                                  choosedSport={choosedSport}
                                  maxUserInputRef={maxUserInputRef}
            />
            {formData?.id ?
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Modifier
            </Button>:
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Créer l'évenement
            </Button>}
        </form>
    </div>)
}


export default CreatePage;
