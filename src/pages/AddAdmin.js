import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    familyname: '',
    city: '',
    phone: '',
    age: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const tokenadmin = localStorage.getItem("admin_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/admins', formData, {
        headers: {
          Authorization: `Bearer ${tokenadmin}`,
          'Content-Type': 'application/json'
        }
      });

      alert('✅ Admin ajouté avec succès !');
      navigate('/listAdminAdmin'); // ou une autre page de ton choix
    } catch (err) {
      console.error(err);
      setError("⛔ Erreur lors de l'ajout de l'administrateur.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 flex items-center justify-center"
      style={{ backgroundImage: "url('/font.jpeg')" }} // Remplace le chemin par l'URL de ton image
    >
      <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-lg bg-opacity-90">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Ajouter un Administrateur</h2>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            ['Prénom', 'firstname'],
            ['Nom', 'familyname'],
            ['Nom d’utilisateur', 'username'],
            ['Email', 'email'],
            ['Mot de passe', 'password'],
            ['Ville', 'city'],
            ['Téléphone', 'phone'],
            ['Âge', 'age']
          ].map(([label, name]) => (
            <div key={name} className="relative">
              <label className="block text-lg font-medium text-gray-700">{label}</label>
              <input
                type={name === 'password' ? 'password' : 'text'}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full mt-2 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            ➕ Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
