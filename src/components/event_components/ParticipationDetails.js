import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

const ParticipationDetails = (props) => {
    const [maxAge, setMaxAge] = useState("");
    const [minAge, setMinAge] = useState("");
    const [ageError, setAgeError] = useState("");
    const [maxMembers, setMaxMembers] = useState("");
    const [minMembers, setMinMembers] = useState("");
    const [memberError, setMemberError] = useState("");
    const [date, setDate] = useState(null);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        if (props.formData?.date_limite_inscription) {
            setDate(new Date(props.formData?.date_limite_inscription));
        }
        if (props.formData?.is_paid !== undefined) {
            setIsPaid(props.formData?.is_paid === true || props.formData?.is_paid === 'true');
        }
    }, [props.formData]);

    useEffect(() => {
        if (minAge && maxAge) {
            if (parseInt(minAge) > parseInt(maxAge)) {
                setAgeError("L'âge minimum ne peut pas dépasser l'âge maximum");
            } else {
                setAgeError("");
            }
        }
    }, [minAge, maxAge]);

    // Validation de membres
    useEffect(() => {
        if (minMembers && maxMembers) {
            if (parseInt(minMembers) > parseInt(maxMembers)) {
                setMemberError("Le nombre minimum ne peut pas dépasser le nombre maximum");
            } else {
                setMemberError("");
            }
        }
    }, [minMembers, maxMembers]);

    const handleAgeChange = (e) => {
        const { name, value } = e.target;

        if (name === "event_age_min") {
            setMinAge(value);

            // Mise à jour automatique de l'âge max si nécessaire
            if (maxAge && parseInt(value) > parseInt(maxAge)) {
                setMaxAge(value);
                document.getElementById("event_age_max").value = value;
            }
        } else if (name === "event_age_max") {
            setMaxAge(value);

            // Mise à jour automatique de l'âge min si nécessaire
            if (minAge && parseInt(value) < parseInt(minAge)) {
                setMinAge(value);
                document.getElementById("event_age_min").value = value;
            }
        }
        // Transmission au handler principal
        props.handleChange(e);
    };

    const handleMemberChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombre_utilisateur_min") {
            setMinMembers(value);

            // Mise à jour automatique du nombre max si nécessaire
            if (maxMembers && parseInt(value) > parseInt(maxMembers)) {
                setMaxMembers(value);
                document.getElementById("event_max_utilisateur").value = value;
            }
        } else if (name === "event_max_utilisateur") {
            setMaxMembers(value);

            // Mise à jour automatique du nombre min si nécessaire
            if (minMembers && parseInt(value) < parseInt(minMembers)) {
                setMinMembers(value);
                document.getElementById("nombre_utilisateur_min").value = value;
            }
        }

        // Transmission au handler principal
        props.handleChange(e);
    };

    // Helper pour déterminer les classes CSS selon l'état d'erreur
    const getInputClasses = (hasError) => {
        const baseClasses = "w-full px-4 py-2 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2";
        return hasError
            ? `${baseClasses} border-red-500 focus:ring-red-500 focus:border-transparent`
            : `${baseClasses} border-gray-300 focus:ring-black focus:border-transparent`;
    };

    return (
        <div>
            <Card variant="outlined" className="p-5">
                <span className="text-2xl font-bold font-sans w-full text-center mb-6">Détails de participation</span>
                <div className="mt-3">
                    <span className="text-sm font-sans">Informations sur les inscriptions et les participants</span>
                </div>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="nombre_utilisateur_min" className="text-sm font-medium text-gray-700">
                                Nombre minimum de participants
                            </label>
                            <input
                                id="nombre_utilisateur_min"
                                name="nombre_utilisateur_min"
                                value={props.formData?.nombre_utilisateur_min}
                                ref={props.minUserInputRef}
                                type="number"
                                min={0}
                                onChange={handleMemberChange}
                                placeholder="1"
                                required
                                className={getInputClasses(memberError)}
                            />
                        </div>
                        <div>
                            <label htmlFor="event_max_utilisateur" className="text-sm font-medium text-gray-700">
                                Nombre maximum de participants
                            </label>
                            <input
                                id="event_max_utilisateur"
                                name="event_max_utilisateur"
                                value={props.formData?.event_max_utilisateur}
                                ref={props.maxUserInputRef}
                                type="number"
                                min={0}
                                onChange={handleMemberChange}
                                placeholder="11"
                                required
                                className={getInputClasses(memberError)}
                            />
                        </div>
                        {memberError && (
                            <div className="col-span-2">
                                <p className="text-sm text-red-600">{memberError}</p>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="event_age_min" className="text-sm font-medium text-gray-700">
                                Age minimum de participants
                            </label>
                            <div className="relative">
                                <input
                                    id="event_age_min"
                                    name="event_age_min"
                                    value={props.formData?.event_age_min}
                                    type="number"
                                    min={0}
                                    onChange={handleAgeChange}
                                    placeholder="15"
                                    required
                                    className={getInputClasses(ageError)}
                                />
                                {ageError && (
                                    <div className="absolute right-2 top-2 text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Doit être inférieur ou égal à l'âge maximum</p>
                        </div>
                        <div>
                            <label htmlFor="event_age_max" className="text-sm font-medium text-gray-700">
                                Age maximum de participants
                            </label>
                            <div className="relative">
                                <input
                                    id="event_age_max"
                                    name="event_age_max"
                                    value={props.formData?.event_age_max}
                                    type="number"
                                    min={0}
                                    onChange={handleAgeChange}
                                    placeholder="75"
                                    required
                                    className={getInputClasses(ageError)}
                                />
                                {ageError && (
                                    <div className="absolute right-2 top-2 text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Doit être supérieur ou égal à l'âge minimum</p>
                        </div>
                        {ageError && (
                            <div className="col-span-2">
                                <p className="text-sm text-red-600">{ageError}</p>
                            </div>
                        )}
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                        <label htmlFor="event_age_max" className="text-sm font-medium text-gray-700">
                            Date Limite d'inscription
                        </label>
                        <DatePicker
                            value={date}
                            onAccept={(e) => {
                                setDate(e);
                                props.handleChange(e ? e.toISOString().split("T")[0] : null, "date_limite_inscription");
                            }}
                            minDate={new Date()}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    placeholder: "Sélectionnez une date",
                                    fullWidth: true,
                                    required: true,

                                }
                            }}
                        />
                    </LocalizationProvider>


                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="is_paid" className="text-sm font-medium text-gray-700">
                                Evénement Payant {props.formData?.is_paid}
                            </label>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="is_paid"
                                        name="is_paid"
                                        value={isPaid}
                                        checked={props.formData?.is_paid}
                                        onChange={(e) => {props.handleChange(e, "is_paid")}}
                                        color="primary"
                                    />
                                }
                                labelPlacement="end"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-sm font-medium text-gray-700">
                                Prix
                            </label>
                            <div className="flex items-center space-x-2">
                                <TextField
                                    id="price"
                                    name="price"
                                    min={0}
                                    value={props.formData?.price}
                                    type="number"
                                    onChange={props.handleChange}
                                    placeholder="10.0"
                                    disabled={!props.is_paid}
                                    required={props.is_paid}
                                    className="w-full"
                                    InputProps={{
                                        endAdornment: <span className="text-gray-700">$</span>,
                                    }}
                                />
                            </div>
                        </div>

                        {props.memberError && (
                            <div className="col-span-2">
                                <p className="text-sm text-red-600">{props.memberError}</p>
                            </div>
                        )}
                    </div>


                    <label htmlFor="event_commande_participation" className="text-sm font-medium text-gray-700">
                        Conditions de participation
                    </label>
                    <div className="grid gap-2">
                        <textarea
                            name="event_commande_participation"
                            id="event_commande_participation"
                            value={props.formData?.event_commande_participation}
                            onChange={props.handleChange}
                            placeholder="Ex: Certificat médical obligatoire, âge minimum..."
                            className="min-h-[120px] w-full px-4 py-2 text-gray-800 border
                                 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black
                                 focus:border-transparent"

                        />
                    </div>


                    <label htmlFor="commodites" className="text-sm font-medium text-gray-700">
                        Commodités
                    </label>
                    <div className="grid gap-2">
                        <textarea
                            name="commodites"
                            id="commodites"
                            value={props.formData?.commodites}
                            onChange={props.handleChange}
                            placeholder="Ex : Vestiaires disponibles, ravitaillement prévu, parking gratuit..."
                            className="min-h-[120px] w-full px-4 py-2 text-gray-800 border
                                 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black
                                 focus:border-transparent"
                        />
                    </div>


                </CardContent>
            </Card>
        </div>
    );
};

export default ParticipationDetails;