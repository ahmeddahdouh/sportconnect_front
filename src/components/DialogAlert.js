import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function AlertDialog({ open, onClose, resolveRef }) {

    const handleResponse = (response) => {
        if (resolveRef.current) {
            resolveRef.current(response);
            resolveRef.current =null;
        }
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <CampaignIcon/> Confirmation d'inscription à l'événement
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Votre inscription à l'événement sera immédiatement confirmée.
                    Veuillez noter que cette action est définitive et que votre participation sera visible publiquement.
                    Souhaitez-vous confirmer votre inscription ?
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button   onClick={() => handleResponse(false)}>Annuler</Button>
                <Button variant="contained" onClick={() => handleResponse(true)} autoFocus>Confirmer </Button>
            </DialogActions>
        </Dialog>
    );
}
