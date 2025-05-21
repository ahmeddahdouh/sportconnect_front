import { useState } from 'react';


const RGPDModalContent = ({ isOpen, onClose, onSave }) => {
    const [consentPublicEvents, setConsentPublicEvents] = useState(false);

    if (!isOpen) return null;

    const handleSaveConsent = () => {
        onSave(consentPublicEvents);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Politique de confidentialité et RGPD</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Gestion de vos données personnelles</h3>

                    <div className="space-y-4 mb-6">
                        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à protéger vos données personnelles avec les mesures suivantes :</p>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Principes RGPD respectés</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><span className="font-medium">Licéité, loyauté et transparence</span> - Nous traitons vos données de manière légale et transparente.</li>
                                <li><span className="font-medium">Limitation des finalités</span> - Vos données sont collectées pour des finalités déterminées et explicites.</li>
                                <li><span className="font-medium">Minimisation des données</span> - Nous ne collectons que les données strictement nécessaires.</li>
                                <li><span className="font-medium">Exactitude</span> - Nous maintenons vos données à jour et vous permettons de les rectifier.</li>
                                <li><span className="font-medium">Limitation de conservation</span> - Vos données sont conservées uniquement pour la durée nécessaire.</li>
                                <li><span className="font-medium">Intégrité et confidentialité</span> - Nous protégeons vos données contre tout accès non autorisé.</li>
                                <li><span className="font-medium">Responsabilité</span> - Nous sommes responsables du respect de ces principes et pouvons le démontrer.</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Droits des utilisateurs</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><span className="font-medium">Droit d'accès</span> - Vous pouvez accéder à toutes vos données personnelles.</li>
                                <li><span className="font-medium">Droit de rectification</span> - Vous pouvez modifier ou corriger vos données.</li>
                                <li><span className="font-medium">Droit à l'effacement</span> - Vous pouvez demander la suppression de vos données.</li>
                                <li><span className="font-medium">Droit à la limitation du traitement</span> - Vous pouvez demander la restriction du traitement.</li>
                                <li><span className="font-medium">Droit à la portabilité</span> - Vous pouvez récupérer vos données dans un format structuré.</li>
                                <li><span className="font-medium">Droit d'opposition</span> - Vous pouvez vous opposer au traitement de vos données.</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Données collectées</h4>
                            <p>Nous collectons les données suivantes :</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Informations de profil (nom, prénom, adresse email)</li>
                                <li>Données de connexion et d'utilisation</li>
                                <li>Événements créés et participation aux événements</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Conservation des données</h4>
                            <p>Vos données sont conservées pendant toute la durée de votre utilisation de nos services et jusqu'à 3 ans après votre dernière activité sur votre compte.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default RGPDModalContent;
