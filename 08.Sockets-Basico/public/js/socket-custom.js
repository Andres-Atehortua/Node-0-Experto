let socket = io();

// Escuchar sucesos, en este caso una conexion.
socket.on("connect", () => {
  console.log("Conectado al mismísimo servidor del chat absoluto");
});
// Escuchar sucesos, en este caso una desconexion.
socket.on("disconnect", () => {
  console.log("SE CAYÓ EL SERVIDOR LOCOOOOOOOO");
});
// Escuchar sucesos, en este caso un mensaje de bienvenida.

socket.on("enviarMensaje", (mensaje) => {
  console.log(mensaje);
});

// Enviar información. El callback sirve como retroalimentación
socket.emit(
  "enviarMensaje",
  {
    usuario: "Andres el poderoso",
    message: "Estoy tremendo",
  },
  (respuesta) => {
    console.log(respuesta);
  }
);
