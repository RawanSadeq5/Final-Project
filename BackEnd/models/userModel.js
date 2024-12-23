class User {
  constructor({ fullName, age, gender, email, password }) {
    this.id = Date.now().toString(); // Simple unique ID
    this.fullName = fullName;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }
}

module.exports = User;
