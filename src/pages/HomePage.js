import ButtonAppBar from "../components/navBarComponent";
import {Stack} from "@mui/material";
import CustomizedInputBase from "../components/SearchComponent";
import TemporaryDrawer from "../components/SideBare";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/card";

export default function HomePage ({events}) {
    return(
        <div>
            <ButtonAppBar />
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