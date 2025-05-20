class UserEntity {
    constructor(username, email, password, confirmPassword, firstname, familyname, city, phone, date_of_birth) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstname = firstname;
        this.familyname = familyname;
        this.city = city;
        this.phone = phone;
        this.date_of_birth = date_of_birth;
    }
}

module.exports = UserEntity;
