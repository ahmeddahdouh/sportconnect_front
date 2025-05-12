import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const EventListAdmin = () => {
  const [events, setEvents] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [pastCount, setPastCount] = useState(0);
  const [privateCount, setPrivateCount] = useState(0);
  const [publicCount, setPublicCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const tokenadmin = localStorage.getItem("admin_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenadmin) {
      navigate("/adminLogin");
      return;
    }

    axios.get('http://localhost:5000/api/events', {
      headers: {
        Authorization: `Bearer ${tokenadmin}`,
      },
    })
      .then(res => {
        const allEvents = res.data;
        setEvents(allEvents);

        const now = new Date();
        setUpcomingCount(allEvents.filter(e => new Date(e.event_date) >= now).length);
        setPastCount(allEvents.filter(e => new Date(e.event_date) < now).length);
        setPrivateCount(allEvents.filter(e => e.is_private).length);
        setPublicCount(allEvents.filter(e => !e.is_private).length);
      })
      .catch(err => console.error(err));
  }, [tokenadmin, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 🎨 Nouvelles couleurs plus douces
  const COLORS = ['#00C49F', '#FF4D4F', '#4FD1C5', '#FFBB28']; // Change l'orange en bleu clair

  // 🥧 Données pour les graphiques
  const timeData = [
    { name: 'À venir', value: upcomingCount },
    { name: 'Passés', value: pastCount },
  ];

  const privacyData = [
    { name: 'Privés', value: privateCount },
    { name: 'Publics', value: publicCount },
  ];

  // Filtrage des événements en fonction du terme de recherche
  const filteredEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_description.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDelete = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
  
    axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenadmin}`,
      },
    })
      .then(() => {
        setEvents(prev => prev.filter(event => event.id !== id));
      })
      .catch(err => {
        console.error("Erreur lors de la suppression :", err);
        alert("Échec de la suppression de l'événement.");
      });
  };
  

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('font.jpeg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Statistiques des Événements
        </h2>

        {/* Graphiques */}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="w-full md:w-1/2 p-4">
            <h4 className="text-xl font-semibold text-center text-indigo-600 mb-4">🕓 Temps</h4>
            <PieChart width={250} height={250}>
              <Pie data={timeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {timeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="w-full md:w-1/2 p-4">
            <h4 className="text-xl font-semibold text-center text-indigo-600 mb-4">🔐 Visibilité</h4>
            <PieChart width={250} height={250}>
              <Pie data={privacyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {privacyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <hr className="my-8 border-t-2 border-gray-300" />

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Liste des Événements</h2>

        {/* Barre de recherche */}
        <div className="mb-6 flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Rechercher un événement"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Table des événements */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Ville</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Participants Max</th>
                <th className="p-4 text-left">Privé</th>
                <th className="p-4 text-left">Participants</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <tr
                    key={event.id}
                    className="text-center border-t hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="p-4 border">{event.event_name}</td>
                    <td className="p-4 border">{event.event_description}</td>
                    <td className="p-4 border">{event.event_ville}</td>
                    <td className="p-4 border">{event.event_date}</td>
                    <td className="p-4 border">{event.event_max_utilisateur}</td>
                    <td className="p-4 border">{event.is_private ? 'Oui' : 'Non'}</td>
                    <td className="p-4 border">{event.members?.length || 0}</td>
                    <td className="p-4 border">
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4">Aucun événement trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventListAdmin;
