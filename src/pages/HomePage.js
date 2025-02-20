import ButtonAppBar from "../components/navBarComponent";
import {Stack} from "@mui/material";
import CustomizedInputBase from "../components/SearchComponent";
import TemporaryDrawer from "../components/SideBare";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/card";
import {useEffect, useState} from "react";
import apiService from "../services/AuthService";
import axios from "axios";

export default function HomePage () {
    const [decoded, setDecoded] = useState(null);
    const [events, setEvents] = useState(
        []
    );



    useEffect(() => {
        setDecoded(apiService.get_current_user());
        get_events();
    }, []);


    async function get_events(){
        axios.get("http://localhost:5000/event/booking")
            .then(response => {
                setEvents(response.data);
            }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div>
            {decoded && <ButtonAppBar username={decoded?.sub.username} />}
            <Stack direction="row" spacing={2}
                   justifyContent="center"
                   alignItems="center" paddingTop="20px" >
                <CustomizedInputBase/>
                <TemporaryDrawer/>
            </Stack>

            <Grid container spacing={4} justifyContent="center" paddingX="100px" paddingY="20px">
                {events.map((event, index) => (
                    <Grid item xs={12} sm={10} md={5} lg={4} key={index}>
                        <BasicCard  event = {event}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}