import ButtonAppBar from "../components/navBarComponent";
import AddEventFormComponent from "../components/AddEventFormComponent";
import {useEffect, useState} from "react";
import apiService from "../services/AuthService";

export default function AddEventPage() {
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        setDecoded(apiService.get_current_user())
    }, []);

    return(
        <div>
            <ButtonAppBar username={decoded?.sub.username} />
            <AddEventFormComponent id ={decoded?.sub.id}/>
        </div>
    )
}