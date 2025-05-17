import GeneralInformationEvent from "../components/generalInformationEvent";
import {useRef, useState} from "react";
import {fieldsAddEvent} from "../data/data";
import authService from "../services/AuthService";
import PlaceDateInfo from "../components/PlaceDateInfo";
import ParticipationDetails from "../components/ParticipationDetails";
import Swal from "sweetalert2";
import {Button} from "@mui/material";
import eventService from "../services/EventService";
import SportEntity from "../entities/SportEntity";


const CreatePage =()=>{

    const formFields = fieldsAddEvent;
    const minUserInputRef = useRef(null);
    const maxUserInputRef = useRef(null);
    const [formData, setFormData] = useState(initForm());
    const [Imagefile, setImagefile] = useState(null);
    const [choosedSport, setChoosedSport] = useState(null);

    function initForm() {
        return formFields.reduce((acc, field) =>
            ({...acc, [field.name]: field.type === "checkbox" ? false : ''}), {});
    }

    function handleSportSelection(value) {
        const selectedSport = new SportEntity(JSON.parse(value));
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
        debugger;
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
        try {
            const response = await eventService.insertEvenet(formData, Imagefile);

            if (response.status === 201 && response.statusText === "CREATED") {
                
                Alert_personalised('Votre évènement a bien été enregistré', 'success', "", "Créer un autre");
            } else {
                
                const errorData = await response.json();
                Alert_personalised(
                    errorData.message || 'Erreur lors de l’enregistrement de l’événement',
                    'error'
                );
            }
        } catch (error) {
            
            console.error(error);
            Alert_personalised(
                'Une erreur est survenue. Veuillez réessayer plus tard.',
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
                setFormData(initForm());
                
            } else if (result.isDismissed) {
                window.location.href = "/booking";
            }
        });
    }

    return (<div className="md:w-4/6 m-auto p-10">

        <span className="text-3xl font-bold font-sans w-full text-center mb-6" >Créer un événement</span>
        <div className="mt-3">
            <span
                className="   font-sans ">Remplissez le formulaire ci-dessous pour créer votre événement sportif</span>
        </div>
        <form onSubmit={handleSubmit}>
            <GeneralInformationEvent handleChange={handleChange} setImagefile={setImagefile} formData={formData} />
            <PlaceDateInfo handleChange={handleChange} onLocationSelect={onLocationSelect}/>
            <ParticipationDetails handleChange={handleChange} is_paid={formData['is_paid']}
                                  minUserInputRef={minUserInputRef}
                                  maxUserInputRef={maxUserInputRef}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Créer l'évenement
            </Button>
        </form>
    </div>)
}


export default CreatePage;
