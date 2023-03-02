class Player {
  constructor(id, fullName, age, contact, position) {
    this.id = id; // id generated by the firestore
    this.fullName = fullName;
    this.age = age;
    this.contact = contact;
    this.position = position;
  }
}

module.exports = Player;