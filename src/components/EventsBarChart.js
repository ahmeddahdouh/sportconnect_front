import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EventBarChart = () => {
    // Données d'exemple
    const data = [
        { name: 'Janvier', created: 2, joined: 5 },
        { name: 'Février', created: 3, joined: 4 },
        { name: 'Mars', created: 1, joined: 6 },
    ];

    // Préparation des données pour Chart.js
    const chartData = {
        labels: data.map((item) => item.name),  // Mois (labels)
        datasets: [
            {
                label: 'Événements créés',
                data: data.map((item) => item.created),  // Nombre d'événements créés
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Événements auxquels vous avez participé',
                data: data.map((item) => item.joined),  // Nombre d'événements auxquels vous avez participé
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Nombre d\'événements créés et participés par mois',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Mois',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Nombre d\'événements',
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default EventBarChart;
