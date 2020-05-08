const io = require("./../server");

const { Users } = require("./../classes/users");

const users = new Users();

io.on("connection", (client) => {
  console.log("Usuario conectado");

  client.on("joinChat", (data, callback) => {
    if (!data.username) {
      return callback({
        error: true,
        message: "El nombre de usuario es necesario.",
      });
    }
    let allUsers = users.addUser(client.id, data.username);
    client.broadcast.emit("connectedUsers", users.getAllUsers());
    callback(allUsers);
  });

  client.on("disconnect", () => {
    let removedUser = users.removeUser(client.id);

    client.broadcast.emit("userDisconnected", {
      user: "Admin",
      message: `${removedUser.username} abandonó el chat.`,
    });
    client.broadcast.emit("connectedUsers", users.getAllUsers());
  });
});
