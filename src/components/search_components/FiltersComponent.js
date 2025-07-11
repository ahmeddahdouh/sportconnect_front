import React, {useEffect, useState} from 'react';
import SportService from "../../services/SportService";

export default function FiltersComponent(props) {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('Aucune ville');
  const [sport, setSport] = useState('Aucun sport');
  const [age, setAge] = useState('');
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);
        const rawSports = await SportService.getAllSports();
        // Transformation en entités avec validation
        const validSports = rawSports
            .filter(sport => sport.isValid());
        // Utilise isValid() de SportEntity
        setSports(validSports);
      } catch (err) {
        setError(err.message || "Failed to load sports");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();

    // Nettoyage optionnel
    return () => {
      // Annule la requête si nécessaire
    };
  }, []);



  const handleCityChange = (event) => {
    setCity(event.target.value);
    if (props.onBlurVilleFilter) {
      props.onBlurVilleFilter(event);
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    if (props.OnBlureDateFilter) {
      props.OnBlureDateFilter(event.target.value);
    }
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAgeBlur = (event) => {
    if (props.onBlurAgeFilter) {
      props.onBlurAgeFilter(event);
    }
  };

  const handleReset = () => {
    setDate('');
    setCity('Aucune ville');
    setAge('');
    setSport('Aucun sport')
    // Call reset handlers if provided
    if (props.handleReset) {
      props.handleReset();
    }
  };

  const handleChangeSport = (event) => {
    setSport(event.target.value);
    if (props.onBlurVilleFilter) {
      props.onBlurSportFilter(event);
    }
  };

  return (
      <div className=" pb-2">
        <div className="w-full flex flex-row justify-end ">
          <button
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 font-medium "
          >
            Réinitialiser
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Filter */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Sélectionner une date"
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* City Filter */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Ville</label>
            <select
                value={city}
                onChange={handleCityChange}
                className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Aucune ville">Aucune ville</option>
              {props.citie && props.citie.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
              ))}
            </select>
          </div>

          {/* Sport Filter */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Sport</label>
            <select
                value={sport}
                onChange={handleChangeSport}
                className="w-full p-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Aucun sport">Aucun sport</option>
              {sports?.map((sport, index) => (
                  <option key={index} value={sport.id}>
                    {sport?.sport_nom}
                  </option>
              ))}
            </select>
          </div>



          {/* Age Filter */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Âge</label>
            <input
                type="number"
                value={age}
                onChange={handleAgeChange}
                onBlur={handleAgeBlur}
                placeholder="Entrez un âge"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      </div>
  );
}