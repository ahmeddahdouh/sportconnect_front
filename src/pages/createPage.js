import GeneralInformationEvent from "../components/generalInformationEvent";
import {useState} from "react";
import {fieldsAddEvent} from "../data/data";
import authService from "../services/AuthService";
import PlaceDateInfo from "../components/PlaceDateInfo";
import ParticipationDetails from "../components/ParticipationDetails";
import Swal from "sweetalert2";
import {Button} from "@mui/material";
import eventService from "../services/EventService";


const CreatePage =()=>{

    const formFields = fieldsAddEvent;
    const [formData, setFormData] = useState(initForm());
    const [Imagefile, setImagefile] = useState(null);

    function initForm() {
        return formFields.reduce((acc, field) =>
            ({...acc, [field.name]: field.type === "checkbox" ? false : ''}), {});
    }

    const handleChange = (e,source?) => {

        if (!source) {
            const {name, type, checked, value} = e.target;
            let newValue = name === "event-sport"
                ? Number(value)
                : (type === "checkbox" ? checked : value);
            setFormData({
                ...formData,
                id_gestionnaire: authService.currentUser.id,
                [name]: newValue,
            });
        } else {
            setFormData({
                ...formData,
                [source]: e,
            });
        }

    };

    const onLocationSelect = (position,formatedAddres?)=>{
        debugger;
        setFormData({
            ...formData,
            "event_ville": formatedAddres,
            "longitude": Number(position["lat"]),
            "latitude": Number(position["lng"]),
        });
    }


    async function handleSubmit(e) {
        debugger;
        e.preventDefault();
        e.preventDefault();
        setFormData({...formData, id_gestionnaire: authService.currentUser.id});
        console.log()
        insertEvent()
    }

    async function insertEvent() {
        try {
            const response = eventService.insertEvenet(formData,Imagefile);
            //setAlertState({message: response.message, severity: "success"});
            Alert_personalised('Votre evenement a bien été enregistré', 'success',
                "", "Créer un autre");
        } catch (error) {
            console.error(error)

        }
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
                //setAlertState({message: "", severity: ""});
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
            <ParticipationDetails handleChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Créer l'évenement
            </Button>
        </form>
    </div>)
}


export default CreatePage;
