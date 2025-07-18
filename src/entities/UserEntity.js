const DEFAULTS = {
    STRING: '',
    DATE: () => new Date(),
    NUMBER: null,
    NULL: null,
};
const base_url_auth = process.env.REACT_APP_AUTH_BASE_URL;
class UserEntity {
    constructor({
                    username = DEFAULTS.STRING,
                    email = DEFAULTS.STRING,
                    password = DEFAULTS.STRING,
                    confirmPassword = DEFAULTS.STRING,
                    firstname = DEFAULTS.STRING,
                    familyname = DEFAULTS.STRING,
                    city = DEFAULTS.STRING,
                    age = DEFAULTS.STRING,
                    phone = DEFAULTS.STRING,
                    date_of_birth = DEFAULTS.STRING,
                    profile_image = DEFAULTS.NULL,
                    postal_code =DEFAULTS.STRING,
                    createdAt = DEFAULTS.DATE(),
                    bibliography = DEFAULTS.STRING,
                    interests = [],
                }) {
        // Parse interests if it's a string
        this.interests = this._parseInterests(interests);

        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstname = this._capitalize(firstname);
        this.familyname = this._capitalize(familyname);
        this.city = city;
        this.phone = phone;
        this.postal_code =
        this.date_of_birth = date_of_birth;
        this.age = age;
        this.bibliography = bibliography;
        this.profileImage = profile_image;
        this.createdAt = createdAt;
    }

    // Function to parse interests
    _parseInterests(interests) {
        if (Array.isArray(interests)) {
            return interests;
        }
        if (typeof interests === 'string') {
            try {
                const fixed = interests.replace(/'/g, '"');
                return JSON.parse(fixed);  // Convertir en tableau
            } catch (e) {
                console.warn("Erreur lors du parsing des intérêts", e);
                return [];
            }
        }
        return [];
    }

    getProfileImageUrl() {
        return `${base_url_auth}/uploads/${this.profileImage}`;
    }

    getProfileImageUrl() {
        return `${base_url_auth}/uploads/${this.profileImage}`;
    }

    getFullName() {
        return `${this.firstname} ${this.familyname}`;
    }

    getInitials() {
        return `${this.firstname.charAt(0)}${this.familyname.charAt(0)}`.toUpperCase();
    }

    _capitalize(str) {
        if (!str) return DEFAULTS.STRING;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
            firstName: this.firstname,
            familyName: this.familyname,
            city: this.city,
        };
    }

    toAuthJSON() {
        return {
            username: this.username,
            email: this.email,
        };
    }
}

export default UserEntity;