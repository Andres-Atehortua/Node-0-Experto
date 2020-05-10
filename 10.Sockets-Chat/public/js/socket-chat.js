let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has("username" || !params.has("room"))) {
  window.location = "/";
  throw new Error("El nombre y la sala son necesarios.");
}

let user = {
  username: params.get("username"),
  room: params.get("room"),
};

// Escuchar sucesos, en este caso una conexion.
socket.on("connect", () => {
  console.log("Conectado al mismísimo servidor del chat absoluto");

  socket.emit("joinChat", user, (resp) => {
    renderUsers(resp);
  });
});

// Escuchar sucesos, en este caso una desconexion del servidor
socket.on("disconnect", () => console.log("SE CAYÓ EL SERVIDOR LOCOOOOOOOO"));

// Escuchar sucesos, en este caso una desconexion de usuario.
socket.on("userDisconnected", (message) => {
  scrollBottom();
  renderMessages(message, false);
});

socket.on("userConnected", (message) => {
  scrollBottom();
  renderMessages(message, false);
});

// Escuchar cuando un usuario entra o sale del chat
socket.on("connectedUsers", (users) => renderUsers(users));

// Escuchar mensaje que envia un usuario
socket.on("createMessage", (message) => {
  renderMessages(message, false);
  scrollBottom();
});

// Mensajes privados

socket.on("privateMessage", (message) => {
  console.log("Mensaje privado: ", message);
});
