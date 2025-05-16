import ButtonAppBar from "../../components/utils_components/navBarComponent";
import AddEventFormComponent from "../../components/event_components/AddEventFormComponent";
import {useEffect, useState} from "react";
import apiService from "../../services/AuthService";

export default function AddEventPage() {
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        setDecoded(apiService.getCurrentUser())
    }, []);

    return(
        <div>
            <AddEventFormComponent id ={decoded?.id}/>
        </div>
    )
}