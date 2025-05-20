import {useEffect, useRef, useState} from "react";
import {useMap} from "@vis.gl/react-google-maps";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onPlaceSelect }) => {
    const mapContext = useMap();
    const inputRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (!inputRef.current || !mapContext || !window.google) return;

        // Initialiser l'autocomplétion
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            fields: ["formatted_address", "geometry", "name"],
            types: ["establishment", "geocode"]
        });

        // Ajout d'un écouteur d'événement pour détecter la sélection d'un lieu
        const listener = autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && onPlaceSelect) {
                onPlaceSelect(place);
                setSearchValue(place.formatted_address || place.name || "");
            }
        });

        // Nettoyage au démontage du composant
        return () => {
            if (listener) window.google.maps.event.removeListener(listener);
        };
    }, [mapContext, onPlaceSelect]);

    return (
        <TextField
            inputRef={inputRef}
            fullWidth
            placeholder="Rechercher un lieu..."
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default SearchBar;