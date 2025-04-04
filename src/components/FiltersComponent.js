import React from 'react';
import { Stack, TextField, InputAdornment, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';

// Styles personnalisés
const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '100%',
  margin: '0 auto',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d1d5db',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d1d5db',
    },
    '&:hover fieldset': {
      borderColor: '#6366f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6366f1',
    },
  },
}));

export default function FiltersComponent(props) {
  const [date, setDate] = React.useState(null);
  const [city, setCity] = React.useState('Aucune ville');
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
    props.onBlurVilleFilter(event);
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledStack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
        >
          {/* Titre */}
          <Box>
            <StyledTypography variant="subtitle1">Filtrer par :</StyledTypography>
          </Box>

          {/* Filtre par Date */}
          <Box>
            <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                  props.OnBlureDateFilter(newValue);
                }}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        fullWidth
                        size="small"
                        placeholder="Sélectionnez une date"
                    />
                )}
            />
          </Box>

          {/* Filtre par Ville */}
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel id="ville-selection">Ville</InputLabel>
              <StyledSelect
                  labelId="ville-selection"
                  id="ville-selection"
                  value={city}
                  label="Ville"
                  onChange={handleChange}
              >
                <MenuItem value="Aucune ville">Aucune ville</MenuItem>
                {props.citie.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Box>

          {/* Filtre par Âge */}
          <Box>
            <StyledTextField
                label="Âge"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onBlur={props.onBlurAgeFilter}
                fullWidth
                size="small"
                placeholder="Entrez un âge"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">

                      </InputAdornment>
                  ),
                }}
            />
          </Box>
        </StyledStack>
      </LocalizationProvider>
  );
}