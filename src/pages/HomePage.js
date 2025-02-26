import ButtonAppBar from "../components/navBarComponent";
import {Stack} from "@mui/material";
import CustomizedInputBase from "../components/SearchComponent";
import TemporaryDrawer from "../components/SideBare";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/card";
import {useEffect, useState} from "react";
import apiService from "../services/AuthService";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import * as React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function HomePage () {
    const [decoded, setDecoded] = useState(null);
    const [events, setEvents] = useState(
        []
    );
    const [originalEvents, setOriginalEvents] = useState([]);



    useEffect(() => {
        setDecoded(apiService.get_current_user());
        get_events();
    }, []);


    async function get_events(){
        axios.get("http://localhost:5000/event/booking")
            .then(response => {
                setEvents(response.data);
                setOriginalEvents(response.data);
            }).catch(error => {
            console.log(error);
        })
    }

    const filterEvents = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        // Filtrer à partir de la liste originale
        const filtered = originalEvents.filter((event) => {
            return (
                event.event_name.toLowerCase().includes(searchTerm) ||
                event.event_description.toLowerCase().includes(searchTerm) ||
                event.event_ville.toLowerCase().includes(searchTerm) ||
                event.event_Items.toLowerCase().includes(searchTerm)
            );
        });

        setEvents(filtered);
    };



    return(
        <div>
            {decoded && <ButtonAppBar username={decoded?.sub.username} />}
            <Stack direction="row" spacing={2}
                   justifyContent="center"
                   alignItems="center" paddingTop="20px" >
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Trouvez Votre plaisir ⛹️🎾⛳"
                        inputProps={{ 'aria-label': 'Trouvez Votre plaisir' }}
                        onChange={filterEvents}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
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