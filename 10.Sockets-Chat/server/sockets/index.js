const io = require("./../server");
const { Users } = require("./../classes/users");
const { createMessage } = require("./../utilities/utilities");

const users = new Users();

io.on("connection", (client) => {
  client.on("joinChat", (data, callback) => {
    console.log(data);
    if (!data.username || !data.room) {
      return callback({
        error: true,
        message: "El nombre de usuario y sala es necesario.",
      });
    }

    client.join(data.room);

    users.addUser(client.id, data.username, data.room);
    client.broadcast
      .to(data.room)
      .emit("connectedUsers", users.getUsersInRoom(data.room));
    callback(users.getUsersInRoom(data.room));

    client.broadcast
      .to(data.room)
      .emit(
        "userConnected",
        createMessage("Admin", `${data.username} ha entrado en el chat.`)
      );
  });

  client.on("createMessage", (data, callback) => {
    let user = users.getUser(client.id);
    let message = createMessage(user.username, data.message);
    client.broadcast.to(user.room).emit("createMessage", message);
    callback(message);
  });

  //Mensajes privados
  client.on("privateMessage", (data) => {
    let user = users.getUser(client.id);
    client.broadcast
      .to(data.to)
      .emit("privateMessage", createMessage(user.username, data.message));
  });

  client.on("disconnect", () => {
    let removedUser = users.removeUser(client.id);

    client.broadcast
      .to(removedUser.room)
      .emit(
        "userDisconnected",
        createMessage("Admin", `${removedUser.username} ha dejado el chat.`)
      );
    client.broadcast
      .to(removedUser.room)
      .emit("connectedUsers", users.getUsersInRoom(removedUser.room));
  });
});
