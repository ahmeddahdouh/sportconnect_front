import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const LocationSearch = ({handleBlure,change,name }) => {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.trim().length > 3) {
                searchLocation(inputValue);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [inputValue]);

    const searchLocation = async (input) => {
        if (!input || input.length < 3) return;
        setIsLoading(true);
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`;
            const { data } = await axios.get(url);
            const results = data.map((place) => ({
                value: place.boundingbox,
                label: place.display_name,
            }));
            setOptions(results);
        } catch (error) {
            console.error("Erreur lors de la recherche de lieux:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="location-search">
            <div className="mb-4">
                <Select
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Ou vous allez jouez !"
                    inputValue={inputValue}
                    onInputChange={(value) => setInputValue(value)}
                    name={name}
                    onBlur={handleBlure}
                    options={options}
                    onChange={change}
                    isLoading={isLoading}
                    loadingMessage={() => "Recherche en cours..."}
                    noOptionsMessage={() => inputValue.length < 3 ? "Saisissez au moins 3 caractères" : "Aucun résultat"}
                    isClearable
                    className="mb-2"
                />
            </div>

        </div>
    );
};

export default LocationSearch;