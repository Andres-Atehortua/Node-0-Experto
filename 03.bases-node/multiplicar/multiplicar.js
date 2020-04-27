// Requireds
const fs = require("fs");

let crearArchivo = (base, limite = 10) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject(`${base} no es un número`);
      return;
    }
    if (!Number(limite)) {
      reject(`${limite} no es un número limite`);
      return;
    }
    let data = "";

    for (let i = 1; i <= limite; i++) {
      data += `${base} multiplicado por ${i} es igual a ${base * i}\n`;
    }

    fs.writeFile(
      `./tablas/tabla-${base}-al-${limite}.txt`,
      data,
      "utf8",
      (err) => {
        if (err) reject(err);
        else resolve(`tabla-${base}-al-${limite}.txt`);
      }
    );
  });
};

// Exportar una función mediante el objeto gobal module
module.exports = crearArchivo;
