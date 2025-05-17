import React, { useEffect, useRef, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { fieldsAddEvent } from '../data/data';
import '../styles/App.css';
import Swal from 'sweetalert2';
import SportService from '../services/SportService';
import LocationSearch from '../pages/LocationSearch';
import eventService from '../services/EventService';
import ChannelService from '../services/ChannelService';
import { UploadIcon } from 'lucide-react';
import { Label } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';

export default function AddEventFormComponent(props) {
  const [sports, setSports] = useState([]);
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const [alertState, setAlertState] = useState({ message: '', severity: '' });
  const formFields = fieldsAddEvent;
  const [formData, setFormData] = useState(initForm());
  const [Imagefile, setImagefile] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportData = await SportService.getSport();
        setSports(sportData);
      } catch (e) {
        console.error('Error loading sports:', e);
      }
    };
    fetchSports();
  }, []);

  function initForm() {
    return formFields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.type === 'checkbox' ? false : '' }),
      {}
    );
  }

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setImagefile(file);
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreview(null);
    fileInputRef.current.value = null;
  };

  const handleLocationSelect = (coordinates) => {
    setLocation(coordinates);
  };

  const handleChange = (e) => {
    if (e.label == null) {
      const { name, type, checked, value } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setFormData({ ...formData, id_gestionnaire: props.id, [name]: newValue });
    } else {
      setFormData({
        ...formData,
        event_ville: e?.label,
        longitude: Number(e?.value[0]),
        latitude: Number(e?.value[2])
      });
    }
  };

  const handleBlure = (e) => {
    const { name, type, checked, value } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    if (["event_age_min", "event_age_max", "nombre_utilisateur_min", "event_max_utilisateur"].includes(name)) {
      newValue = Number(newValue);
    }

    let errorMsg = '';
    if (name === 'event_age_max' && newValue < formData.event_age_min) {
      errorMsg = "L'âge maximum ne peut pas être inférieur à l'âge minimum.";
    }
    if (name === 'event_age_min' && newValue > formData.event_age_max) {
      errorMsg = "L'âge minimum ne peut pas être supérieur à l'âge maximum.";
    }
    if (name === 'event_max_utilisateur' && newValue < formData.nombre_utilisateur_min) {
      errorMsg = "Le nombre d'utilisateur maximum ne peut pas être inférieur au nombre minimum.";
    }
    if (name === 'nombre_utilisateur_min' && newValue > formData.event_max_utilisateur) {
      errorMsg = "Le nombre d'utilisateur minimum ne peut dépasser le maximum.";
    }
    if (!newValue && name !== '') {
      errorMsg = 'Ce champ est requis.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((val) => val !== '');
    if (hasErrors) {
      alert('Veuillez remplir correctement le formulaire');
      return;
    }
    setFormData({ ...formData, id_gestionnaire: props.id });
    insertEvent();
  }

  async function insertEvent() {
    try {
      const response = await eventService.insertEvenet(formData, Imagefile);
      // Créer un canal pour l'événement
      await ChannelService.createChannel({
        name: `Canal ${formData.event_name}`,
        eventId: response.data.id, // Supposons que la réponse contient l'ID de l'événement
        adminId: props.id
      });
      setAlertState({ message: response.message || 'Succès', severity: 'success' });
      Alert_personalised('Votre événement a bien été enregistré', 'success', 'Bravo !', 'Créer un autre');
    } catch (error) {
      console.error(error);
      setAlertState({ message: `Erreur : ${error.message}`, severity: 'error' });
    }
  }

  function Alert_personalised(message, icon, text, confirmButtonText) {
    Swal.fire({
      title: message,
      text: text,
      icon: icon,
      showCancelButton: true,
      cancelButtonText: 'Liste des événements',
      confirmButtonText: confirmButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(initForm());
        setAlertState({ message: '', severity: '' });
      } else if (result.isDismissed) {
        window.location.href = '/booking';
      }
    });
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2 }}>
      <Box sx={{ width: '70%', padding: 2 }}>
        <p className="text-2xl mb-6 font-bold">Ajouter Votre Propre Événement</p>
        {alertState.message && <Alert severity={alertState.severity}>{alertState.message}</Alert>}
        <form onSubmit={handleSubmit}>
          {formFields.reduce((rows, field, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(field);
            return rows;
          }, []).map((row, rowIndex) => (
            <Box key={rowIndex} sx={{ display: 'flex', gap: 2, marginBottom: 2, flexWrap: 'wrap' }}>
              {row.map((field) => (
                <Box key={field.name} sx={{ flex: field.type === 'TextArea' ? '1 1 100%' : 1 }}>
                  {field.type === 'checkbox' ? (
                    <FormControlLabel
                      control={<Checkbox checked={formData[field.name] || false} onChange={handleChange} onBlur={handleBlure} name={field.name} />}
                      label={field.label}
                    />
                  ) : field.type === 'TextArea' ? (
                    <Box>
                      <textarea
                        id="event-description"
                        name={field.name}
                        onBlur={handleBlure}
                        rows="5"
                        cols="50"
                        maxLength={200}
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Décrivez votre événement ici..."
                        value={field.name === 'id_gestionnaire' ? props.id : formData[field.name] || ''}
                        onChange={handleChange}
                        required
                      />
                      <LocationSearch onLocationSelect={handleLocationSelect} name="event_ville" handleBlure={handleBlure} change={handleChange} />
                    </Box>
                  ) : field.name !== 'id_sport' ? (
                    <TextField
                      type={field.type}
                      label={field.label}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      onBlur={handleBlure}
                      fullWidth
                      variant="outlined"
                      required
                      error={Boolean(errors[field.name])}
                      helperText={errors[field.name]}
                    />
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                      <Select
                        labelId={`select-label-${field.name}`}
                        name={field.name}
                        value={formData[field.name] || ''}
                        label={field.label}
                        onChange={handleChange}
                        onBlur={handleBlure}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>{field.label}</MenuItem>
                        {sports?.map((sport, index) => (
                          <MenuItem key={index} value={sport.id}>{sport.sport_nom}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
              ))}
            </Box>
          ))}

          <div className="grid gap-2">
            <Label>Image de couverture</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center min-h-[200px] relative overflow-hidden">
              {preview ? (
                <div>
                  <Button size="small" variant="outlined" className="absolute top-2 right-2 z-10" onClick={handleRemoveImage} type="button">
                    <ClearIcon className="h-4 w-4 mr-1" /> Supprimer
                  </Button>
                  <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-lg" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Glissez-déposez une image ou cliquez pour parcourir</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG ou JPEG (max. 5MB)</p>
                  <Button size="small" className="mt-4" onClick={handleImageClick} type="button">Sélectionner un fichier</Button>
                </div>
              )}
              <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} className="hidden" onChange={handleImageFileChange} />
            </div>
          </div>

          <Button type="submit" variant="contained" color="primary" fullWidth>Créer l’événement</Button>
        </form>
      </Box>
    </Box>
  );
}