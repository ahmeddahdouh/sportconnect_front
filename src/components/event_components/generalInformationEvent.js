import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, {useEffect, useRef, useState} from "react";
import SportService from "../../services/SportService";
import {Button} from "@mui/material";
import {UploadIcon} from "lucide-react";
import ClearIcon from "@mui/icons-material/Clear";

const GeneralInformationEvent = (props) => {
    const BASE_URL_IMAGE = `${process.env.REACT_APP_BASE_URL}/auth/uploads/team_photos/`;

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [Imagefile, setImagefile] = React.useState(null);

    const [error, setError] = useState(null);



    // Ajout du hook pour gérer l'image de l'événement depuis les props
    useEffect(() => {
        if(props.formData?.event_image){
            setPreview(getImageUrl(BASE_URL_IMAGE, props.formData?.event_image));
        } else {
            setPreview(null);
        }
    }, [props.formData?.event_image]); // Correction avec les crochets pour le tableau de dépendances

    function getImageUrl(baseUrl, event_image) {
        return `${baseUrl}${event_image}`;
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        props.setImagefile(file);
        setImagefile(file);
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setImagefile(null);
        if (props.setImagefile) {
            props.setImagefile(null);
        }
        fileInputRef.current.value = null; // reset l'input file
    };

    return (<div>
        <Card variant="outlined" className="p-5">
            <span className="text-2xl font-bold font-sans w-full text-center mb-6">Informations générales</span>
            <div className="mt-3">
                <span className="text-sm font-sans">Les informations de base de votre événement</span>
            </div>

            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700">
                        Titre de l'événement
                    </label>
                    <input
                        id="event_name"
                        name="event_name"
                        value={props.formData?.event_name || ""}
                        type="text"
                        onChange={props.handleChange}
                        placeholder="Ex: Marathon de Paris"
                        required
                        className="w-full px-4 py-2 text-gray-800 border
                                border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black
                                focus:border-transparent"
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="id_sport" className="text-sm font-medium text-gray-700">
                        Sport
                    </label>
                    <select
                        id="id_sport"
                        name="id_sport"
                        value={props.formData?.id_sport || ""}
                        onChange={props.handleChange}
                        placeholder="Sélectionnez une catégorie"
                        required
                        className="w-full px-4 py-2 text-gray-800 border
                        border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black
                        focus:border-transparent bg-white"
                    >
                        <option value="" disabled hidden>
                            Sélectionnez une catégorie
                        </option>
                        {props.sports?.map((sport, index) => (
                            <option key={index} value={sport.id}>
                                {sport?.sport_nom}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div className="grid gap-2">
                        <textarea
                            name="event_description"
                            value={props.formData?.event_description || ""}
                            id="description"
                            onChange={props.handleChange}
                            placeholder="Décrivez votre événement en détail..."
                            className="min-h-[120px] w-full px-4 py-2 text-gray-800 border
                                border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black
                                focus:border-transparent"
                            required
                        />
                    </div>
                    <label htmlFor="event_image" className="text-sm font-medium text-gray-700">
                        Image de l'événement
                    </label>
                    {preview ? (
                        <div className="text-right">
                            <button
                                className="right-2 z-10 font-bold text-gray-600 mt-3"
                                onClick={handleRemoveImage}
                                type="button"
                            >
                                <ClearIcon className="h-4 w-4 mr-1"/>
                                Supprimer
                            </button>
                            <img
                                src={preview}
                                alt="Preview"
                                className="object-cover w-full max-h-48 rounded-lg"
                            />
                        </div>
                    ) : (
                        <div
                            className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                            <UploadIcon className="h-8 w-8 text-muted-foreground mb-2"/>
                            <p className="text-sm text-muted-foreground mb-1">
                                Glissez-déposez une image ou cliquez pour parcourir
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG ou JPEG (max. 5MB)
                            </p>
                            <Button
                                size="sm"
                                className="mt-4"
                                onClick={handleImageClick}
                                type="button"
                            >
                                Sélectionner un fichier
                            </Button>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageFileChange}
                    />
                </div>
            </CardContent>
        </Card>
    </div>);
}

export default GeneralInformationEvent;