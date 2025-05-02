import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/adminLogin");
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center px-6 py-4">
      <h1 className="text-xl font-bold text-blue-600">Bienvenue </h1>
      <div className="flex items-center gap-4">
        {admin && (
          <>
            <span className="text-gray-700 font-medium">
              {admin.firstname} {admin.familyname}
            </span>
            {admin.profileImage && (
              <img
                src={`http://localhost:5000/${admin.profileImage}`}
                alt="profil"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </>
        )}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
