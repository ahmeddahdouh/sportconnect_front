import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaSearch, FaPlus, FaTrash } from 'react-icons/fa';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const tokenadmin = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!tokenadmin) {
      navigate("/adminLogin");
      return;
    }

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins', {
          headers: {
            Authorization: `Bearer ${tokenadmin}`,
          },
        });
        setAdmins(response.data);
      } catch (err) {
        console.error(err);
        setError('⛔ Accès refusé ou erreur lors du chargement des administrateurs.');
      }
    };

    fetchAdmins();
  }, [tokenadmin, navigate]);

  const handleDelete = async (adminId) => {
    const confirm = window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer cet administrateur ?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/admins/${adminId}`, {
        headers: {
          Authorization: `Bearer ${tokenadmin}`,
        },
      });

      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
    } catch (err) {
      console.error(err);
      setError("❌ Une erreur est survenue lors de la suppression.");
    }
  };

  const filteredAdmins = admins.filter(admin =>
    `${admin.firstname} ${admin.familyname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover p-6 md:p-10"
      style={{ backgroundImage: "url('font.jpeg')" }}
    >
      <div className="bg-white/70 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Liste des Administrateurs
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate('/admin')}
          >
            <FaPlus className="mr-2" /> Retour à la page d'accueil
          </button>
          <button
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => navigate('/addAdmin')}
          >
            <FaPlus className="mr-2" /> Ajouter un admin
          </button>
        </div>

        <div className="mb-6 flex items-center bg-white px-4 py-2 rounded shadow mx-auto w-full max-w-xl">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un admin par nom"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdmins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition relative"
            >
              <div className="flex items-center gap-3">
                <FaUserShield className="text-indigo-500 text-2xl" />
                <h3 className="text-xl font-semibold">{admin.firstname} {admin.familyname}</h3>
              </div>
              <p className="text-gray-600"><span className="font-medium">Username:</span> {admin.username}</p>
              <p className="text-gray-600"><span className="font-medium">Email:</span> {admin.email}</p>
              <p className="text-gray-600"><span className="font-medium">Ville:</span> {admin.city}</p>
              <p className="text-gray-600"><span className="font-medium">Téléphone:</span> {admin.phone}</p>
              <p className="text-gray-600"><span className="font-medium">Âge:</span> {admin.age}</p>

              <button
                onClick={() => handleDelete(admin.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2"
              >
                <FaTrash /> Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminList;
