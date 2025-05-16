import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import MapCardComponent from "./MapCardComponent";

const PlaceDateInfo = (props) => {


    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.eventData) {
            const event = props.eventData;

            // Hydrater la date
            if (event.event_date) {
                setDate(new Date(event.event_date));
            }

            // Hydrater l'heure de début
            if (event.start_time) {
                const [h, m] = event.start_time.split(":");
                const d = new Date();
                d.setHours(+h, +m, 0);
                setStartTime(d);
            }

            // Hydrater l'heure de fin
            if (event.end_time) {
                const [h, m] = event.end_time.split(":");
                const d = new Date();
                d.setHours(+h, +m, 0);
                setEndTime(d);
            }
        }
    }, [props.eventData]);


    // Fonction pour valider avant d'envoyer les données
    const validate = () => {
        let tempErrors = {};
        if (!date) tempErrors.date = "La date est obligatoire.";
        if (!startTime) tempErrors.startTime = "L'heure de début est obligatoire.";
        if (!endTime) tempErrors.endTime = "L'heure de fin est obligatoire.";
        //if (!selectedPosition) tempErrors.location = "Le lieu est obligatoire.";
        //setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
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
                        onAccept={(e) => {
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

                    <MapCardComponent onLocationSelect={props.onLocationSelect} longitude={props.eventData?.longitude} latitude={props.eventData?.latitude}/>

                </div>
            </LocalizationProvider>
        </Card>
    );
};

export default PlaceDateInfo;