let paramsDOM = new URLSearchParams(window.location.search);
let username = paramsDOM.get("username");
let room = paramsDOM.get("room");

// Referencias del DOM
const divUsuarios = document.querySelector("#divUsuarios");
const formSend = document.querySelector("#formEnviar");
const txtMessage = document.querySelector("#txtMensaje");
const chatBox = document.querySelector("#divChatbox");

// Funcion para renderizar usuarios
const renderUsers = (users) => {
  let html = ` <li>
    <a href="javascript:void(0)" class="active">
      Chat de <span> ${paramsDOM.get("room")}</span>
    </a>
  </li>`;

  users.forEach((user, idx) => {
    html += `<li class="usuario">
      <a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/${idx}.jpg" alt="user-img" class="img-circle" />
        <span>
          ${user.username}<small class="text-success">online</small>
        </span>
      </a>
    </li>`;
  });
  divUsuarios.innerHTML = html;

  // Obtener el id del usuario para mensajes privados si se quisiera.
  divUsuarios
    .querySelectorAll("a[data-id]")
    .forEach(
      (anchor) =>
        (anchor.onclick = () => console.log(anchor.getAttribute("data-id")))
    );
};

function scrollBottom() {
  document
    .querySelector("#divChatbox")
    .scrollTo(0, document.querySelector("#divChatbox").scrollHeight);
}

function renderMessages(message, me) {
  let li = document.createElement("li");
  let hours = new Date(message.date).getHours();
  let minutes = new Date(message.date).getMinutes();

  if (me) {
    li.classList.add("reverse");
    li.innerHTML = `<div class="chat-content">
    <h5>${message.username}</h5>
    <div class="box bg-light-inverse">${message.message}</div>
  </div>
  <div class="chat-img">
    <img src="assets/images/users/5.jpg" alt="user" />
  </div>
  <div class="chat-time">
  ${hours}:${minutes} ${hours > 12 ? "p. m." : "a. m."}
  </div>`;
  } else {
    li.innerHTML = `
    ${
      message.username !== "Admin"
        ? '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        : ""
    }
  <div class="chat-content">
    <h5>${message.username}</h5>
    <div class="box bg-light-${
      message.username === "Admin" ? "danger" : "info"
    }">
    ${message.message}
    </div>
  </div>
  <div class="chat-time">
  ${hours}:${minutes} ${hours > 12 ? "p. m." : "a. m."}
  </div>`;
  }

  chatBox.appendChild(li);
}

formSend.onsubmit = (e) => {
  e.preventDefault();
  if (txtMessage.value.trim().length === 0) {
    return;
  }

  socket.emit(
    "createMessage",
    { username, message: txtMessage.value },
    (mensaje) => {
      txtMessage.value = "";
      txtMessage.focus();
      renderMessages(mensaje, true);
      scrollBottom();
    }
  );
};
