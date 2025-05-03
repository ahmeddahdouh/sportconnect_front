import React, { useState } from "react";
import Card from "@mui/material/Card";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';


const PlaceDateInfo = (props) => {
    const googleMapsApiKey = "your_api_key";
    const center = { lat: 48.8566, lng: 2.3522 };

    const [selectedPosition, setSelectedPosition] = useState(null);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState({});

    const handleMapClick = (e) => {
        if (e && e.detail && e.detail.latLng) {
            const { lat, lng } = e.detail.latLng;
            const position = { lat, lng };
            setSelectedPosition(position);

            if (props.onLocationSelect) {
                props.onLocationSelect(position);
            }

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: position }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const formattedAddress = results[0].formatted_address;
                    if (props.onLocationSelect) {
                        props.onLocationSelect(position, formattedAddress);
                    }
                } else {
                    console.error("Géocodage échoué:", status);
                }
            });
        }
    };

    // Fonction pour valider avant d'envoyer les données
    const validate = () => {
        let tempErrors = {};
        if (!date) tempErrors.date = "La date est obligatoire.";
        if (!startTime) tempErrors.startTime = "L'heure de début est obligatoire.";
        if (!endTime) tempErrors.endTime = "L'heure de fin est obligatoire.";
        if (!selectedPosition) tempErrors.location = "Le lieu est obligatoire.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            // Soumission des données
            ({
                date,
                startTime,
                endTime,
                location: selectedPosition
            });
            alert('Tout est valide !');
        }
    };

    return (
        <Card variant="outlined" className="p-5 mt-2">
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                <span className="text-2xl font-bold font-sans w-full text-center mb-6">Date et lieu</span>
                <div className="mt-3">
                    <span className="text-sm font-sans">Quand et où aura lieu votre événement</span>
                </div>

                <div className="grid gap-2">
                    <DatePicker
                        value={date}
                        onChange={(e) => {
                            setDate(e);
                            props.handleChange(e ? e.toISOString().split("T")[0] : null, "event_date");
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

                    <div className="flex flex-row gap-4">
                        <div className="flex-grow">
                            <DemoItem label="Heure de début">
                                <MobileTimePicker
                                    value={startTime}
                                    maxTime={endTime}
                                    onChange={(e) => {
                                        setStartTime(e);
                                        props.handleChange(e ? e.toTimeString().split(" ")[0] : null, "start_time");
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.startTime,
                                            helperText: errors.startTime
                                        }
                                    }}
                                />
                            </DemoItem>
                        </div>
                        <div className="flex-grow">
                            <DemoItem label="Heure de fin">
                                <MobileTimePicker
                                    value={endTime}
                                    minTime={startTime}
                                    onChange={(e) => {
                                        setEndTime(e);
                                        props.handleChange(e ? e.toTimeString().split(" ")[0] : null, "end_time");
                                    }}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.endTime,
                                            helperText: errors.endTime
                                        }
                                    }}
                                />
                            </DemoItem>
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className="text-sm font-sans mb-2 block">Cliquez sur la carte pour sélectionner un lieu</span>
                        <APIProvider apiKey={googleMapsApiKey}>
                            <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', border: errors.location ? '2px solid red' : 'none' }}>
                                <Map
                                    defaultZoom={13}
                                    defaultCenter={center}
                                    onClick={handleMapClick}
                                    mapId="map"
                                >
                                    {selectedPosition && (
                                        <Marker
                                            position={selectedPosition}
                                            title="Lieu sélectionné"
                                        />
                                    )}
                                </Map>
                            </div>
                        </APIProvider>
                        {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}

                        {selectedPosition && (
                            <div className="mt-2 text-sm text-gray-600">
                                Position sélectionnée: {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
                            </div>
                        )}
                    </div>

                </div>
            </LocalizationProvider>
        </Card>
    );
};

export default PlaceDateInfo;
