

const listarEnquetesCriadas = (req, res) => {
  res.json("listar enquetes criadas");
};

const listarEnquetesVotadas = (req, res) => {
  res.json("listar enquetes votadas");
};

export { 
    listarEnquetesCriadas,
    listarEnquetesVotadas
 };