let listarTabla = (base, limite = 10) => {
  if (!Number(base) || !Number(limite)) {
    reject(
      `Ambos argumentos Base: ${base} y Limite: ${limite} deben ser números`
    );
    return;
  }

  let data = "";
  for (let i = 1; i <= limite; i++) {
    //   data+= `${base} multiplicado por ${i} es igual a ${base * i}\n`;
    console.log(base * i);
  }
};

module.exports = listarTabla;
