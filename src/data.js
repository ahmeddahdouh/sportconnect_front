export const fieldsAddEvent = [
        { label: "Nom de l'événement", name: "event_name", type: "text" },
        { label: "Type de sport", name: "id_sport", type: "number" },
        { name: "event_date", type: "datetime-local", label: "Date de l'événement" },
        { label: "Nombre maximal de participants", name: "event_max_utilisateur", type: "number" },
        { label: "Articles requis", name: "event_Items", type: "text" },
        { label: "Âge minimum", name: "event_age_min", type: "number" },
        { label: "Âge maximum", name: "event_age_max", type: "number" },
        { label: "Participants minimum", name: "nombre_utilisateur_min", type: "number" },
        { label: "Ville", name: "event_ville", type: "text" },
        { label: "ID de l'organisateur", name: "id_gestionnaire", type: "number" },
        { label: "Événement privé ?", name: "is_private", type: "checkbox" },
        { label: "Match par équipe ?", name: "is_team_vs_team", type: "checkbox" },
];
