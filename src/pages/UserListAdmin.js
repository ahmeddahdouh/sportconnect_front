import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserListAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const navigate = useNavigate();
  const tokenadmin = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!tokenadmin) {
      navigate("/adminLogin");
      return;
    }

    fetchUsers();
  }, [tokenadmin, navigate]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${tokenadmin}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Erreur de suppression :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrage des utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.familyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('font.jpeg')" }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Liste des Utilisateurs
        </h2>

        {/* Barre de recherche */}
        <div className="mb-6 flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Rechercher un utilisateur"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={fetchUsers}
            className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Rechercher
          </button>
        </div>

        {/* Bouton Retour à l'Accueil */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => navigate("/admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Retour à l'Accueil
          </button>
        </div>

        {/* Table des utilisateurs */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Prénom</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Ville</th>
                <th className="p-4 text-left">Téléphone</th>
                <th className="p-4 text-left">Âge</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="text-center border-t hover:bg-gray-100 transition-all duration-300"
                  >
                    <td className="p-4 border">{user.familyname}</td>
                    <td className="p-4 border">{user.firstname}</td>
                    <td className="p-4 border">{user.username}</td>
                    <td className="p-4 border">{user.email}</td>
                    <td className="p-4 border">{user.city}</td>
                    <td className="p-4 border">{user.phone}</td>
                    <td className="p-4 border">{user.age}</td>
                    <td className="p-4 border">
                      {user.profileImage ? (
                        <img
                          src={`http://localhost:5000/${user.profileImage}`}
                          alt="profil"
                          className="w-12 h-12 rounded-full mx-auto"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="p-4 border">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListAdmin;
