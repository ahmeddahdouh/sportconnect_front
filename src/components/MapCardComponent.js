import {APIProvider, Map, Marker, useMap} from "@vis.gl/react-google-maps";
import React, {useEffect, useRef, useState} from "react";
import SearchBar from "./MapSearchBar";




const MapCardComponent = (props)=> {
    const googleMapsApiKey = "AIzaSyC62tgdrY3vwmRUTWRH_xVJXQkRdXhh6ro";
    const defaultCenter = { lat: 48.8566, lng: 2.3522 };
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        debugger;
        if (props.latitude && props.longitude) {
            const newPosition = {
                lat: parseFloat(props.longitude),
                lng: parseFloat(props.latitude)
            };
            debugger;
            console.log(newPosition);
            debugger;
            setCenter(newPosition);
            setSelectedPosition(newPosition);

        }
    }, [props.latitude, props.longitude]);

    const MapController = ({ selectedPosition }) => {
        const map = useMap();

        useEffect(() => {
            if (map && selectedPosition) {
                map.panTo(selectedPosition);
            }
        }, [map, selectedPosition]);

        return null;
    };




    // Récupérer la position actuelle de l'utilisateur au chargement du composant
    useEffect(() => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCenter(userPosition);
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.warn("La géolocalisation n'est pas supportée par ce navigateur");
            setIsLoading(false);
        }
    }, []);


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




    return ( <div className="mt-4">
        <span className="text-sm font-sans mb-2 block">Recherchez un lieu ou cliquez sur la carte</span>
        <APIProvider apiKey={googleMapsApiKey} libraries={["places"]}>
            <SearchBar
                onPlaceSelect={(place) => {
                    if (place.geometry && place.geometry.location) {
                        const newPosition = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        };
                        setSelectedPosition(newPosition);
                        setCenter(newPosition);

                        if (props.onLocationSelect) {
                            props.onLocationSelect(newPosition, place.formatted_address);
                        }
                    }
                }}
            />
            <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', border: errors.location ? '2px solid red' : 'none', marginTop: '8px' }}>
                {isLoading ? (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                        <span>Chargement de votre position...</span>
                    </div>
                ) : (
                    <Map
                        defaultZoom={15}
                        defaultCenter={center}
                        onClick={handleMapClick}
                        mapId="map"
                    >
                        {/* Marqueur pour la position actuelle de l'utilisateur */}
                        <Marker
                            position={center}
                            title="Votre position"
                            icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }}
                        />

                        {selectedPosition && (
                            <div>    <MapController selectedPosition={selectedPosition} />
                            <Marker
                                position={selectedPosition}
                                title="Lieu sélectionné"
                            />
                            </div>
                        )}
                    </Map>
                )}
            </div>
        </APIProvider>
        {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}

        {selectedPosition && (
            <div className="mt-2 text-sm text-gray-600">
                Position sélectionnée: {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
            </div>
        )}
    </div>)
}

export default MapCardComponent;