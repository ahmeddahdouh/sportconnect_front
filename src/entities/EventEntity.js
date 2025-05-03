class Event {
    constructor(data = {}) {
        this.id = data.id || null;
        this.event_name = data.event_name || '';
        this.event_description = data.event_description || '';
        this.id_gestionnaire = data.id_gestionnaire || null;
        this.id_sport = data.id_sport || null;
        this.event_ville = data.event_ville || '';
        this.event_date = data.event_date || ''; // Format ISO string
        this.start_time = data.start_time || ''; // Format: "HH:MM:SS"
        this.end_time = data.end_time || '';
        this.event_max_utilisateur = data.event_max_utilisateur || 0;
        this.event_Items = data.event_Items || [];
        this.is_private = data.is_private || false;
        this.is_team_vs_team = data.is_team_vs_team || false;
        this.event_age_min = data.event_age_min ?? null;
        this.event_age_max = data.event_age_max ?? null;
        this.nombre_utilisateur_min = data.nombre_utilisateur_min ?? null;
        this.event_image = data.event_image || 'None';
        this.longitude = data.longitude ?? null;
        this.latitude = data.latitude ?? null;
        this.members = data.members || [];
    }

    // ✅ Vérifie si l'utilisateur est inscrit
    isUserParticipant(userId) {
        return this.members?.some(member => member.id === userId);
    }

    // ✅ Formatage de la date (français)
    getFormattedDate() {
        if (!this.event_date) return '';
        return new Date(this.event_date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    // ✅ Formatage des horaires
    getTimeRange() {

        if (!this.start_time || !this.end_time) return '';
        return `${this.start_time.slice(0, 5)} - ${this.end_time.slice(0, 5)}`;
    }

    // ✅ URL de l’image
    getImageUrl(baseUrl) {
        if (this.event_image && this.event_image !== 'None') {
            return `${baseUrl}/${this.event_image}`;
        }
        return '/cover.jpg';
    }

    // ✅ Vérifie si l’événement est complet
    isFull() {
        return this.members?.length >= this.event_max_utilisateur;
    }

    // ✅ Retourne le nombre de participants
    getParticipantCount() {
        return this.members?.length || 0;
    }

    // ✅ Vérifie si l’événement est accessible pour un âge donné
    isAgeAllowed(age) {
        const min = this.event_age_min ?? 0;
        const max = this.event_age_max ?? 150;
        return age >= min && age <= max;
    }
}

export default Event;
