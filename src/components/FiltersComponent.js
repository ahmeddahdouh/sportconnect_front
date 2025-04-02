import React from 'react';
import {Stack, TextField, InputAdornment, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';  // Importation des composants nécessaires
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function FiltersComponent(props) {
    const [date, setDate] = React.useState(null);
    const [city, setCity] = React.useState('Aucune ville');
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setCity(event.target.value);
        props.onBlurVilleFilter(event)
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>  {/* Fournisseur de date pour le DatePicker */}
            <Stack
                direction="row"
                spacing={4}
                marginTop={"20px"}// Espacement entre les éléments
                width="100%"
                justifyContent="center"
                alignItems="center"
            >
                <div>
                    <Typography variant={"p"}>Filtrer par :</Typography>
                </div>
                {/* Filtre par Date */}
                <div>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) =>
                        {setDate(newValue)
                            props.OnBlureDateFilter(newValue)
                        }
                    }
                        renderInput={(params) => (
                            <TextField {...params}
                            />
                        )}

                    />
                </div>
                <FormControl >
                <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                <Select
                    labelId="ville-selection"
                    id="ville-selection"
                    value={city}
                    label="Ville"
                    onChange={handleChange}
                >
                    <MenuItem value={"Aucune ville"} >Aucune ville </MenuItem>
                    {props.citie.map((city,index) =>
                        <MenuItem key={index} value={city}>{city}</MenuItem>
                    )}

                </Select>
                </FormControl>
                {/* Filtre par Âge */}
                <div>
                    <TextField
                        label="Âge"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        variant="outlined"
                        placeholder="Entrez un âge"

                        onBlur={props.onBlurAgeFilter}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                        }}
                    />
                </div>
            </Stack>
        </LocalizationProvider>
    );
}
