export default class SportEntity {
    constructor({
                    id,
                    nbr_equipe,
                    nbr_joueur_max,
                    sport_nom,
                    stat_equipe = "{}",
                    stat_solo = "{}"
                }) {
        this.id = id;
        this.nbr_equipe = parseInt(nbr_equipe) || 0;
        this.nbr_joueur_max = parseInt(nbr_joueur_max) || 0;
        this.sport_nom = sport_nom;
        this.stat_equipe = this._parseStats(stat_equipe);
        this.stat_solo = this._parseStats(stat_solo);
    }

    // Parse les stats (chaîne JSON -> objet)
    _parseStats(statString) {
        try {
            return statString !== "None" ? JSON.parse(statString.replace(/'/g, '"')) : null;
        } catch (e) {
            console.error("Failed to parse stats:", statString);
            return {};
        }
    }

    // Valide les données minimales
    isValid() {
        return (
            this.id &&
            this.sport_nom &&
            this.nbr_equipe > 0 &&
            this.nbr_joueur_max > 0
        );
    }

    // Méthodes métier selon le sport
    getPlayerType() {
        return this.nbr_joueur_max === 1 ? "Individuel" : "Équipe";
    }

    //Formate les stats pour l'affichage
    formatTeamStats() {
        if (!this.stat_equipe) return "Aucune statistique d'équipe";
        return Object.entries(this.stat_equipe)
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ");
    }
}