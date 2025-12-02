

const criar = (req, res) => {
  res.json("criação de enquete");
};

const visualizar = (req, res) => {
  res.json("visualização de enquete");
};

const mostrarResultado = (req, res) => {
  res.json("resutado de enquete");
};

const listar = (req, res) => {
  res.json("listagem de enquete");
};

const votar = (req, res) => {
  res.json("votar em enquete");
};

const estender = (req, res) => {
  res.json("estender enquete");
};

const encerrar = (req, res) => {
  res.json("encerrar enquete");
};

export {
    criar,
    visualizar,
    mostrarResultado,
    listar,
    votar,
    estender,
    encerrar
};