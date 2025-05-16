import {Typography,Button} from "@mui/material";
import ButtonAppBar from "./navBarComponent";

export default function Typographies(props) {
    return (
        <div>
            <ButtonAppBar/>
            <Typography variant="h1" component="h2">
                h1. Heading
            </Typography>
            <Button variant='text'> Text </Button>
            <Button variant='contained'> contained</Button>
        </div>
    )
}