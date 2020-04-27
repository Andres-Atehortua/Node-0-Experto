const colors = require("colors/safe");

let listarTabla = (base, limite = 10) => {
  console.log(colors.green("============================"));

  console.log(colors.red.bold(`=======Tabla del ${base}==========`));
  console.log(colors.green("============================"));

  if (!Number(base) || !Number(limite)) {
    reject(
      `Ambos argumentos Base: ${base} y Limite: ${limite} deben ser números`
    );
    return;
  }

  for (let i = 1; i <= limite; i++) {
    console.log(`${base} multiplicado por ${i} es igual a ${base * i}`);
  }
};

module.exports = listarTabla;
