// Requireds
const fs = require("fs");

let crearArchivo = (base) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject(`${base} no es un número`);
      return;
    }
    let data = "";

    for (let i = 0; i <= 10; i++) {
      data += `${base} multiplicado por ${i} es igual a ${base * i}\n`;
    }

    fs.writeFile(`./tablas/tabla-${base}.txt`, data, "utf8", (err) => {
      if (err) reject(err);
      else resolve(`tabla-${base}.txt`);
    });
  });
};

// Exportar una función mediante el objeto gobal module
module.exports = crearArchivo;
