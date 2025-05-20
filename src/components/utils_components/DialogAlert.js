import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function AlertDialog(props) {

    const handleResponse = (response) => {
        if (props.resolveRef.current) {
            props.resolveRef.current(response);
            props.resolveRef.current =null;
        }
        props.onClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                style: {
                    minWidth: "50vw",
                    minHeight: "50vh",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">
                <CampaignIcon/> {props.alertData.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.alertData.message}
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                { props.alertData.buttonMessage? <Button   onClick={() => handleResponse(false)}>Annuler</Button>: null }
                { props.alertData.buttonMessage?    <Button variant="contained" color={props.alertData.buttonColor} onClick={() => handleResponse(true)} autoFocus>
                    {props.alertData.buttonMessage}
                </Button> :null}
            </DialogActions>
        </Dialog>
    );
}
