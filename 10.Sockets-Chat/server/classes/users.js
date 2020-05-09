class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, username, room) {
    let user = { id, username, room };
    this.users.push(user);
    return this.users;
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }

  getUsersInRoom(room) {
    return this.users.filter((user) => user.room === room);
  }

  removeUser(id) {
    let removedUser = this.getUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

module.exports = { Users };
