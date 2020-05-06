const io = require("./../server");

io.on("connection", (client) => {
  console.log("USUARIO CONECTADO");
  client.emit("enviarMensaje", {
    usuario: "Administrador poderoso",
    mensaje: "Bienvenido camarada.",
  });

  client.on("disconnect", () => {
    console.log("ALGUIEN SE SALIO DEL CHAT");
  });

  // Escuchar el cliente
  client.on("enviarMensaje", (data, callback) => {
    console.log("data:", data);

    client.broadcast.emit("enviarMensaje", data);
    // if (mensaje) {
    //   callback({ respuesta: "TODO SALIO BIEN GUACHO" });
    // } else {
    //   callback({ mensaje: "TODO SALIO RE MAL LOCO" });
    // }
  });
});
