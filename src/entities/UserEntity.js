class UserEntity {
    constructor(username, email, password, confirmPassword, firstname, familyname, city, phone, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstname = firstname;
        this.familyname = familyname;
        this.city = city;
        this.phone = phone;
        this.age = age;
    }
}

module.exports = UserEntity;
