import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ShowEventComponent = (props) => {
    const { event, open, onClose, onDeleteMember, onEditEvent } = props;

    // Fonction de suppression d'un membre (par exemple, via une API ou une gestion d'état)
    const handleDeleteMember = (memberId) => {
        if (onDeleteMember) onDeleteMember(memberId);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}

            sx={{
                '& .MuiDialog-paper': {
                    width: '75%', // Définir la largeur du dialogue à 70%
                    maxWidth: 'none', // Evite la limitation de largeur max par défaut
                }
            }}
        >
            <DialogTitle className="text-center">{event.event_name}</DialogTitle>
            <DialogContent>
                <div className="md:grid space-y-3 grid-cols-2 md:space-x-4">
                    {/* Left side: Event information */}
                    <div className="flex-2 space-y-4"> {/* Augmentation de la largeur de la section informations */}
                        <div className="bg-white rounded-lg  p-4">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </h3>
                            <p className="text-gray-700 dark:text-gray-200">{event.event_description}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Informations sur l'événement
                            </h3>
                            <div className="text-gray-700 dark:text-gray-200">
                                <p><strong>Âge Minimum :</strong> {event.event_age_min}</p>
                                <p><strong>Âge Maximum :</strong> {event.event_age_max}</p>
                                <p><strong>Maximum d'utilisateurs :</strong> {event.event_max_utilisateur}</p>
                                <p><strong>Ville :</strong> {event.event_ville}</p>
                                <p><strong>Date :</strong> {new Date(event.event_date).toLocaleString()}</p>
                                <p><strong>Équipe vs Équipe :</strong> {event.is_team_vs_team === "True" ? "Oui" : "Non"}</p>
                                <p><strong>Privé :</strong> {event.is_private === "False" ? "Non" : "Oui"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Table of participants */}
                    <div>
                        <div >
                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Liste des participants
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto">
                                    <thead>
                                    <tr className="bg-gray-200 text-gray-700">
                                        <th className="px-4 py-2 text-left">Nom</th>
                                        <th className="px-4 py-2 text-left">Prénom</th>
                                        <th className="px-4 py-2 text-left">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {event.members.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center text-gray-500">
                                                Aucun participant pour cet événement.
                                            </td>
                                        </tr>
                                    ) : (
                                        event.members.map((member, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="px-4 py-2">{member.familyname}</td>
                                                <td className="px-4 py-2">{member.firstname}</td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => handleDeleteMember(member.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onEditEvent}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Modifier l'événement
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShowEventComponent;
