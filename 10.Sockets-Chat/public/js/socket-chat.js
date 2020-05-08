let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has("username")) {
  window.location = "/";
  throw new Error("Es necesario introducir un nombre de ususario");
}

let user = {
  username: params.get("username"),
};

// Escuchar sucesos, en este caso una conexion.
socket.on("connect", () => {
  console.log("Conectado al mismísimo servidor del chat absoluto");

  socket.emit("joinChat", user, (resp) => {
    console.log("Usuarios conectados", resp);
  });
});

// Escuchar sucesos, en este caso una desconexion del servidor.
socket.on("disconnect", () => {
  console.log("SE CAYÓ EL SERVIDOR LOCOOOOOOOO");
});
// Escuchar sucesos, en este caso una desconexion de usuario.

socket.on("userDisconnected", (message) => {
  console.log(message);
});

// Escuchar cuando un usuario entra o sale del chat
socket.on("connectedUsers", (users) => console.log(users));
