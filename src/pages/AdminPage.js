import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ events: 0, users: 0, admins: 0 });
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/adminLogin");
      return;
    }

    axios.get("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setStats(prev => ({ ...prev, users: res.data.length })));

    axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setStats(prev => ({ ...prev, events: res.data.length })));

    axios.get("http://localhost:5000/api/admins", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setStats(prev => ({ ...prev, admins: res.data.length })));
  }, [token, navigate]);

  const Card = ({ title, count, to }) => (
    <div
      onClick={() => navigate(to)}
      className="cursor-pointer bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-6 text-center transition-transform hover:scale-105 hover:shadow-2xl duration-300"
    >
      <h2 className="text-lg md:text-xl text-gray-200 font-semibold">{title}</h2>
      <p className="text-3xl md:text-4xl font-extrabold text-blue-1000">{count}</p>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/font.jpeg')" }} 
    >
      <AdminNavbar />
      <div className="px-4 md:px-16 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">Tableau de Bord</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Total Événements" count={stats.events} to="/listEventAdmin" />
          <Card title="Total Utilisateurs" count={stats.users} to="/listUserAdmin" />
          <Card title="Total Admins" count={stats.admins} to="/listAdminAdmin" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
